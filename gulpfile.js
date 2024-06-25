const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // css前缀
const cssnano = require('cssnano'); // css压缩
const htmlmin = require('gulp-htmlmin'); // html压缩
const uglify = require('gulp-uglify-es').default; // js压缩
const gulpIf = require('gulp-if'); // 条件处理
const exec = require('gulp-exec'); // 命令行
const del = require('del'); // 删除文件
const zip = require('gulp-zip');
const fs = require('fs'); // 文件操作

gulp.task('clean', function () {
	return del(['dist/**/*', 'pack/**/*']);
});

gulp.task('copy', function () {
    return gulp.src([
		'src/**',
		'!src/composer.*',
		'!src/config/apikey.php',
		'!src/app/api/v1/routes.php',
		'!src/app/dev/**',
		'!src/config/db.php',
		'!src/config/*.dev.php',
		'!src/data/cache/**/*',
		'!src/data/logs/**/*',
		'!src/data/sqlite/pagepan-dev.db',
		'!src/data/sqlite/pagepan-test.db',
		'!src/public/*',
		'src/public/index.php',
		'src/public/.htaccess',
		'src/public/robots.txt',
		'!src/public/data/**/*',
		'!src/public/assets/fonts/**/*',
		'!src/public/assets/i18n/**/*',
		'!src/public/assets/**/*.{css,js,html,md}',
    ], {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
	return gulp.src(['src/public/assets/**/*.js'], {base: 'src'})
		.pipe(uglify({compress: true, mangle: {reserved: ['require', 'exports', 'module', '$']}}))
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
	return gulp.src(['src/public/assets/**/*.css', '!src/public/assets/fonts/**'], {base: 'src'})
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
	return gulp.src(['src/public/assets/**/*.html'], {base: 'src'})
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('config', function (done) {
	var base = fs.readFileSync('dist/base.php', 'utf8');
	base = base.replace("'RUN_MODE', gethostname()", "'RUN_MODE', 'prod'");
	fs.writeFile('dist/base.php', Buffer.from(base), {flag: 'w'}, function(error, data) {});

	done();
});

gulp.task('install.zip', function () {
    return gulp.src('dist/**')
		.pipe(zip('install.zip'))
		.pipe(gulp.dest('pack'));
});

gulp.task('upgrade.zip', function () {
	return gulp.src([
		'dist/**',
		'!dist/data/**/*',
		'!dist/config/cache.php',
		'!dist/config/session.php',
		'!dist/config/smtp.php',
		'!dist/public/assets/css/pagepan.css',
		'!dist/public/assets/css/theme.css',
		'!dist/robots.txt'
	])
		.pipe(zip('upgrade.zip'))
		.pipe(gulp.dest('pack'));
});


gulp.task('default', gulp.series('clean', 'copy', 'js', 'css', 'html', 'config'));
gulp.task('pack', gulp.series('install.zip', 'upgrade.zip'));