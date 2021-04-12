module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['phantomjs-shim', 'jspm', 'jasmine'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'verbose', 'junit', 'coverage'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // This list should be empty. karma-jspm figures out what to load
    // by looking at jspm.loadFiles and jspm.serveFiles.
    // See https://github.com/Workiva/karma-jspm
    //
    files: [],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      './services/**/*.js': ['babel', 'coverage'],
      './directives/**/*.html': ['ng-html2js']
    },

    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
        modules: 'system'
      }
    },

    jspm: {
      config: './config.js',
      loadFiles: ['./module.js', './services/**/*.spec.js'],
      serveFiles: ['./services/**/*.js']
    },

    // list of files to exclude
    exclude: ['jspm_packages', 'node_modules'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    /**
     * ng-html2js options
     */
    ngHtml2JsPreprocessor: {

        // strip this from the file path
        stripPrefix: '',

        // prepend this to the
        prependPrefix: '',

        // see https://github.com/karma-runner/karma-ng-html2js-preprocessor/pull/74/files
        // we've implemented this locally until the pull request is merged.
        // when that happens, add the import back into package.json/devDependencies, with the updated version of course
        //     "karma-ng-html2js-preprocessor": "^0.1.2",
        systemJS: true,

        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        moduleName: 'app.templates'
    },


    // Configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'dist/coverage/'
    },

    /**
     * JUnit Reporter options
     */
    junitReporter: {
        outputDir: 'dist/junit/',
        outputFile: '../junit.xml',
        suite: 'unit'
    }

  });
};
