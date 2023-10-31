// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// karma.style.css includes styles that are essential for executing tests in suited application environment

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      { pattern: 'src/lib/assets/images/fd-logo.svg', watched: false, included: false, served: true, nocache: false },
      { pattern: 'src/lib/assets/icons/*.*', watched: false, included: false, served: true, nocache: false },
			'karma.style.css'
    ],
    proxies: {
      "/fd-logo.svg": "/base/src/lib/assets/images/fd-logo.svg",
      "/clock.svg": "/base/src/lib/assets/icons/clock.svg",
      "/info-circle.svg": "/base/src/lib/assets/icons/info-circle.svg",
      "/calendar.svg": "/base/src/lib/assets/icons/calendar.svg",
			"/alert.svg": "/base/src/lib/assets/icons/alert.svg",
			"/check-small.svg": "/base/src/lib/assets/icons/check-small.svg",
			"/alert-fill.svg": "/base/src/lib/assets/icons/alert-fill.svg",
			"/chevron.svg": "/base/src/lib/assets/icons/chevron.svg",
   },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/ngx-fudis'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
