import { dia } from 'jointjs/src/core.mjs';
import constructTree from './constructTree.mjs';
import shortestPath from './shortestPath.mjs';

export { constructTree, shortestPath };

/* Side effects */

dia.Graph.prototype.shortestPath = function(source, target, opt) {
    return shortestPath(this, source, target, opt);
};

dia.Graph.prototype.constructTree = function(parent, opt) {
    return constructTree(parent, opt, null, []);
};

