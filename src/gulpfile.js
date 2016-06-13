var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var autoprefixer = require("gulp-autoprefixer");


// main
gulp.task("default", function() {
    gulp.watch("./public/scss/**/*.scss", ["scss"]);
});

// sass
gulp.task("scss", function () {
    return gulp.src("./public/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["> 5%"],
            cascade: false
        }))
        .pipe(gulp.dest("./public/css"));
});
