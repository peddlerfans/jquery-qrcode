
import joint from "../../node_modules/@clientio/rappid/rappid.js"
export class ToolbarService {

    toolbar: joint.ui.Toolbar = new joint.ui.Toolbar;

    create(commandManager: joint.dia.CommandManager, paperScroller: joint.ui.PaperScroller) {
        const { tools, groups } = this.getToolbarConfig();

        this.toolbar = new joint.ui.Toolbar({
            groups,
            tools,
            autoToggle: true,
            references: {
                paperScroller: paperScroller,
                commandManager: commandManager
            }
        });
    }

    getToolbarConfig() {

        return {

            groups: {
                'undo-redo': { index: 1 },
                'clear': { index: 2 },
                'export': { index: 3 },
                'fullscreen': { index: 4 },
                'order': { index: 5 },
                'layout': { index: 7 },
                'zoom': { index: 8 },
                'grid': { index: 9, default: 10 },
                'snapline': { index: 10 },
                'save': { index: 11 }
            },

            tools: [
                {
                    type: 'undo',
                    name: 'undo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Undo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'redo',
                    name: 'redo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Redo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'clear',
                    group: 'clear',
                    attrs: {
                        button: {
                            id: 'btn-clear',
                            'data-tooltip': 'Clear Paper',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'svg',
                    group: 'export',
                    text: 'Export SVG',
                    attrs: {
                        button: {
                            id: 'btn-svg',
                            'data-tooltip': 'Open as SVG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'png',
                    group: 'export',
                    text: 'Export PNG',
                    attrs: {
                        button: {
                            id: 'btn-png',
                            'data-tooltip': 'Open as PNG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },

                {
                    type: 'button',
                    group: 'layout',
                    name: 'layout',
                    attrs: {
                        button: {
                            // id: 'btn-layout',
                            'data-tooltip': 'Auto-layout Graph',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-to-fit',
                    name: 'zoom-to-fit',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom To Fit',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-out',
                    name: 'zoom-out',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom Out',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'label',
                    name: 'zoom-slider-label',
                    group: 'zoom',
                    text: 'Zoom:'
                },
                {
                    type: 'zoom-slider',
                    name: 'zoom-slider',
                    group: 'zoom'
                },
                {
                    type: 'zoom-in',
                    name: 'zoom-in',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom In',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                // {
                //     type: 'separator',
                //     group: 'grid'
                // },
                // {
                //     type: 'label',
                //     name: 'grid-size-label',
                //     group: 'grid',
                //     text: 'Grid size:',
                //     attrs: {
                //         label: {
                //             'data-tooltip': 'Change Grid Size',
                //             'data-tooltip-position': 'top',
                //             'data-tooltip-position-selector': '.toolbar-container'
                //         }
                //     }
                // },
                // {
                //     type: 'range',
                //     name: 'grid-size',
                //     group: 'grid',
                //     text: 'Grid size:',
                //     min: 1,
                //     max: 50,
                //     step: 1,
                //     value: 10
                // },
                // {
                //     type: 'separator',
                //     group: 'snapline'
                // },
                // {
                //     type: 'checkbox',
                //     name: 'snapline',
                //     group: 'snapline',
                //     label: 'Snaplines:',
                //     value: true,
                //     attrs: {
                //         input: {
                //             id: 'snapline-switch'
                //         },
                //         label: {
                //             'data-tooltip': 'Enable/Disable Snaplines',
                //             'data-tooltip-position': 'top',
                //             'data-tooltip-position-selector': '.toolbar-container'
                //         }
                //     }
                // },
                {
                    type: 'fullscreen',
                    name: 'fullscreen',
                    group: 'fullscreen',
                    attrs: {
                        button: {
                            'data-tooltip': 'Toggle Fullscreen Mode',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'save',
                    group: 'export',
                    text: 'Save',
                    attrs: {
                        button: {
                            id: 'btn-save',
                            'data-tooltip': 'Save data to backend',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
            ]
        };
    }

}
