// Karma configuration

//const source = 'src/**/*.js'
const webpackEnv = { test: true }
const path = require('path')
const webpackConfig = require('./webpack.config')(webpackEnv)
const specs = 'src/**/*.spec.js'
const source = 'src/**/!(*.spec|*.stub).js'


webpackConfig.module.rules.push({
  enforce: "pre",
  test: /\.js$/,
  loader: 'istanbul-instrumenter-loader',
  exclude: /node_modules/
});

module.exports = (config) => {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      specs, source
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [specs]: ['webpack'],
      [source]: ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: { noInfo: true },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'progress', 'coverage-istanbul'],


    // any of these options are valid: https://github.com/istanbuljs/istanbul-api/blob/47b7803fbf7ca2fb4e4a15f3813a8884891ba272/lib/config.js#L33-L38 
    coverageIstanbulReporter: {

      // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib 
      reports: ['html', 'lcovonly', 'text-summary'],
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name 
      dir: path.join(__dirname, 'coverage'),
      // if using webpack and pre-loaders, work around webpack breaking the source path 
      fixWebpackSourcePaths: true,
      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped` 
      skipFilesWithNoCoverage: false,
      // Most reporters accept additional config options. You can pass these through the `report-config` option 
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137 
        html: {
          // outputs the report in ./coverage/html 
          subdir: 'html'
        }
      }
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
