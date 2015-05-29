/*
 * hotag
 *
 *
 * Copyright (c) 2014 - 2015
 * Licensed under the MIT license.
 */

+function ($) {
  'use strict';

  var Hotag = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, Hotag.DEFAULTS, options)

    this.initialize()
  }

  Hotag.VERSION = '0.0.8'

  Hotag.DEFAULTS = {
    tags: [],
    keyOfName: 'tag',
    keyOfCounts: 'counts',
    keyOfHref: 'href',
    containerClass: 'hotag-container',
    minFontByPercent: 100,
    maxFontByPercent: 230
  }

  Hotag.prototype.initialize = function () {
    this.initContainer()
      .render()
  }

  Hotag.prototype.initContainer = function () {
    var $container = $('<div />')
      .addClass(this.options.containerClass)
      .appendTo(this.$element)
    return this
  }

  Hotag.prototype.render = function () {
    var tags = this.options.tags
    var $target = this.$element.find('.' + this.options.containerClass)

    var m = helper.m(utils.getArr.call(this))

    for (var i = 0, l = tags.length; i < l; i++) {
      var tag = tags[i]
      var $tag = $('<a />')
        .text(tag[this.options.keyOfName])
        .attr({
          'href': tag[this.options.keyOfHref] || '#',
          'title': this.options.keyOfCounts + ': ' + tag[this.options.keyOfCounts]
        })
        .css('font-size', utils.calPoints.call(this, tag[this.options.keyOfCounts], m) + '%')
      $target.append(' ').append($tag)
    }
    return this
  }

  Hotag.prototype.destroy = function () {
    this.$element
      .empty()
      .removeData('mystist.hotag')

    return this
  }

  var utils = {
    getArr: function() {
      var arr = []
      var tags = this.options.tags
      for (var i = 0, l = tags.length; i < l; i++) {
        arr.push(tags[i][this.options.keyOfCounts])
      }
      return arr
    },
    calPoints: function (counts, m) {
      var minFont = this.options.minFontByPercent
      var maxFont = this.options.maxFontByPercent
      var coef = helper.log(counts / m.min, m.max / m.min) // Divide m.min to let the `counts` start from 1.
      return minFont + parseFloat(coef.toFixed(2), 10) * (maxFont - minFont)
    }
  }

  var helper = {
    m: function (arr) {
      var m = {
        max: Math.max.apply(null, arr),
        min: Math.min.apply(null, arr)
      }
      return m
    },
    log: function (n, base) {
      base = base || 10
      return Math.log(n) / Math.log(base)
    }
  }

  // For test suite purpose only.
  Hotag._private = {
    utils: utils,
    helper: helper
  }

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('mystist.hotag')
      var options = typeof option == 'object' && option

      if (data && typeof option != 'string') data.destroy() && (data = null)
      if (!data) $this.data('mystist.hotag', (data = new Hotag(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.hotag

  $.fn.hotag = Plugin
  $.fn.hotag.Constructor = Hotag

  $.fn.hotag.noConflict = function () {
    $.fn.hotag = old
    return this
  }

}(jQuery);