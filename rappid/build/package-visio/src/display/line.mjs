/**
 * @param {number} linePattern (1-23)
 * @return {string}
 */
export function getLinePatternStrokeDasharray(linePattern){
    switch (linePattern){
        case 1:
        default:
            return 'none'; // solid
        case 2:
            return '7 5';
        case 3:
            return '0 5';
        case 4:
            return '7 5 0 5';
        case 5:
            return '7 5 0 5 0 5';
        case 6:
            return '7 5 7 5 0 5';
        case 7:
            return '19 5 7 5';
        case 8:
            return '19 5 7 5 7 5';
        case 9:
            return '3 3';
        case 10:
            return '0 5';
        case 11:
            return '3 3 0 3';
        case 12:
            return '3 3 0 3 0 3';
        case 13:
            return '3 3 3 3 0 3';
        case 14:
            return '9 3 3 3';
        case 15:
            return '9 3 3 3 3 3';
        case 16:
            return '15 9';
        case 17:
            return '0 9';
        case 18:
            return '15 9 0 9';
        case 19:
            return '15 9 0 9 0 9';
        case 20:
            return '15 9 15 9 0 9';
        case 21:
            return '39 9 15 9';
        case 22:
            return '39 9 15 9 15 9';
        case 23:
            return '1 2';
    }
}
