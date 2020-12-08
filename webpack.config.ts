import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const Dotenv = require('dotenv-webpack');
const isDevelopmentMode = process.env.NODE_ENV === "development";
const config = {
    mode: 'production',
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.[chunkhash].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: path.resolve(__dirname, "./src/server")
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            description: 'Home page with welcome note',
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new HtmlWebpackPlugin({
            title: 'Login page',
            description: 'Login page form',
            template: "./src/index.html",
            filename: "./login.html"
        }),
        new HtmlWebpackPlugin({
            title: 'Servers page',
            description: 'There you can find servers list by distance and name',
            template: "./src/index.html",
            filename: "./servers.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: isDevelopmentMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: isDevelopmentMode ? '[id].css' : '[id].[hash].css'
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            controllers: path.resolve(__dirname, 'src/controllers/'),
            routes: path.resolve(__dirname, 'src/routes/')
        }
    },
    stats: { colors: true },
    devServer: {
        historyApiFallback: true,
        open: true
    }
};

export default config;