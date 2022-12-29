import { getLineHeight } from './text.mjs';
import { firstLetterUppercase } from '../helpers/firstLetterUppercase.mjs';
import { debug } from '../helpers/debug.mjs';
import { measureText, wrapTextByWord } from './wrapTextByWord.mjs';
import { util } from 'jointjs';

export function getAnnotatedText(shape) {
    // ---------------- text defaults ------------------
    const contentArray = [];
    let firstFont = null;
    let firstFontSize = null;
    let fontSize = 10;
    let annotations = [];

    let start;
    let end = 0;

    const { text } = shape;

    // ---------------- paragraph  -----------------------
    // by docs should be treated as more paragraph properties in one text possible
    // but not present in PoC vsdxs
    //TODO treat as more blocks
    const defaultParagraphCells =
        shape.sections.get('Paragraph')[0].rows[0].cells;

    let {
        // indFirst | ...the distance that the first line of text in each paragraph of a shape’s text block is indented from the left edge of the paragraph. ...
        // indFirst, // 0,
        // indLeft | ...the distance that all lines of text in a paragraph are indented from the left margin of the text block of a shape.
        // indLeft, // 0,
        // indRight, // 0,
        // spLine |  ...the height of a line of text in the text block of a shape.
        // If the value of the structure is greater than or equal to zero, then the height of the line is equal to the
        // value of the structure. If the value of the structure is less than zero, then the height of the line is
        // equal to the absolute value of the structure multiplied by the largest font size of text in the line.
        spLine, // -115.19999999999999,
        // spBefore | ... an amount of space inserted
        // before each paragraph in the text block of a shape except for the first paragraph. Other paragraph
        // properties can specify additional amounts of space.
        // spBefore, // 0,
        // spAfter, // 0,
        // horzAlign | ... the horizontal alignment text properties of a text paragraph.
        // 0 left   |   1 centered    |   2 right   |  3 justified   |  4 distributed
        horzAlign, // 0,

        // bullet, // 0,
        // bulletStr, // "",
        // bulletFont, // "0",
        // bulletFontSize, // -96,
        // textPosAfterBullet, // 0,
        // flags | 0 LTR | 1 RTL
        // flags, // 0
    } = defaultParagraphCells;
    // override with all props found last wins (not perfect, but for now)
    text.forEach(
        textFragment => {
            if (textFragment.paragraphProperties) {
                const values = textFragment.paragraphProperties.values;
                // if (values.indFirst !== undefined) indFirst = values.indFirst;
                // if (values.indLeft !== undefined) indLeft = values.indLeft;
                // if (values.indRight !== undefined) indRight = values.indRight;
                if (values.spLine !== undefined) spLine = values.spLine;
                // if (values.spBefore !== undefined) spBefore = values.spBefore;
                // if (values.spAfter !== undefined) spAfter = values.spAfter;
                if (values.horzAlign !== undefined) horzAlign = values.horzAlign;
                // if (values.bullet !== undefined) bullet = values.bullet;
                // if (values.bulletStr !== undefined) bulletStr = values.bulletStr;
                // if (values.bulletFont !== undefined) bulletFont = values.bulletFont;
                // if (values.bulletFontSize !== undefined) bulletFontSize = values.bulletFontSize;
                // if (values.textPosAfterBullet !== undefined) textPosAfterBullet = values.textPosAfterBullet;
                // if (values.flags !== undefined) flags = values.flags;
            }
        });

    // ---------------- text fragments ------------------
    const defaultCharacterCells =
        shape.sections.get('Character')[0].rows[0].cells; // at least default always prepared

    // TODO: this picks line height based on largest font size which creates unpredictable
    // results as some text blocks contain a single larger character (i.e. icon) which makes
    // entire text with LH as if it's the size of that icon (i.e. BRND/P:1/ID:190)
    const lineHeight = getLineHeight(spLine, text, defaultCharacterCells);

    text.forEach(
        textFragment => {
            let content = textFragment.content; // string

            start = end;
            const length = content.length; // always > 0 (checked during parsing)
            end = start + length;

            let {
                uppercase, // 0 no | 1 uppercase | 2 capitalize
                font, // "Agency FB"
                color, // "#000000"
                style, // 0
                // pos, // 0
                // fontScale, // 1
                size, // 16.000000000000004
                // dblUnderline, // false
                // overline, // false
                // strikethru, // false
                // doubleStrikethrough, // false
                letterspace, // 0
                // colorTrans, // 0
                // asianFont, // "0"
                // complexScriptFont, // "0"
                // complexScriptSize, // -96
                // langID, // "en-US"
            } = defaultCharacterCells;
            if (textFragment.characterProperties) {
                const values = textFragment.characterProperties.values;
                if (values.uppercase !== undefined) uppercase = values.uppercase;
                if (values.font !== undefined) font = values.font;
                if (values.color !== undefined) color = values.color;
                if (values.style !== undefined) style = values.style;
                // if (values.pos !== undefined) pos = values.pos;
                // if (values.fontScale !== undefined) fontScale = values.fontScale;
                if (values.size !== undefined) size = values.size;
                // if (values.dblUnderline !== undefined) dblUnderline = values.dblUnderline;
                // if (values.overline !== undefined) overline = values.overline;
                // if (values.strikethru !== undefined) strikethru = values.strikethru;
                // if (values.doubleStrikethrough !== undefined) doubleStrikethrough = values.doubleStrikethrough;
                if (values.letterspace !== undefined) letterspace = values.letterspace;
                // if (values.colorTrans !== undefined) colorTrans = values.colorTrans;
                // if (values.asianFont !== undefined) asianFont = values.asianFont;
                // if (values.complexScriptFont !== undefined) complexScriptFont = values.complexScriptFont;
                // if (values.complexScriptSize !== undefined) complexScriptSize = values.complexScriptSize;
                // if (values.langID !== undefined) langID = values.langID;
            }

            const annotationAttrs = {}

            if (uppercase === 1) {
                content = content.toUpperCase();
            }
            if (uppercase === 2) {
                content = firstLetterUppercase(content);
                annotationAttrs['text-transform'] = 'capitalize';
            }

            // TODO: can it be done here?
            if (letterspace && letterspace !== 0) {
                annotationAttrs['letter-spacing'] = letterspace;
            }

            if (font) {
                if (!firstFont)
                    firstFont = font;

                // use even when not available (browser will handle that)
                annotationAttrs['font-family'] = font;
            }

            if (size !== undefined) {
                if (!firstFontSize)
                    firstFontSize = size;

                annotationAttrs['font-size'] = size;
                // TODO: error in conversion
                if (annotationAttrs['font-size'] < 1) annotationAttrs['font-size'] = 12;
                fontSize = Math.max(fontSize, annotationAttrs['font-size']);
            }
            if (color !== undefined) {
                annotationAttrs['fill'] = color;
            }

            if (style !== undefined) {
                // https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-vsdx/a87e85ee-cf76-4e0b-a09e-638c871c28e2
                if (style & 4) annotationAttrs['text-decoration'] = 'underline';
                if (style & 2) annotationAttrs['font-style'] = 'italic';
                if (style & 1) annotationAttrs['font-weight'] = 'bold';
            }

            contentArray.push(content);
            const annotation = {
                start,
                end,
                attrs: annotationAttrs
            }
            annotations.push(annotation);
        });

    const contentMerged = contentArray.join('').trimEnd();

    return {
        mergedText: contentMerged,
        annotations,
        lineHeight,
        firstFont,
        firstFontSize,
        horzAlign,
    }
}

