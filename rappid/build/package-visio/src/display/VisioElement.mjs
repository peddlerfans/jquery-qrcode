import { dia, util } from 'jointjs';
import { definePattern } from './definePattern.mjs';
import { defineGradient } from './defineGradient.mjs';
import { defineFilter } from './defineFilter.mjs';

export const VisioElement = dia.Element.define(
    'visio.Element',
    //defaults
    {},
    // protoProps
    {},
    // staticProps
    {
        attributes: {
            filter: {
                qualify: util.isPlainObject,
                set: function(filter) {
                    return `url(#${defineFilter.call(this.paper, filter)})`
                }
            },
            fill: {
                qualify: util.isPlainObject,
                set: function(fill) {
                    switch (fill.type) {
                        case 'linearGradient':
                        case 'radialGradient':
                            return 'url(#' + defineGradient.call(this.paper, fill) + ')';
                        case 'pattern':
                            return 'url(#' + definePattern.call(this.paper, fill) + ')';
                    }
                }
            },
        }
    }
);
