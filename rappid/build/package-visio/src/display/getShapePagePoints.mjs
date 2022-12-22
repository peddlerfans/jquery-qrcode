export function getShapePagePoints(shape) {

    const [geometry] = shape.getComputedGeometry();
    if (!geometry) return null;

    const { width, height, pageContent } = shape;
    const {
        locPinX,
        locPinY,
        angle,
        flipX,
        flipY,
    } = shape.cells;

    const path = geometry.toPath(width, height);
    const [polyline] = path.toPolylines();
    polyline.simplify();
    const relativePoints = polyline.points;
    const flipMod = (flipX && !flipY) || (flipY && !flipX);

    relativePoints.forEach(relativePoint => {
        const x = locPinX;
        const y = locPinY;
        relativePoint.translate(0, -height).scale(1,-1);
        if (angle) {
            relativePoint.rotate({ x, y }, flipMod ? -angle : angle);
        }
    });

    const sx = flipX ? -1 : 1;
    const sy = flipY ? -1 : 1;
    polyline.scale(sx, sy, { x: locPinX, y: locPinY });

    // TODO: Can't use shape.getPagePosition() when height has a negative value
    const matrix = shape.getPageMatrix();
    const px = matrix.e;
    const py = pageContent.page.height - matrix.f;

    const pagePoints = relativePoints.map(({ x, y }) => {
        return { x: px + x, y: py - y };
    });

    return pagePoints;
}
