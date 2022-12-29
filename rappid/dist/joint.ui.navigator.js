/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, $, core_mjs) {
    'use strict';

    $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

    // Navigator
    var Navigator = core_mjs.mvc.View.extend({
      className: 'navigator',
      events: {
        'mousedown': 'startAction',
        'touchstart': 'startAction',
        'mousedown .joint-paper': 'scrollTo',
        'touchstart .joint-paper': 'scrollTo'
      },
      documentEvents: {
        'mousemove': 'doAction',
        'touchmove': 'doAction',
        'mouseup': 'stopAction',
        'touchend': 'stopAction'
      },
      options: {
        paperConstructor: core_mjs.dia.Paper,
        paperOptions: {},
        /**
         * @deprecated use zoom instead
         */
        zoomOptions: null,
        zoom: {
          min: 0.5,
          max: 2
        },
        width: 300,
        height: 200,
        padding: 10
      },
      init: function init() {
        if (this.options.zoomOptions) {
          // backward compatibility
          this.options.zoom = core_mjs.util.assign({}, this.options.zoom, this.options.zoomOptions);
        } else if (this.options.zoom) {
          this.options.zoom = core_mjs.util.defaults({}, this.options.zoom, this.constructor.prototype.options.zoom);
        }
        core_mjs.util.bindAll(this, 'updateCurrentView', 'doAction', 'stopAction', 'scrollTo');

        // The updateCurrentView is called everytime paperScroller's scrollbars change
        // or the paper is resized. Resize of the paper is normally also acompanied
        // by a scrollbar change (but doesn't have to be). An event is triggered for
        // the vertical and horizontal scrollbar change. That leads to the updateCurrentView
        // to be called upto 4 times per one paperScroller action. Debouncing the method solves
        // this issue but there is definitely room for improvement.
        // + it solves an issue with wrong target paper position while zooming out a paper with
        // negative x-origin
        this.updateCurrentView = core_mjs.util.debounce(this.updateCurrentView, 0);
        var paperScroller = this.options.paperScroller;
        paperScroller.$el.on("scroll".concat(this.getEventNamespace()), this.updateCurrentView);
        var sourcePaper = this.sourcePaper = paperScroller.options.paper;
        this.toggleUseContentBBox(this.options.useContentBBox);
        this.targetPaper = new this.options.paperConstructor(core_mjs.util.merge({
          model: sourcePaper.model,
          interactive: false,
          frozen: true
        }, this.options.paperOptions));
      },
      startListening: function startListening() {
        var _this = this;
        var options = this.options,
          sourcePaper = this.sourcePaper;
        if (options.useContentBBox) {
          this.listenTo(sourcePaper, 'render:done', function () {
            return _this.updatePaper();
          });
        } else {
          this.listenTo(sourcePaper, 'resize', function () {
            return _this.updatePaper();
          });
        }
      },
      render: function render() {
        this.targetPaper.$el.appendTo(this.el);
        this.targetPaper.unfreeze();
        this.$currentView = $('<div>').addClass('current-view');
        if (this.options.zoom) {
          var $currentViewControl = $('<div>').addClass('current-view-control');
          this.$currentView.append($currentViewControl);
        }
        this.$el.append(this.$currentView).css({
          width: this.options.width,
          height: this.options.height,
          padding: this.options.padding
        });

        // setting right target paper dimension for the first time.
        this.updatePaper();
        return this;
      },
      freeze: function freeze(opt) {
        this.targetPaper.freeze(opt);
      },
      unfreeze: function unfreeze(opt) {
        this.targetPaper.unfreeze(opt);
      },
      CONTENT_BBOX_CLASS_NAME: 'navigator-use-content-bbox',
      NO_CONTENT_CLASS_NAME: 'navigator-no-content',
      toggleUseContentBBox: function toggleUseContentBBox() {
        var useContentBBox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var CONTENT_BBOX_CLASS_NAME = this.CONTENT_BBOX_CLASS_NAME,
          $el = this.$el,
          targetPaper = this.targetPaper;
        this.options.useContentBBox = useContentBBox;
        this.stopListening();
        this.startListening();
        $el.toggleClass(CONTENT_BBOX_CLASS_NAME, Boolean(useContentBBox));
        if (targetPaper) this.updatePaper();
      },
      // Updates the navigator's paper size and transformations
      updatePaper: function updatePaper() {
        var sourcePaper = this.sourcePaper,
          targetPaper = this.targetPaper,
          options = this.options,
          $el = this.$el,
          NO_CONTENT_CLASS_NAME = this.NO_CONTENT_CLASS_NAME;
        var useContentBBox = options.useContentBBox;
        var bbox = useContentBBox ? sourcePaper.getContentBBox(useContentBBox) : sourcePaper.getComputedSize();
        var hadNoContent = $el.hasClass(NO_CONTENT_CLASS_NAME);
        if (bbox.width > 0 && bbox.height > 0) {
          if (hadNoContent) {
            $el.removeClass(NO_CONTENT_CLASS_NAME);
            targetPaper.unfreeze({
              key: 'navigator'
            });
          }
          this.updatePaperWithBBox(bbox);
          this.updateCurrentView();
        } else {
          if (hadNoContent) return;
          $el.addClass(NO_CONTENT_CLASS_NAME);
          targetPaper.freeze({
            key: 'navigator'
          });
        }
      },
      updatePaperWithBBox: function updatePaperWithBBox(bbox) {
        var width = bbox.width,
          height = bbox.height,
          _bbox$x = bbox.x,
          x = _bbox$x === void 0 ? 0 : _bbox$x,
          _bbox$y = bbox.y,
          y = _bbox$y === void 0 ? 0 : _bbox$y;
        if (!width || !height) return;
        var sourcePaper = this.sourcePaper,
          targetPaper = this.targetPaper,
          options = this.options;
        var _sourcePaper$matrix = sourcePaper.matrix(),
          sx = _sourcePaper$matrix.a,
          sy = _sourcePaper$matrix.d,
          tx = _sourcePaper$matrix.e,
          ty = _sourcePaper$matrix.f;
        var padding = options.padding;
        var navigatorWidth = options.width - 2 * padding;
        var navigatorHeight = options.height - 2 * padding;
        width /= sx;
        height /= sy;
        var ratio = this.ratio = Math.min(navigatorWidth / width, navigatorHeight / height);
        width *= ratio;
        height *= ratio;
        var ox = (tx - x) * ratio / sx;
        var oy = (ty - y) * ratio / sy;
        targetPaper.setDimensions(width, height);
        targetPaper.setOrigin(ox, oy);
        targetPaper.scale(ratio, ratio);
      },
      // Updates the position and size of the navigator's current view rectangle.
      updateCurrentView: function updateCurrentView() {
        var ratio = this.ratio;
        var sourceScale = this.sourcePaper.scale();
        var paperScroller = this.options.paperScroller;
        var topLeftCoordinates = paperScroller.clientToLocalPoint(0, 0);
        var paperPosition = this.targetPaper.$el.position();
        var paperOrigin = this.targetPaper.translate();

        // IE returns translate.ty = NaN when ty = 0. It sets transform attribute to 'translate(tx)'.
        // TODO: handle this in the vectorizer
        paperOrigin.ty = paperOrigin.ty || 0;
        this.currentViewGeometry = {
          top: paperPosition.top + topLeftCoordinates.y * ratio + paperOrigin.ty,
          left: paperPosition.left + topLeftCoordinates.x * ratio + paperOrigin.tx,
          width: paperScroller.$el.innerWidth() * ratio / sourceScale.sx,
          height: paperScroller.$el.innerHeight() * ratio / sourceScale.sy
        };
        this.$currentView.css(this.currentViewGeometry);
      },
      startAction: function startAction(evt) {
        evt = core_mjs.util.normalizeEvent(evt);
        var _evt = evt,
          clientX = _evt.clientX,
          clientY = _evt.clientY;

        // click on current-view control starts zooming
        // otherwise paper panning is initiated.
        var action = $(evt.target).hasClass('current-view-control') ? 'zooming' : 'panning';
        var options = this.options,
          currentViewGeometry = this.currentViewGeometry,
          sourcePaper = this.sourcePaper;
        var paperScroller = options.paperScroller;
        this.delegateDocumentEvents(null, {
          action: action,
          startClientX: clientX,
          startClientY: clientY,
          startScrollLeft: paperScroller.el.scrollLeft,
          startScrollTop: paperScroller.el.scrollTop,
          startZoom: paperScroller.zoom(),
          startGeometry: currentViewGeometry,
          startScale: sourcePaper.scale()
        });
        switch (action) {
          case 'panning':
            {
              this.trigger('pan:start', evt);
              break;
            }
          case 'zooming':
            {
              this.trigger('zoom:start', evt);
              break;
            }
        }
      },
      doAction: function doAction(evt) {
        evt = core_mjs.util.normalizeEvent(evt);
        var _evt2 = evt,
          clientX = _evt2.clientX,
          clientY = _evt2.clientY,
          data = _evt2.data;
        var sourcePaper = this.sourcePaper,
          options = this.options,
          ratio = this.ratio;
        var action = data.action,
          startClientX = data.startClientX,
          startClientY = data.startClientY,
          startScrollLeft = data.startScrollLeft,
          startScrollTop = data.startScrollTop,
          startZoom = data.startZoom,
          startGeometry = data.startGeometry,
          startScale = data.startScale,
          frameId = data.frameId;
        var paperScroller = options.paperScroller,
          zoom = options.zoom;
        switch (action) {
          case 'panning':
            {
              var _sourcePaper$scale = sourcePaper.scale(),
                sx = _sourcePaper$scale.sx,
                sy = _sourcePaper$scale.sy;
              var x = (clientX - startClientX) * sx;
              var y = (clientY - startClientY) * sy;
              paperScroller.el.scrollLeft = startScrollLeft + x / ratio;
              paperScroller.el.scrollTop = startScrollTop + y / ratio;
              break;
            }
          case 'zooming':
            {
              // x / width is the ratio of the original width and the requested width
              var width = startGeometry.width;
              var zoomRatio = 1 + (startClientX - clientX) / width / startScale.sx;
              core_mjs.util.cancelFrame(frameId);
              data.frameId = core_mjs.util.nextFrame(function () {
                paperScroller.zoom(zoomRatio * startZoom, core_mjs.util.defaults({
                  absolute: true
                }, zoom));
              });
              break;
            }
        }
      },
      stopAction: function stopAction(evt) {
        this.undelegateDocumentEvents();
        switch (evt.data.action) {
          case 'panning':
            {
              this.trigger('pan:stop', evt);
              break;
            }
          case 'zooming':
            {
              this.trigger('zoom:stop', evt);
              break;
            }
        }
      },
      // Scrolls the view to the position determined by the event.
      scrollTo: function scrollTo(evt) {
        evt = core_mjs.util.normalizeEvent(evt);
        var paperOrigin = this.targetPaper.translate();
        // TODO: see updateCurrentView method
        paperOrigin.ty = paperOrigin.ty || 0;
        var offsetX, offsetY;
        // There is no offsetX/offsetY property in the Firefox event
        if (evt.offsetX === undefined) {
          var targetPaperOffset = this.targetPaper.$el.offset();
          offsetX = evt.pageX - targetPaperOffset.left;
          offsetY = evt.pageY - targetPaperOffset.top;
        } else {
          offsetX = evt.offsetX;
          offsetY = evt.offsetY;
        }
        var cx = (offsetX - paperOrigin.tx) / this.ratio;
        var cy = (offsetY - paperOrigin.ty) / this.ratio;
        this.options.paperScroller.center(cx, cy);
      },
      onRemove: function onRemove() {
        this.targetPaper.remove();
        this.options.paperScroller.$el.off(this.getEventNamespace());
      }
    });

    exports.Navigator = Navigator;

}(this.joint.ui = this.joint.ui || {}, $, joint));