export function enrichShapeTextAttributes(
    shape,
    {
        markup,
        attrs,
        prefix,
        isRootGroupText
    }) {
    const {
        cells,
        width,
        height
    } = shape;

    const {
        angle,
        locPinX = width / 2,
        locPinY = height / 2,
        txtAngle = 0,
        flipX,
        flipY,
        txtHeight = height,
        txtWidth = width,
        txtPinX = width / 2,
        txtPinY = height / 2,
        txtLocPinX = txtWidth / 2,
        txtLocPinY = txtHeight / 2,
        verticalAlign,
        leftMargin = 0,
        rightMargin = 0,
        topMargin = 0,
        bottomMargin = 0,
    } = cells;

    // --------------- text group -------------------
    const labelSelector = `${prefix}text`;

    let sx = flipX ? -1 : 1,
        sy = flipY ? -1 : 1,
        tx = flipX ? -txtWidth + locPinX - txtPinX + txtLocPinX : -locPinX + txtPinX - txtLocPinX,
        ty = flipY ? height - locPinY + txtPinY - txtLocPinY : height - txtHeight + locPinY - txtPinY + txtLocPinY,
        ra = angle,
        rx = flipX ? txtWidth - locPinX + txtPinX - txtLocPinX : locPinX - txtPinX + txtLocPinX,
        ry = flipY ? locPinY - txtPinY + txtLocPinY : txtHeight - locPinY + txtPinY - txtLocPinY,
        ra2 = sx * sy * txtAngle,
        rx2 = flipX ? txtLocPinX - txtWidth : txtLocPinX,
        ry2 = flipY ? txtLocPinY : txtHeight - txtLocPinY;

    if (isRootGroupText) {
        tx += locPinX;
        ty -= locPinY;
    }

    const translation = `translate(${tx}, ${ty})`;
    const rotation = `rotate(${ra}, ${rx}, ${ry})`;
    const textRotation = `rotate(${ra2}, ${rx2}, ${ry2})`;

    const transform = [
        translation,
        rotation,
        textRotation
    ].join(' ');


    const children = [{
        tagName: 'text',
        selector: labelSelector,
        attributes: {
            'stroke': 'none',
            'fill': '#000000'
        }
    }];

    if (debug.level & debug.TEXT_FRAMES) {
        children.unshift({
            tagName: 'rect',
            attributes: {
                width: txtWidth,
                height: txtHeight,
                fill: 'transparent',
                stroke: '#ff0000',
                strokeWidth: 1
            },
        })
    }

    markup.push({
        tagName: 'g',
        text: true,
        attributes: {
            transform: transform,
        },
        children
    });

    const {
        mergedText,
        annotations,
        lineHeight,
        firstFont,
        firstFontSize,
        horzAlign
    } = getAnnotatedText(shape);

    const wrappedText = wrapTextByWord(mergedText, {
        annotations: annotations,
        hyphenationAllowed: false,
        maxWidth: txtWidth - leftMargin - rightMargin
    });

    const labelAttrs = attrs[labelSelector] = {
        text: wrappedText.text,
        lineHeight,
        fontFamily: firstFont || 'sans-serif',
        letterSpacing: 0,
        firstFontSize,
        annotations: wrappedText.annotations,
    };

    const fontShoulder = (lineHeight - firstFontSize) / 2;

    util.assign(
        labelAttrs,
        verticalTextPosition({
            verticalAlign,
            height,
            topMargin,
            fontShoulder,
            bottomMargin,
            txtPinY,
            txtLocPinY,
            txtHeight
        }),
        horizontalTextPosition({
            horzAlign,
            width,
            leftMargin,
            rightMargin,
            txtPinX,
            txtLocPinX,
            txtWidth
        })
    );
}

