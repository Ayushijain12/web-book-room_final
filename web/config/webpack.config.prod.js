process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const clientConfig = require('./webpack.config')({ env: 'production' });

// clientConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = clientConfig;
