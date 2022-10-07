const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

// function to compile sass into css using gulp-sass task runner that take sass package it usage under the hood
//  Step to compile sass into css
// 1. source sass file pass in src() then use pipe();
// 2. pass sass function which we have imported using gulp-sass(by passing sass package)
// 3. & then pipe with destination using dest(pass your dumping folder) i.e css it dump the compiled sass into css in the root

function buildStyle() {
  return src("sass/**/*.scss")
    .pipe(sass())
    .pipe(purgecss({ content: ["*.html"] })) //purgecss remove unused class in our html & make css filesize small
    .pipe(dest("css"));
}

// function to watch our changes in sass & automatic called buildStyle function to compile them
function watchFile() {
  // watch() take 2 argument 1. arrya of files to wathc 2. function be called when change detect in these files.
  watch(["sass/**/*.scss", "*.html"], buildStyle);
}

// export & run series() to first buildStyle & then watch changes

exports.default = series(buildStyle, watchFile);

// run gulp command in terminal before that npm install gulp-cli; it look into the gulpfile the exported function it run each of them in turn
