const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 * Custom webpack config
 */
module.exports = (_env, argv) => {
    const isProduction = argv.mode === 'production'
    const isDevelopment = !isProduction
    const cssLoaders = ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]

    return {
        entry: ['./src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/js/[name].[contenthash:8].js',
            publicPath: '/',
        },
        // Dev server with hot reload & source map
        devServer: {
            compress: true, // Asset compression to make reload faster
            historyApiFallback: true, // Fallback to index.html
            open: true, // Opens browser after launch
            overlay: true, // Display webpack errors in the browser window
            hot: true, // Hot reload
            port: 3000,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
        target: 'web', // Browser's refresh
        devtool: isDevelopment && 'cheap-module-source-map', // Source maps
        module: {
            rules: [
                // * JS & JSX files
                // Polyfills management
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? 'production' : 'development',
                        },
                    },
                },
                // * Stylesheets
                {
                    test: /\.css$/,
                    use: cssLoaders,
                },
                { test: /\.scss?$/, use: [...cssLoaders, 'sass-loader'] },
                // * Files
                // Images
                // Embed the file in the URL as base64
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                },
                // SVG
                // Transforms imported files into React components
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                // Others (fonts)
                // Same as url-loader but no optimization
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ],
        },
        // Extensions to support
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            isProduction &&
                // Extract css in separate files
                // Use browser caching
                new MiniCssExtractPlugin({
                    filename: 'assets/css/[name].[contenthash:8].css',
                    chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
                }),
            // Create index.html file, that will load the bundle
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                favicon: path.resolve(__dirname, 'public/favicon.ico'),
                inject: true,
            }),
            isProduction &&
                new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')],
                    verbose: true,
                    dry: false,
                }),
            // Inject environment to env variable
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            }),
        ].filter(Boolean),
        optimization: {
            // * Minification
            minimize: isProduction,
            minimizer: [
                // JS
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            comments: false,
                            ascii_only: true,
                        },
                        warnings: false,
                    },
                }),
                // CSS
                new OptimizeCssAssetsPlugin(),
            ],
            // * Code splitting
            splitChunks: {
                // 10 files maximum loaded in parallel
                // Dynamic imports will be automatically splitted
                chunks: 'all',
                minSize: 0,
                maxInitialRequests: 10,
                maxAsyncRequests: 10,
                cacheGroups: {
                    // Third-party files (dependencies)
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            return `${cacheGroupKey}.${packageName.replace('@', '')}`
                        },
                    },
                    // Common files
                    common: {
                        minChunks: 2,
                        priority: -10, // Vendors are prioritary
                    },
                },
            },
            runtimeChunk: 'single',
        },
    }
}
