// (一) 第一个任务：将scss转成css
// 1.引入包
// (1)引入gulp包，返回值为对象
var gulp = require("gulp");
// (2) 引入gulp-sass,返回值为方法
var sass = require("gulp-sass");
// 2.书写gulp任务 task(任务名,函数)
gulp.task("compileSass",function(){
    //(1) 通过路径，拿到文件流 src(路径)
    gulp.src(["./src/sass/**/*.scss"])
    //（2）运输文件流 pipe()
    // (3) 运输过程中，对scss文件编译成css文件 sass()
    //      * 报错不断开 on('error', sass.logError)
    // (4) 将css文件运输出去  dest(文件夹路径)
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

    .pipe(gulp.dest("./src/css"));
})

// (二)第二个任务
// 监听方法 watch("路径",[任务名])

gulp.task("jt",function(){
    gulp.watch("./src/sass/**/*.scss",["compileSass"]);
})

// (三)将bootstrap.scss编译到css文件夹里面
gulp.task("bootstrap",function(){
    //(1) 通过路径，拿到文件流 src(路径)
    gulp.src(["./src/lib/bootstrap-sass-3.3.7/assets/stylesheets/bootstrap.scss"])
    //（2）运输文件流 pipe()
    // (3) 运输过程中，对scss文件编译成css文件 sass()
    //      * 报错不断开 on('error', sass.logError)
    // (4) 将css文件运输出去  dest(文件夹路径)
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

    .pipe(gulp.dest("./src/css"));
})

// (四)压缩html
const htmlmin = require('gulp-htmlmin');
gulp.task('minify', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

//(五)合并js、压缩、重命名
var concat = require('gulp-concat');
// gulp.task('concatJs', function() {
//     gulp.src('./src/js/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./dist/js/'));
// });


// 合并js，压缩，同时重命名
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
gulp.task('js', function(){
    pump([
        gulp.src('./src/js/*.js'),
        concat('all.js'),
        gulp.dest('./dist/js'),
        uglify(),
        rename({
            suffix: ".min"
        }),
        gulp.dest('./dist/js')
    ]);
});




// 静态服务器:
var browserSync = require("browser-sync");
gulp.task('server',()=>{
    browserSync({
        // 服务器路径
        server:'./src/',
        // 端口
        port:666,
        // 监听文件修改，自动刷新页面
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });
    gulp.watch("./src/sass/**/*.scss",["compileSass"]);

})