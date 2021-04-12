
//=============================================
//               DEPENDENCIES
//=============================================

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    del = require('del'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    karma = require('karma').server,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    ngdocs = require('gulp-ngdocs');

//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
    /**
     * The 'gulpfile' file is where our run tasks are hold.
     */
    gulpfile:   'gulpfile.js',
    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `public/`). These file paths are used in the configuration of
     * build tasks.
     *
     * - 'styles'       contains all project css styles
     * - 'images'       contains all project images
     * - 'fonts'        contains all project fonts
     * - 'scripts'      contains all project javascript except unit test files
     * - 'html'         contains main html files
     * - 'templates'    contains all project html templates
     */
    app: {
        basePath:       './',
        fonts:          ['jspm_packages/**/*.{eot,svg,ttf,woff}'],
        styles:         ['./stylesheets/**/*.scss'],
        images:         ['./services/**/*.{png,gif,jpg,jpeg}', './directives/**/*.{png,gif,jpg,jpeg}'],
        scripts:        ['./module.js', './services/**/*.js', './directives/**/*.js',
                         '!./services/**/*.spec.js', '!./directives/**/*.spec.js']
    },
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath:       '.tmp/',
        styles:         '.tmp/styles/',
        scripts:        '.tmp/scripts/'
    },
    /**
     * The 'dist' folder is where our app and its documentation
     * resides once they're completely built.
     *
     * - 'docs'         application documentation
     */
    build: {
        dist:           'dist/app/www',
        docs:           'dist/docs/'
    }
};



//=============================================
//             TASKS
//=============================================

gulp.task('connect:docs', function() {
    connect.server({
        port: 9001,
        root: paths.build.docs,
        livereload: false
    });
});

gulp.task('watch:scripts', function(){
    gulp.watch(paths.app.scripts, ['docs']);
});

gulp.task('watch:styles', function(){
    gulp.watch(paths.app.styles, ['sass']);
});

gulp.task('sass', function(cb){
    gulp.src(paths.app.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest(paths.app.basePath + 'stylesheets'));
    cb();
});

gulp.task('jshint', function(cb){
    gulp.src(paths.app.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))/*
        .pipe(jshint.reporter('fail'))*/;
    cb();
});

gulp.task('docs', function(cb){
    gulp.src(paths.app.scripts)
        .pipe(ngdocs.process({
            html5Mode: false,
            startPage: '/api',
            scripts: [
                'jspm_packages/github/angular/bower-angular@1.5.5/angular.min.js',
                'jspm_packages/github/angular/bower-angular-animate@1.5.5/angular-animate.min.js'
            ]
        }))
        .pipe(gulp.dest(paths.build.docs));
    cb();
});

// See https://github.com/karma-runner/gulp-karma
gulp.task('test', function (cb) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);
});

gulp.task('clean', function (cb) {
    del.sync(['./dist/app/www', './dist/docs', './dist/coverage']);
    cb();
});

// Dependency cache for SPDY
gulp.task('depcache', function(){
    return gulp.src(paths.app.basePath, {read:false})
        .pipe(shell([
            'jspm depcache module'
        ]));
});

// Create a minified bundle.js (and map) and inject it into config.js
// so System knows which modules should be loaded from it, and copy these
// files into dist/app.
// NOTE: ideally you'd operate directly on the files in dist/app *after* the
// 'files' task, but JSPM currently (6/2014) doesn't have a way to do this,
// hence the need to do all this in public/ and copy the result to dist/app
// and then unbundle the stuff in public/.
gulp.task('bundle', ['depcache'], function () {
    return gulp.src(paths.app.basePath)
        .pipe(shell([
            'jspm bundle module ' + paths.app.basePath + 'bundle.js --inject --minify' +
            '&& mv ' + paths.app.basePath + 'bundle* ' + paths.build.dist +
            '&& cp ' + paths.app.basePath + 'config.js ' + paths.build.dist +
            '&& jspm unbundle'
        ]));
});

// Copy production files from public/ to dist/app/
gulp.task('files', function () {
    return gulp.src([
        // copy everything
        '' + paths.app.basePath + 'services/**/*',
        // except tests and stylesheets from modules/
        '!' + paths.app.basePath + './**/test/',
        '!' + paths.app.basePath + './**/test/**',
        '!' + paths.app.basePath + './**/stylesheets/',
        '!' + paths.app.basePath + './**/stylesheets/**'
    ])
    .pipe(gulp.dest(paths.build.dist));
});

//=============================================
//             PUBLIC TASKS
//=============================================

// Create a distribution:
// 1) Run unit tests and create dist/coverage/
// 2) Compile any Sass to CSS (if it hasn't already been done)
// 3) Create a documentation website at /dist/docs/
// 4) Create a distribution version of the application
// 4) Add a bundled dependency file to the distribution version of the application
gulp.task('dist', function(){

  // TODO: check back to see if getting angular from npm is what's
  // causing the bundle to create an unusable file.

  runSequence('clean', /*'test',*/ 'sass', 'docs', 'files', 'bundle');
});


// Start a web server, load the app at public/, watch scripts and styles
// for updates. Use this to on the app itself.
gulp.task('default', ['test', 'docs']);
