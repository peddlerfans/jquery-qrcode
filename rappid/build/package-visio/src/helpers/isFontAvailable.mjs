// https://gist.github.com/goblindegook/506781

export function isFontAvailable(font) {

    const testString = '~iomwIOMW';
    const fontArray = font instanceof Array;
    if (!fontArray) {
        font = [font];
    }

    const familySansSerif = 'sans-serif';
    const familyMonospace = 'monospace, monospace';
    // Why monospace twice? It's a bug in the Mozilla and Webkit rendering engines:
    // http://www.undermyhat.org/blog/2009/09/css-font-family-monospace-renders-inconsistently-in-firefox-and-chrome/

    // DOM:
    const container = document.createElement('div');
    const span = document.createElement('span');

    // CSS:
    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0px';
    container.style.fontWeight = 'bold';
    container.style.fontSize = '200px !important';

    span.appendChild(document.createTextNode(testString));
    container.appendChild(span);
    document.body.appendChild(container);

    let fontAvailability = [];

    font.forEach(function(f, index) {
        span.style.fontFamily = `${f},${familyMonospace}`;
        const monospaceFallbackWidth = span.offsetWidth;
        const monospaceFallbackHeight = span.offsetHeight;

        span.style.fontFamily = `${f},${familySansSerif}`;
        const sansSerifFallbackWidth = span.offsetWidth;
        const sansSerifFallbackHeight = span.offsetHeight;

        fontAvailability[index] = true
            && monospaceFallbackWidth == sansSerifFallbackWidth
            && monospaceFallbackHeight == sansSerifFallbackHeight;
    });

    document.body.removeChild(container);

    if (!fontArray && fontAvailability.length == 1) {
        fontAvailability = fontAvailability[0];
    }

    return fontAvailability;
}
