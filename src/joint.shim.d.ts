import jointjs from 'jointjs'
import { PathParserOptions } from 'vue-router'
import 'vue-router';
<<<<<<< HEAD
import { any } from 'vue-types';
import $ from 'jquery'

declare module JQuery {
    namespace JQuery {
        interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {

        }
    }
}
declare module 'jointjs' {

    export namespace dia {

        namespace Paper {
            
            interface Options extends mvc.ViewOptions<Graph> {
=======
declare module 'jointjs' {

    namespace dia {

        namespace Paper {
            interface Options {
>>>>>>> 3e242a4... 更新
                model?: Graph;
                el?: any;

            }

        }
<<<<<<< HEAD
        interface Paper {
            $el?:any,
            // Options?:mvc.ViewOptions<Graph> 

        }

        interface Cell {
            position(x:number,y:number,opt?:any) : any;
            [x: string]: any;
        }
       
        interface CellView {
            model?: Cell;
        }

    }
}


=======
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
>>>>>>> 3e242a4... 更新

