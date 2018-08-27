var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");


// main
gulp.task("default", function() {
    gulp.watch("./scss/**/*.scss", ["scss"]);
});

// sass
gulp.task("scss", function () {
    return gulp.src("./scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["> 5%"],
            cascade: false
        }))
        .pipe(gulp.dest("./css"));
});
