const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Maybe webpack is not the right tool for this job :)
// But I need practice with webpack.

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/js/main.js'),
        styles: path.join(__dirname, 'src/scss/styles.scss'),
        inline: path.join(__dirname, 'src/scss/inline.scss'),
    },
    output: {
        path: path.join(__dirname),
        filename: 'site/static/js/[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?url=false&minimize=false&importLoaders=1!postcss!sass-loader'
                ),
            },
            {
                test: /\.(json)$/,
                loader: 'json-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                query: { limit: 10000 },
            }
        ],
    },
    devtool: 'source-map',
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                ],
            }),
        ];
    },
    plugins: getPlugins(),
};
function getPlugins() {
    return [
        new CopyWebpackPlugin([{ 
            from: 'site/static/css/inline.min.css', 
            to: 'site/layouts/partials/inline.css' 
        }]),
        new ExtractTextPlugin('site/static/css/[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ];
}
