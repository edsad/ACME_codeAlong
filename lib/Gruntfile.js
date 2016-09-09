module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      files: ['scripts/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    watch: {
      javascripts: {
        files: ['scripts/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};
