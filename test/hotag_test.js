(function($) {
  'use strict';
  
  module('jQuery.fn.hotag', {
    setup: function () {
      this.$element = $('#qunit-fixture')
    }
  })
  
  test('is chainable', function () {
    strictEqual(this.$element.hotag(), this.$element, 'should be chainable')
  })

}(jQuery));
