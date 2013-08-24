'use strict';

module.exports = function(grunt) {

   var _ = require('underscore'),
       packageConfig = grunt.file.readJSON('package.json'),
       pluginConfig = grunt.file.readJSON('{%= name %}.jquery.json'),
       lumbarConfig = grunt.file.readJSON('lumbar.json');

   // Project configuration.
   var config = {
       meta: _.extend({}, packageConfig, pluginConfig),
       concat: {},
       uglify: {},
       copy: {},
       compress: {},
       clean: {}
   };

   config.clean.files = ['dist'];

   config.concat.options = {
      separator: ';;\n\n',
      stripBanners: true
   };

   config.concat.dist = {
      src: lumbarConfig.modules.{%= name %}.scripts,
      dest: 'dist/<%= meta.name %>.js'
   };

   // we replace variables in place
   config.concat.moduleVariables = {
      options: {
         process: true
      },
      expand: true,
      cwd: 'dist/',
      src: ['*.js', '*.css', 'jquery*' ],
      dest: 'dist'
   };

   config.uglify = {
      dist: {
         src: '<%= concat.dist.dest %>',
         dest: 'dist/<%= meta.name %>.min.js'
      }
   };

   config.qunit = {
      files: [ 'test/**/*.html' ]
   };

   grunt.initConfig(config);

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-qunit');

   // Default task.
   grunt.registerTask('default', [
      'qunit',
      'clean',
      'concat:dist',
      'concat:moduleVariables',
      'uglify'
   ]);

};
