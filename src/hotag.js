/*
 * hotag
 * 
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

+function ($) {
  'use strict';
  
  var Hotag = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, Hotag.DEFAULTS, options)
    
    this.initContainer()
  }
  
  Hotag.VERSION = '0.0.1'
  
  Hotag.DEFAULTS = {
    containerCss: {
      'width': '100%',
      'height': '100%'
    }
  }
  
  Hotag.prototype.initContainer = function () {
    var $container = $('<div />')
        .css(this.options.containerCss)
        .appendTo(this.$element)
        
    // To be continue...
    
  }
  
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('mystist.hotag')
      var options = typeof option == 'object' && option
      
      if(!data) $this.data('mystist.hotag', (data = new Hotag(this, options)))
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