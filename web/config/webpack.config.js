const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = function(extConfing) {
    const isEnvDevelopment = extConfing.env === 'development';
    const isEnvProduction = extConfing.env === 'production';
    const genSourceMap = extConfing.sourceMap ? extConfing.sourceMap !== 'false' : false;
    const currentDir = path.resolve('.');
    console.log('webpack.config extConfing', extConfing);
    console.log('webpack.config currentDir', currentDir);

    const sourceDir = path.resolve(currentDir, 'src');
    const outputDir = path.resolve(currentDir, 'build');
    // console.log('webpack.config sourceDir', sourceDir);
    // console.log('webpack.config outputDir', outputDir);

    const tsConfig = path.resolve(currentDir, 'tsconfig.json');
    const tsInit = path.resolve(currentDir, 'tslint.json');
    // console.log('webpack.config extConfing', tsConfig);
    // console.log('webpack.config currentDir', tsInit);

    return {
        mode: isEnvProduction ? 'production' : 'development',
        // context: currentDir,
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction ? (genSourceMap ? 'source-map' : false) : 'eval-source-map',
        entry: {
            index: isEnvDevelopment ? ['react-hot-loader/patch', path.join(sourceDir, 'index.tsx')] : [path.join(sourceDir, 'index.tsx')]
        },
        output: {
            pathinfo: isEnvDevelopment,
            filename: '[name].js',
            path: outputDir,
            publicPath: '/',
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info => path.relative(sourceDir, info.absoluteResourcePath).replace(/\\/g, '/')
                : isEnvDevelopment && (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
        },

        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            plugins: [
                // PnpWebpackPlugin
            ],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
            // alias: {
            //     'react-hot-loader': path.resolve(path.join(__dirname, './../../')),
            //     react: path.resolve(path.join(__dirname, './node_modules/react'))
            // }
        },

        module: {
            strictExportPresence: true,
            rules: [
                { parser: { requireEnsure: false } },

                {
                    test: /\.(ts|tsx)$/,
                    include: sourceDir,
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: { browsers: 'last 2 versions' } } // or whatever your project requires
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap: {
                                        svg: {
                                            ReactComponent: '@svgr/webpack?-svgo![path]'
                                        }
                                    }
                                }
                            ],
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            'react-hot-loader/babel'
                        ],
                        babelrc: false,
                        cacheDirectory: true,
                        cacheCompression: isEnvProduction,
                        compact: isEnvProduction
                    }
                },
                // Process any JS outside of the app with Babel.
                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                        cacheDirectory: true,
                        cacheCompression: isEnvProduction,
                        sourceMaps: false
                    },
                    // required for Can't reexport the named export 'visitWithTypeInfo' from non EcmaScript module (only default export is available)
                    type: 'javascript/auto'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebook/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009'
                                        },
                                        stage: 3
                                    })
                                ],
                                sourceMap: isEnvProduction ? genSourceMap : true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./node_modules']
                            }
                        }
                    ]
                },
                {
                    test: /\.(ico)$/,
                    loader: 'file-loader?name=[name].[ext]&publicPath=/'
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|gif)$/,
                    loader: 'file-loader?name=assets/[hash].[ext]&publicPath=/'
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: false }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __IS_SERVER__: JSON.stringify(false)
            }),
            new webpack.NamedModulesPlugin(),
            new CaseSensitivePathsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                tsconfig: tsConfig,
                tslint: tsInit,
                checkSyntacticErrors: true
            }),
            new HtmlWebPackPlugin({
                filename: 'index.html',
                template: path.join(sourceDir, 'index.html'),
                inject: false
            })
        ],
        optimization: {
            minimize: isEnvProduction,
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                //automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    commons: {
                        name: 'commons',
                        chunks(chunk) {
                            return chunk.name !== 'Home';
                        },
                        minChunks: 1
                    }
                    //styles: {
                    //    name: 'styles',
                    //    test: /\.css$/,
                    //    chunks: 'all',
                    //    enforce: true
                    //}
                }
            }
        }
    };
};
