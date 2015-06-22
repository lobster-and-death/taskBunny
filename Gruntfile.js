module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['client/app/components/**/*.js', 'client/app/shared/**/*.js'],
        dest: 'client/dist/app.js',
      },
    },

    watch: {
      scripts: {
        files: ['client/app/components/**/*.js', 'client/app/shared/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  //gets run on server deployment
  grunt.registerTask('build', [
    'concat'
  ]);

  grunt.registerTask('default', ['build', 'concurrent:dev']);

};
