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

        namespace Paper {
            
            interface Options extends mvc.ViewOptions<Graph> {
                model?: Graph;
                el?: any;

            }

        }
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
        interface ElementView {
            model?:Cell
        }
        interface LinkView {
            model?:Link
        }

    }
}



