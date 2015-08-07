module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    

    project_dirs: {
      // configurable paths
      app: 'app',
      dist: 'dist'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp/{,*/}*',
            'logs/apache/{,*/}*',
            'dist/{,*/}*',
            '!dist/.git{,*/}*'
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
        cssDir: '<%= project_dirs.app %>/styles',
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
          cwd: '',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'node/{,**/}*.*',
            'templates/{,**/}*.*',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'fonts/{,*/}*.*',
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
          'dist/styles/main.css': ['.tmp/styles/{,*/}*.css']
        }
      }
    },
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      dist: {
        files: {
          'dist/index.html': ['index.html']
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
                  src: ['index.html','templates/home.html'],
                  dest: 'styles/_properties.scss'
              }
          ]
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist',
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
        files: ['index.html','templates/home.html'],
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
    'usemin',
    // // 'concurrent:dist',
    'autoprefixer:dist',
    'ngAnnotate',
    // 'copy:dist',
    // // 'cdnify',
    // 'processhtml',
    // 'clean:removetmp',
    // 'filerev',
    // 'htmlmin'
  ]);

};