/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia, ui } from '@clientio/rappid';

import { Controller } from 'src/rappid/controller';
import { createPlugins } from 'src/rappid/plugins';
import { RappidController, KeyboardController } from 'src/rappid/controllers';
import { actionCreator } from '../redux/helpers/actionCreator';
import { STORE_RAPPID } from '../redux/helpers/actionTypes';

export class RappidService {

    public controllers: { rappid: Controller, keyboard: Controller };
    public graph: dia.Graph;
    public history: dia.CommandManager;
    public keyboard: ui.Keyboard;
    public paper: dia.Paper;
    public selection: dia.Cell[] = [];
    public scroller: ui.PaperScroller;
    public stencil: ui.Stencil;
    public toolbar: ui.Toolbar;
    public tooltip: ui.Tooltip;

    constructor(
        private scopeElement: Element,
        paperElement: Element,
        stencilElement: Element,
        toolbarElement: Element,
        public readonly dispatch: Function,
    ) {
        Object.assign(this, createPlugins(scopeElement, paperElement, stencilElement, toolbarElement));
        this.controllers = {
            rappid: new RappidController(this),
            keyboard: new KeyboardController(this)
        };
        this.dispatch(actionCreator(STORE_RAPPID, this));
    }

    public destroy(): void {
        const { paper, scroller, stencil, toolbar, tooltip, controllers } = this;
        paper.remove();
        scroller.remove();
        stencil.remove();
        toolbar.remove();
        tooltip.remove();
        Object.keys(controllers).forEach(name => controllers[name].stopListening());
    }
}

export default RappidService;
