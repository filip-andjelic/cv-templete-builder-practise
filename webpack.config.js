const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LOG_MODE = 0;

let configuration = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
        // SET THIS WHEN RUNNING DEVELOPMENT SERVER
        //publicPath: '/'
    },
    devServer: {
        open: true,
        stats: LOG_MODE > 2 ? 'verbose' : LOG_MODE > 1 ? 'normal' : LOG_MODE > 0 ? 'errors-warnings' : 'minimal',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

module.exports = configuration;
