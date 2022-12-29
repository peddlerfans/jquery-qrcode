import { firstLetterLowercase } from '../helpers/firstLetterLowercase.mjs';

export class VisioCell {

    constructor(init = {}) {
        this._name = init.name;
        this._value = init.value;
        this._formula = init.formula;
        this._units = init.units;
        this._cells = init.cells;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    get formula() {
        return this._formula;
    }

    get units() {
        return this._units;
    }

    eval() {
        return this._cells[firstLetterLowercase(this.name)];
    }

}
