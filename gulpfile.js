const fs = require('fs')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const hash = require('gulp-hash')
const hashOptions = { template: '<%= name %>.<%= hash %><%= ext %>' }
const hashFilename = 'hash-manifest.json'
const argv = require('minimist')(process.argv.slice(2))
const env = argv.env ? argv.env : 'development'
const output = {
  development: './tmp/unixtime',
  production: './dist/unixtime',
}
const browserSync = require('browser-sync').create()

// CSS
gulp.task('css', function () {
  const postcss = require('gulp-postcss')
  const tailwindcss = require('tailwindcss')
  const purgecss = require('gulp-purgecss')
  const cleancss = require('gulp-clean-css')
  const rename = require('gulp-rename')

  if (!fs.existsSync(output[env])) {
    fs.mkdirSync(output[env], { recursive: true })
    console.log('Created output directory')
  }

  fs.writeFile(`${output[env]}/${hashFilename}`, '{}', { flag: 'wx' }, (e) => {
    if (e) {
      console.log(`${output[env]}/${hashFilename} exists`)
    } else {
      console.log(`Created empty hash file: ${output[env]}/${hashFilename}`)
    }
  })

  return gulp
    .src('./src/styles/index.css')
    .pipe(postcss([tailwindcss('tailwind.config.js'), require('autoprefixer')]))
    .pipe(
      gulpif(
        env === 'production',
        purgecss({
          content: ['**/*.html'],
          safelist: ['autocomplete-suggestions'],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        })
      )
    )
    .pipe(gulpif(env === 'production', cleancss()))
    .pipe(rename('./css/styles.css'))
    .pipe(hash(hashOptions))
    .pipe(gulp.dest(output[env]))
    .pipe(
      hash.manifest(hashFilename, {
        deleteOld: true,
        sourceDir: __dirname + output[env].substring(1),
      })
    )
    .pipe(gulp.dest(output[env]))
})

// JS
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

gulp.task('js', function () {
  const b = browserify({
    entries: 'src/scripts/index.js',
    debug: env === 'production',
  })

  return b
    .transform(
      babelify.configure({
        presets: ['@babel/preset-env'],
        sourceMaps: env === 'production',
      })
    )
    .bundle()
    .pipe(source('js/scripts.js'))
    .pipe(buffer())
    .pipe(gulpif(env === 'production', sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulpif(env === 'production', sourcemaps.write('./')))
    .pipe(hash(hashOptions))
    .pipe(gulp.dest(output[env]))
    .pipe(
      hash.manifest(hashFilename, {
        deleteOld: true,
        sourceDir: __dirname + output[env].substring(1),
        append: true,
      })
    )
    .pipe(gulp.dest(output[env]))
})

// HTML
gulp.task('html', function () {
  const { readFileSync } = require('fs')
  const rewrite = require('gulp-rev-rewrite')
  const manifest = readFileSync(`${output[env]}/${hashFilename}`)

  return gulp
    .src('./src/**/*.html')
    .pipe(rewrite({ manifest }))
    .pipe(gulp.dest(output[env]))
  done()
})

// Build
gulp.task('build', gulp.series('css', 'js', 'html'))

// Reload browser
gulp.task('reload', (done) => {
  browserSync.reload()
  done()
})

// Browser sync
gulp.task('browserSync', () => {
  browserSync.init({
    port: 3002,
    server: './tmp',
    startPath: '/unixtime/index.html',
    ui: false,
  })
  gulp.watch(
    ['src/styles/**/*.css', 'src/scripts/**/*.js', 'src/**/*.html'],
    gulp.series('build', 'reload')
  )
})

// Dev server
gulp.task('serve', gulp.series('build', 'browserSync'))
