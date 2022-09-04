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

    export namespace dia {
        interface Paper {
            $el?:any
        }

        namespace Paper {
            
            interface Options {
                model?: Graph;
                el?: any;

            }

        }
        interface Cell {
            position(x:number,y:number,opt?:any) : any;
        }
       
        interface CellView {
            model?: Cell;
        }

    }
}



