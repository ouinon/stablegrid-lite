module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    

    project_dirs: {
      // configurable paths
      app: 'app',
      dist: 'gh_pages'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp/{,*/}*',
            'logs/apache/{,*/}*',
            '<%= project_dirs.dist %>/{,*/}*',
            '!<%= project_dirs.dist %>/.git{,*/}*'
          ]
        }]
      },
      removetmp:{
        files: [{
          dot: true,
          src: [
            '.tmp',
          ]
        }]
      },
      server: '.tmp'
    },

    wiredep: {

      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          '<%= project_dirs.app %>/*.html'
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration

        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= project_dirs.app %>/styles',
        cssDir: '.tmp/styles',
        // generatedImagesDir: '.tmp/images/generated',
        // imagesDir: './images',
        // javascriptsDir: './scripts',
        // fontsDir: './styles/fonts',
        importPath: './bower_components',
        // httpImagesPath: '/images',
        // httpGeneratedImagesPath: '/images/generated',
        // httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {},
      // server: {
      //   options: {
      //     sourcemap: true
      //   }
      // }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project_dirs.app %>',
          dest: '<%= project_dirs.dist %>',
          src: [
            '*.{ico,png,txt}',
            //'.htaccess',
            '*.html',
            'views/{,*/}*.html',
            // 'templates/{,**/}*.*',
            // 'images/{,*/}*.{webp}',
            // 'fonts/{,*/}*.*',
            // 'node/{,**/}*.*',
            // 'styles/fonts/{,*/}*.*',
          ]
        }]
      }
    },
    cssmin: {
      options:{
        advanced:false,
        aggressiveMerging:false,
        restructuring:false,
        mediaMerging:false,
        shorthandCompacting:false,
        roundingPrecision:-1
      },
      dist: {
        files: {
          '<%= project_dirs.dist %>/styles/main.css': ['.tmp/styles/{,*/}*.css']
        }
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scripts',
          src: '{,**/}*.js',
          dest: '.tmp/scripts'
        }]
      }
    },
    uglify: {
      options: {
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
      }
    },
    atomizer: {
        // Example 1: Simple usage. Parse files and create CSS.
        // Ideally you'd also want to pass a namespace to deal with specificity.
      example1: {
          options: {
              // namespace: '#atomic',
              // bring a sample config file
              //config: 'sampleconf.js',
              rules: 'atomic-conf.js',
              // config will override any thing declared in configFile
          },
          files: [
              {
                  src: ['<%= project_dirs.app %>/index.html','<%= project_dirs.app %>/views/main.html'],
                  dest: '<%= project_dirs.app %>/styles/atomic-properties.scss'
              }
          ]
      }
    },
    useminPrepare: {
      html: '<%= project_dirs.app %>/index.html',
      options: {
        dest: '<%= project_dirs.dist %>',
        flow: {
          html: {
            steps: {
              js: ['uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= project_dirs.dist %>/{,*/}*.html'],
      css: ['<%= project_dirs.dist %>/styles/{,*/}*.css'],
      options: {
        // assetsDirs: ['<%= project_dirs.dist %>']
      }
    },

    watch: {
      scripts: {
        files: ['<%= project_dirs.app %>/**'],
        tasks: ['atomizer'],
        options: {
          spawn: false,
        },
      },
    },
  });
  
  // Source
  // https://github.com/stephenplusplus/grunt-wiredep
  grunt.registerTask('default',['wiredep']);

  grunt.registerTask('build', [
    'clean:dist',
    'compass',
    // //'wiredep',
    'useminPrepare',
    // 'concat',
    'uglify',
    'cssmin',
    'autoprefixer:dist',
    'copy:dist',
    'usemin',
    // // 'concurrent:dist',
    'ngAnnotate',
    // // 'cdnify',
    // 'processhtml',
    // 'clean:removetmp',
    // 'filerev',
    // 'htmlmin'
  ]);

};