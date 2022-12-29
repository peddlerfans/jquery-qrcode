export function isKnownFormula(cell, renderingContext) {
    const { formula } = cell;

    if (formula === 'PAGENUMBER()' && renderingContext)
        return true;

    return false;
}

export function resolveFormula(cell, renderingContext) {
    const { formula } = cell;

    if (formula === 'PAGENUMBER()') {
        const { page } = renderingContext;

        if (page.background)
            return '0';

        return String(page.index + 1);
    }
}
