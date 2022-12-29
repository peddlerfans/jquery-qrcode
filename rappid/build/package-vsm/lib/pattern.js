export const getMaterialPattern = (stroke, fill, size = 20) => {
    const h = size / 2;
    return {
        type: 'pattern',
        attrs: {
            'width': size,
            'height': size,
            'stroke': stroke,
            'fill': fill,
            'stroke-width': 2,
        },
        markup: [{
                tagName: 'rect',
                attributes: {
                    'width': size,
                    'height': size,
                    'stroke': 'none'
                }
            }, {
                tagName: 'path',
                attributes: {
                    'fill': 'none',
                    'd': `M 0 ${2 * h} L ${2 * h} 0 M ${h} ${3 * h} L ${3 * h} ${h} M -${h} ${h} L ${h} -${h}`
                }
            }]
    };
};
