import jointjs from 'jointjs'
import { Axios, AxiosResponse } from "axios"
import { PathParserOptions } from 'vue-router'
import 'vue-router';
import { any } from 'vue-types';
import $ from 'jquery'
import { S } from 'vitest/dist/global-d05ffb3f';
import { Container } from 'postcss';

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
            $el?: any,
            // Options?:mvc.ViewOptions<Graph> 

        }

        interface Cell {
            position(x: number, y: number, opt?: any): any;
            [x: string]: any;
        }

        interface CellView {
            model?: Cell;
        }
        interface ElementView {
            model?: Cell
        }
        interface LinkView {
            model?: Link
        }
        interface Graph {
            model?: Cell,
            attributes: any,
            on<T extends keyof Paper.EventMap = keyof Paper.EventMap>(eventName: T, callback: Paper.EventMap[T], context?: any): this;
            // addCell(cell: Cell.JSON | Cell, opt?: CollectionAddOptions): this;
        }
    }
    export namespace shapes {
        class Container {
            static Parent: any;
            static Child: any;

        }
    }

}
interface Label {
    text: string
}
interface Attrs {
    label: Label
}

interface Cell {
    type: string,
    attrs?: Attrs,
    id: string
}
interface Cells {
    cells: Cell[]
}
interface ModelDefinition {
    cellsinfo: Cells,
    props: object
}

interface DataDefinition {
    dataForm: any;
    dataForm: any;
    dataForm: any;
    data: any,
    meta: object,
    resources: object
}
interface DynamicModel {
    [x: string]: any[],
    option?: any,
    factor?: any,
    constraint?: any,
    data?: any
}
declare module 'axios' {
    interface ResponseData<T> {
        map: any;
        length: number;
        outputLang: any;
        results: any;
        error: any;
        config: any;
        // model(model: any): any;
        hlfs?: number,
        template_codegen?: number,
        template_dynamic?: number,
        template_meta?: number,
        template_static?: number,
        test_model?: number,
        web_hook?: number,

        model?: any | any[],
        code: number,
        msg: string,
        data: T | null
        total?: any
        name?: any
        _id?: string,
        description?: string,
        templateText?: any,
        tags?: [],
        modelDefinition?: ModelDefinition,
        dataDefinition?: DataDefinition
    }
}




