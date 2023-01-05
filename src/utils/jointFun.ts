export function fitAncestors(element: any) {
    // console.log(element.parent());
    
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