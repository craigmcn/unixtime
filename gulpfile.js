const gulp = require('gulp')
const argv = require('minimist')(process.argv.slice(2))
const env = argv.env ? argv.env : 'development'
const output = {
    development: './tmp',
    production: './dist',
}
const browserSync = require('browser-sync').create()

// CSS
// const sass = require('gulp-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     rename = require('gulp-rename')

// const inputScss = './src/**/*.scss'

// const sassOptions = {
//     default: {
//         errLogToConsole: true,
//         outputStyle: 'expanded',
//     },
//     minified: {
//         outputStyle: 'compressed',
//     },
// }

// gulp.task('sass', done => {
//     gulp.src(inputScss)
//         .pipe(sass(sassOptions.default).on('error', sass.logError))
//         .pipe(autoprefixer())
//         .pipe(gulp.dest(output[env]))
//     done()
// })

// gulp.task('sass-min', done => {
//     gulp.src(inputScss)
//         .pipe(sass(sassOptions.minified))
//         .pipe(autoprefixer())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest(output[env]))
//     done()
// })

// https://lancecore.com/building-our-sites/

const rename = require('gulp-rename')

gulp.task('css', function () {
    var postcss = require('gulp-postcss')
    var tailwindcss = require('tailwindcss')

    return (
        gulp
            .src('./src/styles/index.css')
            .pipe(
                postcss([
                    tailwindcss('tailwind.config.js'),
                    require('autoprefixer'),
                ])
            )
            // .pipe(gulp.dest(`${output[env]}/css/styles.css`))
            //   .pipe(csso())
            .pipe(rename('./css/styles.css'))
            .pipe(gulp.dest(output[env]))
            .pipe(
                browserSync.reload({
                    stream: true,
                })
            )
    )
})

// JS
const browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify')

const inputJs = 'src/scripts/index.js'

gulp.task('js', done => {
    const b = browserify({
        entries: inputJs,
        debug: false,
    })

    b.transform(
        babelify.configure({
            presets: ['@babel/preset-env'],
            sourceMaps: false,
        })
    )
        .bundle()
        .pipe(source('js/scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest(output[env]))
    done()
})

gulp.task('js-min', done => {
    const b = browserify({
        entries: inputJs,
        debug: true,
    })

    b.transform(
        babelify.configure({
            presets: ['@babel/preset-env'],
        })
    )
        .bundle()
        .pipe(source('js/scripts.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(output[env]))
    done()
})

// HTML
gulp.task('html', done => {
    gulp.src('./src/**/*.html').pipe(gulp.dest(output[env]))
    done()
})

// Build
// production
// gulp.task(
//     'build',
//     gulp.parallel(
//         gulp.series('sass', 'sass-min'),
//         gulp.series('js', 'js-min'),
//         'html'
//     )
// )

// development
// gulp.task('develop', gulp.parallel('sass', 'js', 'html'))
gulp.task('develop', gulp.parallel('css', 'js', 'html'))

// Reload browser
gulp.task('reload', done => {
    browserSync.reload()
    done()
})

// Browser sync
gulp.task('browserSync', () => {
    browserSync.init({
        port: 3002,
        server: output[env],
        ui: false,
    })
    // gulp.watch(
    //     ['src/styles/**/*.scss', 'src/scripts/**/*.js', 'src/**/*.html'],
    //     gulp.series('develop', 'reload')
    // )
    gulp.watch(
        ['src/scripts/**/*.js', 'src/**/*.html'],
        gulp.series('develop', 'reload')
    )
})

// Dev server
gulp.task('serve', gulp.series('develop', 'browserSync'))
