import { util, V } from 'jointjs';

export function defineFilter(filter) {
    if (!util.isObject(filter)) {
        throw new TypeError('dia.Paper: defineFilter() requires 1. argument to be an object.');
    }

    let filterId = filter.id;
    const name = filter.name;
    // Generate a hash code from the stringified filter definition. This gives us
    // a unique filter ID for different definitions.
    if (!filterId) {
        filterId = name + this.svg.id + util.hashCode(JSON.stringify(filter));
    }
    // If the filter already exists in the document,
    // we're done and we can just use it (reference it using `url()`).
    // If not, create one.
    if (!this.isDefined(filterId)) {

        var namespace = util.filter;
        var filterSVGString = namespace[name] && namespace[name](filter.args || {});
        if (!filterSVGString) {
            throw new Error('Non-existing filter ' + name);
        }

        // Set the filter area to be 3x the bounding box of the cell
        // and center the filter around the cell.
        const filterAttrs = util.assign({
            filterUnits: 'userSpaceOnUse'
        }, filter.attrs, {
            id: filterId
        });

        V(filterSVGString, filterAttrs).appendTo(this.defs);
    }

    return filterId;
}
