import { VisioJxonShapeKey } from '../types/enums.mjs';
import { toArray } from '../helpers/toArray.mjs';
import { getRootAttributes } from './parseJxon.utils.mjs';
import { VisioConnect } from '../models/VisioConnect.mjs';
import { debug } from '../helpers/debug.mjs';

/**
 * @this {Visio}
 * @param {Map<number,VisioConnects>} connects
 * @returns {Map<number, Connect>}
 */
export function instantiateConnects(connects) {
    const result = new Map();

    connects.forEach((connect, shapeId) =>
        result.set(
            shapeId,
            new VisioConnect({
                archive: this,
                ...connect,
            })))

    return result;
}

/**
 * @this {visio}
 * @param {VisioJxon} connectsJxon
 * @param {VisioStructurePath} structurePath
 * @returns {Array<VisioConnects>}
 */
export function parseConnects(
    connectsJxon,
    structurePath
) {

    const connects = toArray(connectsJxon[VisioJxonShapeKey.Connect]);

    const parsedConnections = connects.map(
        connectJxon =>
            getRootAttributes(
                connectJxon,
                VisioJxonShapeKey.Connect,
                structurePath)
    );

    /*
    parsed item
    {
        "fromSheet": 379,
        "fromCell": "EndX",
        "fromPart": 12,
        "toSheet": 347,
        "toCell": "Connections.Float.X",
        "toPart": 104
    }*/

    return getJoinedConnections(parsedConnections);
}


/**
 * Normalize grouped source, target and connecting shape
 * @param {Array<VisioParsedConnect>} parsedConnections
 * @returns {Map<number, VisioConnects>}
 */
function getJoinedConnections(parsedConnections) {
    const result = new Map();

    const groupedByConnectShape = getGroupConnections(parsedConnections);

    groupedByConnectShape.forEach((
        { source, target },
        shapeId
    ) => {
        result.set(shapeId, {
            shapeId,
            source: source || null,
            target: target || null,
        });
    });

    return result;
}

/**
 * Group source, target and connecting shape
 * @param {Array<VisioParsedConnect>} parsedConnections
 * @returns {
 *      Map<number, {
 *          source: VisioConnect,
 *          target: VisioConnect
 *      }>
 *  }
 */
function getGroupConnections(parsedConnections) {
    const groupedByConnectShape = new Map();

    parsedConnections.forEach(
        parsedConnection => {
            const connectionShapeId = parsedConnection.fromSheet;
            if (!groupedByConnectShape.has(connectionShapeId))
                groupedByConnectShape.set(connectionShapeId, {
                    source: null,
                    target: null
                });

            const group = groupedByConnectShape.get(connectionShapeId);

            if (isSource(parsedConnection)) {
                if (group.source) {
                    debug.log('source already set');
                }
                group.source = {
                    shapeId: parsedConnection.toSheet,
                    cell: parsedConnection.toCell,
                    part: parsedConnection.toPart,
                }
            } else {
                if (group.target) {
                    debug.log('target already set');
                }
                group.target = {
                    shapeId: parsedConnection.toSheet,
                    cell: parsedConnection.toCell,
                    part: parsedConnection.toPart,
                }
            }
        }
    );

    return groupedByConnectShape;
}

/**
 * @param parsedConnection
 * @returns {boolean}
 */
function isSource(parsedConnection) {
    //TODO miky may be not complete
    /*
    source:
        <Connect FromSheet='379' FromCell='BeginX' FromPart='9' ToSheet='200'
                 ToCell='Connections.Bottom.X' ToPart='103'/>
     target:
        <Connect FromSheet='379' FromCell='EndX' FromPart='12' ToSheet='347'
             ToCell='Connections.Float.X' ToPart='104'/>
     */

    // TODO: this doesn't seem to be right, investigate
    return parsedConnection.fromCell === 'BeginX';
}
