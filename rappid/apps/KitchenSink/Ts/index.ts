/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import * as joint from '@clientio/rappid';
import '@clientio/rappid/rappid.css';

import KitchenSinkService from './src/services/kitchensink-service';
import {StencilService} from './src/services/stencil-service';
import {ToolbarService} from './src/services/toolbar-service';
import {InspectorService} from './src/services/inspector-service';
import {HaloService} from './src/services/halo-service';
import {KeyboardService} from './src/services/keyboard-service';

import {ThemePicker} from './src/components/theme-picker';
import {sampleGraphs} from './src/config/sample-graphs';

const app = new KitchenSinkService(
    document.getElementById('app'),
    new StencilService(),
    new ToolbarService(),
    new InspectorService(),
    new HaloService(),
    new KeyboardService()
);

app.startRappid();

const themePicker = new ThemePicker({ mainView: app });
themePicker.render().$el.appendTo(document.body);

app.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));

// for easier debugging in the browser's console
declare var window: any;
window['joint'] = joint;
window['app'] = app;
