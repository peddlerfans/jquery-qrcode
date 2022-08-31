import jointjs from 'jointjs'
import {PathParserOptions} from 'vue-router'

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


declare interface _RouteRecordBase extends PathParserOptions {

    meta?: any
}

declare interface RouteMeta extends VRouteMeta {
    icon?:any;
}

declare type RouteRecordRaw = RouteRecordSingleView | RouteRecordSingleViewWithChildren | RouteRecordMultipleViews | RouteRecordMultipleViewsWithChildren | RouteRecordRedirect |any;