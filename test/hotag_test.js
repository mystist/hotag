(function($) {
  'use strict';
  
  module('jQuery.fn.hotag')
  
  test('should be defined on jquery object', function () {
    ok($(document.body).hotag, 'hotag method is defined')
  })
  
  module('hotag', {
    setup: function () {
      $.fn.mystistHotag = $.fn.hotag.noConflict()
      
      this.$element = $('#qunit-fixture')
    },
    teardown: function () {
      $.fn.hotag = $.fn.mystistHotag
      delete $.fn.mystistHotag
      
      var data = this.$element.data('mystist.hotag')
      if(data) {
        this.$element.removeData('mystist.hotag')
      }
    }
  })
  
  test('should provide no conflict', function () {
    strictEqual($.fn.hotag, undefined, 'hotag was set back to undefined (org value)')
  })
  
  test('should be chainable', function () {
    strictEqual(this.$element.mystistHotag(), this.$element, 'hotag is chainable.')
  })
  
  test('should create container', function () {
    this.$element.mystistHotag()
    ok(this.$element.children().length > 0, 'container has been created.')
  })
  
  test('should expose default settings', function () {
    ok($.fn.mystistHotag.Constructor.DEFAULTS, 'defaults is defined')
  })
  
  module('utils', {
    setup: function () {
      this.$element = $('#qunit-fixture')
      this.tags = [{"counts":12,"tag":"balabala"},{"counts":4,"tag":"liber"},{"counts":3,"tag":"ranking"},{"counts":11,"tag":"slash"},{"counts":8,"tag":"slide"},{"counts":5,"tag":"tag"}]
      this.$element.hotag({
        tags: this.tags
      })
      this.hotag =  this.$element.data('mystist.hotag')
      this.utils = $.fn.hotag.Constructor._private.utils
    },
    teardown: function () {
      var data = this.$element.data('mystist.hotag')
      if(data) {
        this.$element.removeData('mystist.hotag')
      }
    }
  })
  
  test('should get array from tags', function () {
    deepEqual(this.utils.getArr.call(this.hotag, this.tags), [12, 4, 3, 11, 8, 5])
  })
  
  test('shoud calcuate points', function () {
    var minFont = this.hotag.options.minFontByPercent
    var maxFont = this.hotag.options.maxFontByPercent
    strictEqual(this.utils.calPoints.call(this.hotag, 1, {max: 10, min: 1}), minFont)
    strictEqual(this.utils.calPoints.call(this.hotag, 10, {max: 10, min: 1}), maxFont)
  })
  
  module('helper', {
    setup: function () {
      this.helper = $.fn.hotag.Constructor._private.helper
    }
  })
  
  test('should get m object', function () {
    var arr = [2, 5, 2, 23, 2, 6, 0, 0, 8, 1, 1]
    deepEqual(this.helper.m(arr), {max: 23, min: 0})
  })
  
  test('(log n base) should calcuate correctly in Math', function () {
    strictEqual(this.helper.log(8, 2), 3)
    strictEqual(this.helper.log(1, 10), 0)
    strictEqual(this.helper.log(1, 2), 0)
    strictEqual(this.helper.log(28, 28), 1)
  })

}(jQuery));
