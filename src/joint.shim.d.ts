import jointjs from 'jointjs'

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
