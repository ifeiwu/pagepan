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

// 获取小飞云版本号
var yun_version = fs.readFileSync('D:/www/pagepanyun.com/src/version.php', 'utf8');
yun_version = yun_version.match(/\d+\.\d+/g);
// 获取组件库版本号
var uikit_version = fs.readFileSync('D:/www/uikit.pagepan.com/src/version.php', 'utf8');
uikit_version = uikit_version.match(/\d+\.\d+/g);

gulp.task('clean', function () {
	return del(['dist/**/*', 'package/**/*']);
});

gulp.task('copy', function () {
    return gulp.src([
		'src/**',
		'!src/composer.*',
		'!src/app/api/v1/routes.php',
		'!src/app/dev/**',
		'!src/config/db.php',
		'!src/config/*.dev.php',
		'!src/data/ip2region.xdb',
		'!src/data/backup/**/*',
		'!src/data/cache/**/*',
		'!src/data/logs/**/*',
		'!src/data/sqlite/**/*',
		'src/data/sqlite/pagepan.db',
		'src/data/sqlite/demo.db',
		'!src/public/*',
		'src/public/index.php',
		'src/public/robots.txt',
		'src/public/.htaccess',
		'!src/public/data/file/**/*',
		'!src/public/data/font/**/*',
		'!src/public/data/json/**/*',
		'!src/public/data/pack/**/*',
		'!src/public/assets/font/**/*',
		'!src/public/assets/i18n/**/*',
		'!src/public/assets/**/*.{css,js,html,md}',
    ], { base: 'src', dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
	return gulp.src(['src/public/assets/**/*.js'], { base: 'src' })
		.pipe(uglify({compress: true, mangle: {reserved: ['require', 'exports', 'module', '$']}}))
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
	return gulp.src(['src/public/assets/**/*.css', '!src/public/assets/fonts/**'], { base: 'src' })
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
	return gulp.src(['src/public/assets/**/*.html'], { base: 'src' })
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('config', function (done) {
	var base = fs.readFileSync('dist/base.php', 'utf8');
	base = base.replace("define('RUN_MODE', 'dev');", "define('RUN_MODE', 'prod');");
	base = base.replace("define('BUILD_TIME', '');", "define('BUILD_TIME', '" + (new Date().getTime()) + "');");
	fs.writeFile('dist/base.php', Buffer.from(base), { flag: 'w' }, function(error, data) {});

	var config_uikit = fs.readFileSync('dist/config/uikit.php', 'utf8');
	config_uikit = config_uikit.replaceAll("{{uikit_version}}", uikit_version);
	fs.writeFile('dist/config/uikit.php', Buffer.from(config_uikit), { flag: 'w' }, function(error, data) {});

	var config_admin = fs.readFileSync('dist/config/admin.php', 'utf8');
	config_admin = config_admin.replaceAll("{{yun_version}}", yun_version);
	fs.writeFile('dist/config/admin.php', Buffer.from(config_admin), { flag: 'w' }, function(error, data) {});

	done();
});

gulp.task('install.zip', function () {
    return gulp.src('dist/**', { dot: true })
		.pipe(zip('install.zip'))
		.pipe(gulp.dest('package'));
});

gulp.task('upgrade.zip', function () {
	return gulp.src([
		'dist/**',
		'!dist/data/css/**',
		'!dist/data/js/**',
		'!dist/data/php/**',
		'!dist/data/sqlite/pagepan.db',
		'!dist/config/cache.php',
		'!dist/config/session.php',
		'!dist/config/smtp.php',
		'!dist/public/data/**',
		'!dist/public/assets/css/pagepan.css',
		'!dist/public/assets/css/theme.css',
		'!dist/public/robots.txt'
	], { dot: true })
		.pipe(zip('upgrade.zip'))
		.pipe(gulp.dest('package'));
});


gulp.task('default', gulp.series('clean', 'copy', 'js', 'css', 'html', 'config'));
gulp.task('package', gulp.series('install.zip', 'upgrade.zip'));