var path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'bundle.js',
        publicPath: 'public/dist/'
    },
    mode: 'none',
    module: {
        rules: [{
            test: /\.(gif)$/,
            use: [
                'file-loader'
            ]
        }]
    },

};