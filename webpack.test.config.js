var config = require('./webpack.config'),
    path = require('path')

config.module.rules.push({
    test: /\.js$/,
    loader: 'istanbul-instrumenter-loader',
    exclude: /node_modules/
});
module.exports = Object.assign({}, config, {
    entry: {
        'movie-main': config.entry['movie-main']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js'
    }
})