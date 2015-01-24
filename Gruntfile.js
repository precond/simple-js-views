module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'src/', src: ['simple-js-views.js'], dest: 'dist/'}
        ]
      }
    },

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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'uglify:dist']);

};