function verticalTextPosition({ verticalAlign, height, topMargin, fontShoulder, bottomMargin, txtHeight = height, txtLocPinY = txtHeight / 2 }) {
    // https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-vsdx/732e98b3-21eb-4d11-82ef-68287a55c1be
    let y = (topMargin + txtHeight - bottomMargin)/2;
    let textVerticalAnchor = 'middle';

    // verticalAlign: 0 = top, 1 = middle, 2 = bottom, 3+ = top
    switch (verticalAlign) {
        case 1:
            break;
        case 2:
            y = txtHeight - bottomMargin - fontShoulder;
            textVerticalAnchor = 'bottom';
            break;
        case 0:
        default:
            y = topMargin + fontShoulder;
            textVerticalAnchor = 'top';
            break;
    }

    return { y, textVerticalAnchor };
}

function horizontalTextPosition({ horzAlign, width, leftMargin, rightMargin, txtWidth = width }) {
    // https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-vsdx/1c184dde-942b-45ec-93b7-08e0eeb1e3a7
    // 0 = left, 1 = center, 2 = right, 3 = justified, 4 = distributed(?)
    // justified is not handled at all yet
    let x = (leftMargin + txtWidth - rightMargin)/2;
    let textAnchor = 'middle';

    switch (horzAlign) {
        case 0:
            x = leftMargin;
            textAnchor = 'start';
            break;
        case 2:
            x = txtWidth - rightMargin;
            textAnchor = 'end';
            break;
    }

    return { x, textAnchor };
}

export function measureShapeText(shape, { maxWidth }) {
    const { mergedText, annotations } = getAnnotatedText(shape);
    const wrappedText = wrapTextByWord(mergedText, {
        annotations,
        maxWidth: maxWidth
    });

    return measureText(wrappedText.text, {}, annotations);
}
