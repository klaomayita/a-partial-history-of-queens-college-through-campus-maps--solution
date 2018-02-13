/*jslint node: true, for, es6 */

'use strict';

let gulp = require(`gulp`),
    sass = require(`gulp-sass`),
    browserSpecificPrefixer = require(`gulp-autoprefixer`),
    browserSync = require(`browser-sync`),
    config = require(`./config.json`),
    colors = config.colors,
    reload = browserSync.reload,
    browserChoice = `default`;

/**
 * CHOOSE A BROWSER OTHER THAN THE DEFAULT
 */
gulp.task(`safari`, function () {
    browserChoice = `safari`;
});

gulp.task(`firefox`, function () {
    browserChoice = `firefox`;
});

gulp.task(`chrome`, function () {
    browserChoice = `google chrome`;
});

gulp.task(`opera`, function () {
    browserChoice = `opera`;
});

gulp.task(`edge`, function () {
    browserChoice = `microsoft-edge`;
});

gulp.task(`allBrowsers`, function () {
    browserChoice =
        [`safari`, `firefox`, `google chrome`, `opera`, `microsoft-edge`];
});

gulp.task(`compileCSS`, function () {
    return gulp.src(`sass/style.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: [`last 2 versions`]
        }))
        .pipe(gulp.dest(`css`));
});

gulp.task(`serve`, [`compileCSS`], function () {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: [
                `./`
            ]
        }
    });

    gulp.watch(`sass/*.scss`, [`compileCSS`])
        .on(`change`, reload);

    gulp.watch(`*.html`)
        .on(`change`, reload);

    gulp.watch(`img/**/*`)
        .on(`change`, reload);
});

/**
 * DEFAULT
 */
gulp.task(`default`, function () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                    `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                    `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ${colors.red}` +
                `nothing ${colors.default}but generate this message. The ` +
                `available tasks are:\n\n ${stdout}`);
    });
});
