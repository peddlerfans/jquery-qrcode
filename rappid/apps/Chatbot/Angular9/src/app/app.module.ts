/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ChatbotModule } from 'src/app/chatbot/chatbot.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ChatbotModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
