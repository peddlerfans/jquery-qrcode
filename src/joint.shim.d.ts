import jointjs from 'jointjs'
import { PathParserOptions } from 'vue-router'
import 'vue-router';
import { any } from 'vue-types';
import $ from 'jquery'


declare module JQuery {
    namespace JQuery {
        interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {

        }
    }
}
declare module 'jointjs' {

    namespace dia {

        namespace Paper {
            interface Options {
                model?: Graph;
                el?: any;

            }

        }
        interface CellView {
            model?: Cell;
        }
        
    }

}


declare module 'vue-router' {
    //    interface RouteMeta {
    //      requiresAuth?: boolean
    //    }
    interface _RouteRecordBase extends PathParserOptions {

        meta?: any
    }
    interface RouteMeta extends VRouteMeta {
        icon?: any;
    }
    type RouteRecordRaw = RouteRecordSingleView | RouteRecordSingleViewWithChildren | RouteRecordMultipleViews | RouteRecordMultipleViewsWithChildren | RouteRecordRedirect | any;


}

