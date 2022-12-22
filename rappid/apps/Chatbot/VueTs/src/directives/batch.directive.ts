/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { DirectiveOptions } from 'vue';

import { SharedEvents } from 'src/rappid/controller';

const BATCH_NAME = 'inspector-input';

const batchDirective: DirectiveOptions = {

    bind(element, binding, vnode): void {
        element.addEventListener('focus', onFocus);
        element.addEventListener('focusout', onFocusOut);

        function onFocus() {
            vnode.context.$eventBusService.emit(SharedEvents.GRAPH_START_BATCH, BATCH_NAME);
        }
        function onFocusOut() {
            vnode.context.$eventBusService.emit(SharedEvents.GRAPH_STOP_BATCH, BATCH_NAME);
        }
    }
};

export default batchDirective;
