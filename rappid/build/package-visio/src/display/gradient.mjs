/** @enum {string} GradientType */
export const GradientType = {
    linear: 'linear',
    radial: 'radial',
    rectangle: 'rectangle',
    path: 'path',
};

export function getFillGradient({
    fillGradientDir,
    fillGradientSection,
    fillGradientAngle
}) {
    const gradient = getFillGradientDefinition(fillGradientDir);
    const stops = getFillGradientStops(fillGradientSection);

    let type;
    switch (gradient.type) {
        case GradientType.linear:
            type = 'linearGradient';
            break;
        default:
        case GradientType.radial:
            type = 'radialGradient';

        //TODO miky implement
        // @see {https://stackoverflow.com/questions/47166364/svg-rectangular-and-path-gradient}
        // case GradientType.rectangle:
        // case GradientType.path:
    }

    const attrs = {};

    // if (fillGradientAngle) {
    //     //TODO miky solve units mismatch
    //     if (fillGradientAngle > 0 && fillGradientAngle < 2 * Math.PI)
    //         fillGradientAngle = 360 - (fillGradientAngle * 180 / Math.PI);
    //     attrs.gradientTransform = `rotate(${fillGradientAngle})`;
    // }

    return {
        type,
        stops,
        attrs
    }
}

/** @enum {string} Side */
export const Side = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    center: 'center'
};

/** @enum {string} Base */
export const Base = {
    Shape: 'Shape',
    BoundingBox: 'BoundingBox',
};

function getFillGradientDefinition(gradientDir) {
    switch (gradientDir) {
        case 0:
            // Specifies a linear fill color gradient.
            return { type: GradientType.linear };
        case 1:
            // Specifies the fill color gradient of the shape is in
            // radial mode from the
            // bottom right corner of the shape.
            return {
                type: GradientType.radial,
                base: Base.Shape,
                vertical: Side.bottom,
                horizontal: Side.right,
            };
        case 2:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // bottom left corner of the bounding box of the shape.
            return {
                type: GradientType.radial,
                base: Base.Shape,
                vertical: Side.bottom,
                horizontal: Side.left,
            };
        case 3:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // center of the shape.
            return {
                type: GradientType.radial,
                base: Base.Shape,
                vertical: Side.center,
                horizontal: Side.center,
            };
        case 4:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // center of the bottom edge of the shape.
            return {
                type: GradientType.radial,
                base: Base.Shape,
                vertical: Side.bottom,
                horizontal: Side.center,
            };
        case 5:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // center of the top edge of the shape.
            return {
                type: GradientType.radial,
                base: Base.Shape,
                vertical: Side.top,
                horizontal: Side.center,
            };
        case 6:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // top right corner of the bounding box of the shape.
            return {
                type: GradientType.radial,
                base: Base.BoundingBox,
                vertical: Side.bottom,
                horizontal: Side.right,
            };
        case 7:
            //Specifies the fill color gradient of the shape is in
            // radial mode from the
            // top left corner of the bounding box of the shape.
            return {
                type: GradientType.radial,
                base: Base.BoundingBox,
                vertical: Side.bottom,
                horizontal: Side.right,
            };
        case 8:
            //Specifies the fill color gradient of the shape is in
            // rectangle mode from the
            // bottom right corner of the bounding box of the shape.
            return {
                type: GradientType.rectangle,
                base: Base.Shape,
                vertical: Side.bottom,
                horizontal: Side.right,
            };
        case 9:
            //Specifies the fill color gradient of the shape is in
            // rectangle mode from the
            // bottom left corner of the bounding box of the shape.
            return {
                type: GradientType.rectangle,
                base: Base.Shape,
                vertical: Side.bottom,
                horizontal: Side.left,
            };
        case 10:
            //Specifies the fill color gradient of the shape is in
            // rectangle mode from the
            // center of the shape.
            return {
                type: GradientType.rectangle,
                base: Base.Shape,
                vertical: Side.center,
                horizontal: Side.center,
            };
        case 11:
            //Specifies the fill color gradient of the shape is in
            // rectangle mode from the
            // top right corner of the bounding box of the shape.
            return {
                type: GradientType.rectangle,
                base: Base.Shape,
                vertical: Side.top,
                horizontal: Side.right,
            };
        case 12:
            //Specifies the fill color gradient of the shape is in
            // rectangle mode from the
            // top left corner of the bounding box of the shape.
            return {
                type: GradientType.rectangle,
                base: Base.Shape,
                vertical: Side.top,
                horizontal: Side.left,
            };
        case 13:
            // not in spec (Visio 2013)
            return { type: GradientType.path };
    }
}

function getFillGradientStops(fillGradientSection) {
    const rows = fillGradientSection.rows;

    return rows
        .map(row => row.cells)
        .map(cells =>
            ({
                offset: cells.gradientStopPosition,
                color: cells.gradientStopColor,
                opacity: 1 - cells.gradientStopColorTrans,
            }))
}
