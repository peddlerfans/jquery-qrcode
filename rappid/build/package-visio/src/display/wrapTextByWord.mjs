import { V, util } from 'jointjs';

export function wrapTextByWord(text, opt) {
    // OPTIONS:
    const localOpt = opt || {};

    const attributes = localOpt.attributes;
    const annotations = localOpt.annotations;

    const maxWidth = ((localOpt.maxWidth == null) ? 1e6 : localOpt.maxWidth);

    const overflowAllowed = !!localOpt.overflowAllowed;

    // Text wrapping rules:
    // ...overflow width is less than (maxWidth * value)...
    const MAX_OVERFLOW_WIDTH_RATIO = 0.4;
    // ...or overflow width is less than this value (px)...
    const MAX_OVERFLOW_WIDTH = 100;
    // ...whichever is wider.


    // MAIN ROUTINE:

    // Split to lines at user-defined newlines.
    const lines = text.split('\n');

    const numLines = lines.length; // number of user-defined lines
    let lineIndex = 0; // the index of the line among user-defined lines

    let tokenIndex; // the index of the token on the user-defined line
    let charIndex = 0; // the start char of the current token in original text

    let wrappedText = ''; // the text after wrapping
    let wrappedCharIndex = 0;
    const wrappedTextAnnotations = util.merge([], annotations); // annotations after wrapping

    let lineTokens; // tokens on the current line

    let overflowTokens; // tokens in the overflow

    // For every user-defined newline, do this:
    lines.forEach(function(line) {

        // Refresh variables that are concerned with user-defined lines.
        tokenIndex = 0;

        // wrappedLineIndex = 0;
        // lineCharIndex = 0;
        lineTokens = [];

        overflowTokens = [];

        // Process the line token by token.
        let token = nextToken(line);
        while (token) {
            processToken(token);
            token = nextToken(line);
        }

        // If there was overflow, insert it now.
        // (i.e. at the end of the last wrapped line)
        if (overflowTokens.length) {
            insertOverflowTokens();
        }

        // Re-add newline character.
        // (if this is not the last user-defined line)
        if (lineIndex < numLines - 1) {
            insert('\n');
        }

        lineIndex += 1;
    });

    // Now that we figured out what the wrapped text would look like, check
    // whether we should keep the wrapping:
    // - If overflow is allowed,
    // - And there was only one user-defined line
    // - And there are two wrapped lines,
    // - And the second line is an orphan (compared to the first line),
    // Put the orphan back on first line (by returning the original text).
    const wrappedLines = wrappedText.split('\n');
    const totalLines = wrappedLines.length;

    if (overflowAllowed && (numLines === 1)) {
        if (wrappedLines.length === 2) {
            const line1 = wrappedLines[0];
            const line2 = wrappedLines[1];

            const wrappedTextAnnotationsTmp = util.merge([], wrappedTextAnnotations);
            const line1Annotations = V.findAnnotationsBetweenIndexes(wrappedTextAnnotationsTmp, 0, line1.length);
            const line2Annotations = V.shiftAnnotations(V.findAnnotationsBetweenIndexes(wrappedTextAnnotationsTmp, line1.length, (line1.length + line2.length)), line1.length, (-line1.length - 1));

            const line1Width = this.measureText(line1, attributes, line1Annotations).width;
            const line2Width = this.measureText(line2, attributes, line2Annotations).width;
            if (line2Width < Math.min(line1Width * MAX_OVERFLOW_WIDTH_RATIO, MAX_OVERFLOW_WIDTH)) {
                return {
                    numLines: totalLines,
                    text,
                    annotations
                };
            }
        }
    }

    return {
        numLines: totalLines,
        text: wrappedText,
        annotations: wrappedTextAnnotations
    };

    // HELPER FUNCTIONS:

    // Return next token on the `line` or `null` if there is none.
    // Each token has the following properties:
    // type ... the type of the token ('word' or 'whitespace').
    // text ... the text of the token
    // startIndex ... the index of the first character of the token in `text`.
    // endIndex ... the index after the last character of the token in `text`.
    function nextToken(line) {

        const token = {
            type: null,
            startIndex: tokenIndex,
            endIndex: tokenIndex,
            text: ''
        };

        while (tokenIndex < line.length) {
            const c = line[tokenIndex];
            if (isWhiteSpace(c)) {
                switch (token.type) {
                    case null:
                    case 'whitespace':
                        token.type = 'whitespace';
                        token.text += c;
                        token.endIndex += 1;
                        break;

                    default:
                        return token;
                }

            } else {
                switch (token.type) {
                    case 'whitespace':
                        return token;

                    default:
                        token.type = 'word';
                        token.text += c;
                        token.endIndex += 1;
                        break;
                }
            }

            tokenIndex += 1;
        }

        return (token.startIndex === token.endIndex) ? null : token;
    }

    function isWhiteSpace(c) {

        const re = /\s/;
        return re.test(c);
    }

    // Process one token.
    function processToken(token) {

        const hasLineTokens = !!lineTokens.length;
        const hasOverflowTokens = !!overflowTokens.length;

        // Is this the first token?
        const isFirstToken = !hasLineTokens && !hasOverflowTokens;

        // Measure the line up to and including the current token.
        let textSoFar = '';
        if (hasLineTokens) textSoFar = lineTokens[lineTokens.length - 1].cumulativeText;
        if (hasOverflowTokens) textSoFar = overflowTokens[overflowTokens.length - 1].cumulativeText;
        const cumulativeText = textSoFar + token.text;

        const sIndex = charIndex - textSoFar.length;
        const eIndex = charIndex + token.text.length;
        const textAnnotations = V.findAnnotationsBetweenIndexes(annotations, sIndex, eIndex);

        const lineStartIndex = wrappedCharIndex - textSoFar.length;
        const measurementAnnotations = util.toArray(textAnnotations).reduce(function(res, annotation) {

            res.push({
                start: annotation.start - lineStartIndex,
                end: annotation.end - lineStartIndex,
                attrs: annotation.attrs
            });

            return res;
        }, []);

        let lineWidth = measureText(cumulativeText, attributes, measurementAnnotations).width;

        // Is the token whitespace?
        const isTokenWhitespace = (token.type === 'whitespace');
        // Can token fit into available space on the line?
        const canFit = (lineWidth <= maxWidth);
        if (!hasOverflowTokens && (canFit || isTokenWhitespace)) {
            // The token fits into the current line.
            // (Whitespaces are always allowed to overflow.)

            // Insert the token.
            insert(token.text);
            pushLineToken(token, cumulativeText);
            return;
        }

        // Else: the token does not fit into the current line.

        // Try to hyphenate the token.
        // (Only possible if the token is not already a hyphenation piece.)
        const isTokenPiece = (token.type === 'piece');
        // Note: Hyphenation removed for now

        // Else: the token cannot be hyphenated.

        // Is the token too wide for the line?
        const isTokenTooWide = isFirstToken;
        // (If we got this far in the logic with the first token, we know
        // that its width is greater than `maxWidth (+ maxOverflowWidth)`.)
        if (isTokenTooWide) {

            // Just insert the token (will definitely overflow the line).
            insert(token.text);
            pushLineToken(token, cumulativeText);
            return;
        }

        // Else: we have to start a new line now.

        // Add a hyphen, if necessary.
        if (isTokenPiece && token.pieceIndex > 0) {
            // (Hyphens are allowed to overflow.)
            insert('-', true);
        }

        // Start a new line.
        // If all the tokens seen so far were only added into overflow
        // (i.e. nothing was added onto the line yet), then we do not need
        // to start a new line.
        if (hasLineTokens) {
            startNewLine();
        }

        // If there was overflow, insert those tokens into the line now.
        if (hasOverflowTokens) {
            insertOverflowTokens();
        }

        // Rerun the algorithm for the current token with updated line and
        // overflow information.
        processToken(token);
    }

    // Insert a piece of text to the resulting transformed wrapped text.
    // If `isNewText` is true, we are inserting a piece of text that was not
    // present in the original text. For example, if we add a newline
    // character, we must shift all the following annotations so that their
    // indices are properly updated.
    function insert(insertText, isNewText) {

        wrappedText += insertText;
        if (isNewText) {
            V.shiftAnnotations(wrappedTextAnnotations, charIndex, insertText.length);
        }
        wrappedCharIndex += insertText.length;
    }

    function pushLineToken(token, cumulativeText) {

        lineTokens.push({
            token,
            cumulativeText
        });

        charIndex += token.text.length;
    }

    // Start a new line.
    function startNewLine() {

        // Remove line's last whitespace token.
        const lastLineToken = lineTokens[lineTokens.length - 1];
        if (lastLineToken.type === 'whitespace') {
            remove(lastLineToken.text);
            // no need to remove token from `lineTokens`, it will be cleared soon anyway
        }

        // Add a newline character.
        // If there is already a newline character at the spot, collapse
        // the two.
        insert('\n', true);

        // Reset.
        lineTokens = [];
    }

    // Put overflow tokens on the new line.
    // (Here we assume that overflow space cannot be wider than `maxWidth`,
    // i.e. that `maxOverflowWidth <= maxWidth`,
    // i.e. `0 <= MAX_OVERFLOW_WIDTH_RATIO <= 1`.)
    function insertOverflowTokens() {

        let cumulativeText = '';

        overflowTokens.forEach(function(t) {

            cumulativeText += t.token.text;

            // Insert the token.
            insert(t.token.text);
            pushLineToken(t.token, cumulativeText);

            charIndex -= t.token.text.length;
        });

        // Reset.
        overflowTokens = [];
    }

    // Remove a piece of text from the resulting transformed wrapped text.
    // Always update annotations.
    // This happens when we collapse whitespace characters at the beginning
    // of lines.
    function remove(removedText) {

        V.shiftAnnotations(wrappedTextAnnotations, charIndex, -removedText.length);
        wrappedCharIndex -= removedText.length;
    }
}

