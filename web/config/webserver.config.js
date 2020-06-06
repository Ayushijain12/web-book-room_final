const path = require('path');

module.exports = basePath => {
    return {
        contentBase: basePath,
        publicPath: '/',
        watchContentBase: true,
        hot: true,
        quiet: false,
        historyApiFallback: true,
        overlay: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        },
        proxy: {
            '/graphql': {
                target: 'http://api.paymenthub.dev.krupix.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/graphql': ''
                }
            }
        }
    };
};
