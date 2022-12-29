/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports) {
    'use strict';

    // PriorityQueue - using binary heap.
    // ==================================

    // Time complexity
    // ---------------

    // create: O(n)
    // insert: O(log n)
    // peek: O(1)
    // peekPriority: O(1)
    // remove: O(log n)
    // isEmpty: O(1)

    // Public interface.
    // -----------------

    var PriorityQueue = function PriorityQueue(opt) {
      opt = opt || {};
      this.comparator = opt.comparator || function (a, b) {
        return a - b;
      };

      // `index` is a map of node ID's (if provided in insert op) to their indexes in the `data` array.
      // This is necessary in order to implement `updatePriority` operation
      // (better known as "decreaseKey"). The map is here so that we
      // can find the index of the node object. We assume this lookup has
      // O(log n) time complexity.
      this.index = {};
      this.data = opt.data || [];
      this.heapify();
    };
    PriorityQueue.prototype.isEmpty = function () {
      return this.data.length === 0;
    };
    PriorityQueue.prototype.insert = function (priority, value, id) {
      var node = {
        priority: priority,
        value: value
      };
      this.data.push(node);
      var index = this.data.length - 1;
      if (id) {
        node.id = id;
        this.index[id] = index;
      }
      this.bubbleUp(index);
    };
    PriorityQueue.prototype.peek = function () {
      return this.data[0] && this.data[0].value;
    };
    PriorityQueue.prototype.peekPriority = function () {
      return this.data[0] && this.data[0].priority;
    };
    PriorityQueue.prototype.updatePriority = function (id, priority) {
      var index = this.index[id];
      if (index === null || typeof index === 'undefined') {
        throw new Error('Node with id ' + id + ' was not found in the heap.');
      }
      var data = this.data;
      var oldPriority = data[index].priority;
      var comp = this.comparator(priority, oldPriority);
      if (comp < 0) {
        data[index].priority = priority;
        this.bubbleUp(index);
      } else if (comp > 0) {
        data[index].priority = priority;
        this.bubbleDown(index);
      }
    };
    PriorityQueue.prototype.remove = function () {
      var data = this.data;
      var peek = data[0];
      var last = data.pop();
      this.index[data.length] = null;
      if (data.length > 0) {
        data[0] = last;
        if (last.id) {
          this.index[last.id] = 0;
        }
        this.bubbleDown(0);
      }
      return peek && peek.value;
    };

    // Private.
    // --------

    PriorityQueue.prototype.heapify = function () {
      for (var i = 0; i < this.data.length; i++) {
        this.bubbleUp(i);
      }
    };
    PriorityQueue.prototype.bubbleUp = function (pos) {
      var parent;
      var aux;
      var data = this.data;
      while (pos > 0) {
        parent = pos - 1 >>> 1;
        if (this.comparator(data[pos].priority, data[parent].priority) < 0) {
          aux = data[parent];
          data[parent] = data[pos];
          if (data[pos].id) {
            this.index[data[pos].id] = parent;
          }
          data[pos] = aux;
          if (data[pos].id) {
            this.index[data[pos].id] = pos;
          }
          pos = parent;
        } else {
          break;
        }
      }
    };
    PriorityQueue.prototype.bubbleDown = function (pos) {
      var data = this.data;
      var last = data.length - 1;
      while (true) {
        var left = (pos << 1) + 1;
        var right = left + 1;
        var minIndex = pos;
        if (left <= last && this.comparator(data[left].priority, data[minIndex].priority) < 0) {
          minIndex = left;
        }
        if (right <= last && this.comparator(data[right].priority, data[minIndex].priority) < 0) {
          minIndex = right;
        }
        if (minIndex !== pos) {
          var aux = data[minIndex];
          data[minIndex] = data[pos];
          if (data[pos].id) {
            this.index[data[pos].id] = minIndex;
          }
          data[pos] = aux;
          if (data[pos].id) {
            this.index[data[pos].id] = pos;
          }
          pos = minIndex;
        } else {
          break;
        }
      }
    };

    exports.PriorityQueue = PriorityQueue;

}(this.joint.alg = this.joint.alg || {}));
