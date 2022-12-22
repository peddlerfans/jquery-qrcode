import { mvc } from '@clientio/rappid';

export namespace Controller {

    export type Callback<
        TContext extends any,
        TFunction extends (...args: any) => any
        > = (
            ...args: [TContext, ...Parameters<TFunction>]
        ) => ReturnType<TFunction>;

    export interface EventMap<T> {
        [eventName: string]: Callback<T, (...args: any) => void>;
    }

}

export abstract class Controller<T extends any> extends mvc.Listener<[T]> {

    constructor(public readonly context: T) {
        super(context);
        this.startListening();
    }

    abstract startListening(): void;
}
