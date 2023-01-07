/*! JointJS+ v3.6.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2022 client IO

 2022-11-22 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


 import joint from '../../node_modules/@clientio/rappid/rappid.js';
 import { MbtData } from '../stores/modules/mbt-data'
 const store = MbtData()

 export class KeyboardService {
 
     keyboard: joint.ui.Keyboard;
 
     constructor() {
         this.keyboard = new joint.ui.Keyboard();
     }
 
     create(
         graph: joint.dia.Graph,
         clipboard: joint.ui.Clipboard,
         selection: joint.ui.Selection,
         paperScroller: joint.ui.PaperScroller,
         commandManager: joint.dia.CommandManager
     ) {
 
         this.keyboard.on({
 
             'ctrl+c': () => {
 
                 // Copy all selected elements and their associated links.
                 clipboard.copyElements(selection.collection, graph);
             },
 
             'ctrl+v': () => {
 
                 const pastedCells = clipboard.pasteCells(graph);
 
                 const elements = pastedCells.filter(cell => cell.isElement());
 
                 // Make sure pasted elements get selected immediately. This makes the UX better as
                 // the user can immediately manipulate the pasted elements.
                 selection.collection.reset(elements);
             },
 
             'ctrl+x shift+delete': () => {
                 clipboard.cutElements(selection.collection, graph);
             },
 
             'delete backspace': (evt: JQuery.Event) => {
                 evt.preventDefault();
                 graph.removeCells(selection.collection.toArray());
             },
 
             'ctrl+z': () => {
                 commandManager.undo();
                 selection.cancelSelection();
             },

             'ctrl+s' :() =>{
                store.setIfsaveMbt(true)
             },
 
             'ctrl+y': () => {
                 commandManager.redo();
                 selection.cancelSelection();
             },
 
             'ctrl+a': () => {
                 selection.collection.reset(graph.getElements());
             },
 
             'ctrl+plus': (evt: JQuery.Event) => {
                 evt.preventDefault();
                 paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
             },
 
             'ctrl+minus': (evt: JQuery.Event) => {
                 evt.preventDefault();
                 paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
             },
 
             'keydown:shift': (evt: JQuery.Event) => {
                 paperScroller.setCursor('crosshair');
             },
 
             'keyup:shift': () => {
                 paperScroller.setCursor('grab');
             }
         });
     }
 }
 