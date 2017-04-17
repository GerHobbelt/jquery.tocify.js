module.exports = function(grunt) {

  var spdxLicenseList = require('spdx-license-list');
  var pkg = grunt.file.readJSON('package.json');
  var licenseDescription = spdxLicenseList[pkg.license].name;
  pkg.licenseDescription = licenseDescription;
 
  grunt.initConfig({
    pkg: pkg,
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          './src/javascripts/jquery.tocify.min.js': ['./src/javascripts/jquery.tocify.js']
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        ' * <%= pkg.homepage ? "* " + pkg.homepage : "" %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' <%= pkg.licenseDescription %> */\n'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['test', 'build']);

};