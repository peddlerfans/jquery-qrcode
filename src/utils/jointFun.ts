export function fitAncestors(element: any) {
    console.log(element.getAncestors());

    var padding = 20;
    var headerHeight = 20;
    element.getAncestors().forEach(function (container: any) {
        container.fitEmbeds({
            padding: {
                top: headerHeight + padding,
                left: padding,
                right: padding,
                bottom: padding
            }
        });
    });
}
export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}