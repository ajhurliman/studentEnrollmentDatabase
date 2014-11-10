module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    },

    simplemocha: {
      src: ['test/api/**/*.js']
    },

    jscs: {
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
}
