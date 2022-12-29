import { pixelsToInches } from '../helpers/internalUnits.mjs';

export function getLineHeight(spLine, text, defaultCharacterCells) {
    // greater than or equal to zero, then the height of the line is equal to the value
    if (spLine >= 0)
        return spLine;

    // less than zero, then the height of the line is equal to the absolute value
    // of the structure multiplied by the largest font size of text in the line

    //TODO miky better way rough value
    //TODO miky work with lines separately
    const roughSpLine = pixelsToInches(-spLine);

    return getLargestFontSize(text, defaultCharacterCells) * roughSpLine;
}

function getLargestFontSize(text, defaultCharacterCells) {
    let { size } = defaultCharacterCells;

    text.forEach(textFragment => {
        const characterProperties = textFragment.characterProperties;
        if (characterProperties) {
            const customSize = characterProperties.values.size;
            if (characterProperties.values.size !== undefined)
                size = Math.max(size, customSize);
        }
    })

    return size;
}
