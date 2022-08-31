import jointjs from 'jointjs'
import { PathParserOptions } from 'vue-router'
import 'vue-router';
declare module 'jointjs' {

    namespace dia {

        namespace Paper {
            interface Options {
                model?: Graph;
                el?: any;

            }

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

