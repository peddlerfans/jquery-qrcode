/* eslint-disable no-console */
/*
    1 - console.log
    2 - tooltips
    4 - text frames
*/

export const debug = {

    CONSOLE: 1<<0,
    TOOLTIPS: 1<<2,
    TEXT_FRAMES: 1<<2,

    level: 0,

    log
}

function log() {
    if (debug.level & debug.CONSOLE) {
        console.log(...arguments);
    }
}
