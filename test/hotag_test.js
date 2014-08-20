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

}(jQuery));
