// this is where your code that is directly related to extending
// jQuery goes. All other code should be abstracted to classes
// outside of this file. This file should not become very large
// because it should basically just instantiate an instance of
// your plugin component, add it to the given element(s) and then
// make sure the component runs on those elements.
$.fn.{%= name %} = function(options) {

   // true for deep copy
   // {} so our defaults are not overridden
   var settings = $.extend(true, {}, $.fn.{%= name %}.defaults, options);
   settings = validateSettings(settings);

   this.each(function() {
      var $this = $(this);
      debug('{%= name %} on: ' + $this.prop('tagName'));

      var component = new {%= primary_class_name %}($this, settings);
      $this.data('{%= name %}', component);
      component.onAfterAdd();
   });

   return this;

};

