//Перед использованием убедитеьсь, что все пути совпадают с вашими.
//Не забудьте создать папку app -> css, sass, js, index.html
//ЗАПУСК:
//npm install(подгрузка актуальных node_modules)
//gulp(Запуск SCSS и BrowserSync)
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync");

gulp.task("sass", function() {
  return gulp
    .src("app/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("scripts", function() {
  return gulp
    .src(["app/js/common.js", "app/libs/**/*.js"])
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("code", function() {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});
gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});
gulp.task("watch", function() {
  gulp.watch("app/sass/**/*.scss", gulp.parallel("sass")); /////////////////////////YOUR SCSS FILE HERE
  gulp.watch("app/*html", gulp.parallel("code")); //////////////////////////////////YOUR HTML FILE HERE
  gulp.watch(
    ["app/js/common.js", "app/libs/**/*.js"], //////////////////////////////////////YOUR JS FILE HERE
    gulp.parallel("scripts")
  );
});
gulp.task("default", gulp.parallel("sass", "browser-sync", "watch"));
