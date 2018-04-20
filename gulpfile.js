const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('clean', function () {
    return del('./build/**/*');
});

/* Compile SCSS to CSS */
gulp.task('scss', function () {
    return gulp.src('./src/styles/main.scss')
        /* Функція sass() компілює SCSS в CSS */
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./build/js'));
});

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('pages', function () {
    return gulp.src('./src/pages/**/*')
        .pipe(gulp.dest('./build'));
});

/* Build the project */
gulp.task('build', ['clean'], function () {
    return runSequence(['js', 'scss', 'pages', 'assets']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['./', './build']
        },
        open: true
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    return done();
});

/* Default task */
gulp.task('default', ['build', 'serve'], function () {
    gulp.watch('./src/styles/**/*.scss', ['scss']);
    gulp.watch('./src/js/**/*.js', ['js', 'reload']);
    gulp.watch('./src/assets/**/*', ['assets', 'reload']);
    gulp.watch('./src/pages/**/*', ['pages', 'reload']);
});