let _textEl;
export function measureText(text, fontAttrs, textAnnotations, opt) {
    const localFontAttrs = fontAttrs || {};
    const options = opt || {
        heightCompensation: false
    };

    if (!_textEl) {
        const svg = V('svg');
        document.body.appendChild(svg.node);
        _textEl = V('text');
        _textEl.attr('visibility', 'hidden');
        svg.append(_textEl);
    }
    _textEl.attr({
        'font-weight': localFontAttrs['font-weight'],
        'font-size': localFontAttrs['font-size'],
        'font-family': localFontAttrs['font-family'],
        'letter-spacing': localFontAttrs['letter-spacing'],
        'style': 'font-kerning: none'
    });
    _textEl.text(text, {
        lineHeight: util.isEmpty(textAnnotations) ? (localFontAttrs['line-height'] || '1em') : 'auto',
        replaceNewLine: ' ',
        annotations: textAnnotations
    });
    // TODO: with new version of jointJS the next line is unnecessary
    _textEl.node.removeAttribute('display');
    // Note that we don't need to calculate bbox with transformations.
    const bbox = _textEl.bbox(true);
    if (options.heightCompensation) {
        bbox.height -= bbox.y;
    }
    bbox.y = 0;
    bbox.x = 0;

    return bbox;
}
