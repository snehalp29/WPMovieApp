const glob = require('glob')
const { resolve } = require('path')

module.exports = (env) => {

    let config = {
        entry: {
            "movie-main": glob.sync('./src/scripts/**/*.js')
        },
        output: {
            path: resolve('dist'),
            filename: '[name].min.js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    options: {
                        failOnError: true,
                        failOnWarning: true
                    },
                    exclude: /node_modules/
                }, {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: 'babel-loader?presets[]=es2015',
                    exclude: /node_modules/
                }]
        },
        devtool: env.prod ? 'source-map' : 'eval'
    }

    return config;
}