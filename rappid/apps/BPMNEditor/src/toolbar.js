/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


window.toolbarConfig = {

    tools: [
        {
            type: 'button',
            name: 'print',
            attrs: {
                button: {
                    'data-tooltip': 'Open a Print Dialog'
                }
            }
        },
        {
            type: 'button',
            name: 'to-json',
            attrs: {
                button: {
                    'data-tooltip': 'Open As JSON'
                }
            }
        },
        {
            type: 'zoom-in',
            name: 'zoom-in',
            attrs: {
                button: {
                    'data-tooltip': 'Zoom In'
                }
            }
        },
        {
            type: 'zoom-out',
            name: 'zoom-out',
            attrs: {
                button: {
                    'data-tooltip': 'Zoom Out'
                }
            }
        },
        {
            type: 'button',
            name: 'clear',
            attrs: {
                button: {
                    'data-tooltip': 'Clear Paper'
                }
            }
        },
        {
            type: 'undo',
            name: 'undo',
            attrs: {
                button: {
                    'data-tooltip': 'Undo'
                }
            }
        },
        {
            type: 'redo',
            name: 'redo',
            attrs: {
                button: {
                    'data-tooltip': 'Redo'
                }
            }
        }
    ]
};
