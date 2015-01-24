module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/simple-js-views.min.js': ['src/simple-js-views.js']
        }
      }
    },

    clean: {
      dist: ['dist']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['clean:dist', 'uglify:dist']);

};
