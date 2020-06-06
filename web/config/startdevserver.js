'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const port = parseInt(process.env.PORT, 10) || 8080;
const hostname = process.env.HOST || '0.0.0.0';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const path = require('path');

// config
const config = require('./webpack.config')({ env: 'development' });
const devServerConfig = require('./webserver.config')(config.output.path);

console.log('config.output.path: ' + config.output.path);
console.log('devServerConfig.contentBase: ' + devServerConfig.contentBase);

const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, devServerConfig);

devServer.listen(port, hostname, err => {
    if (err) {
        return console.log(err);
    }
    console.log(chalk.cyan('Starting the development server ' + hostname + ':' + port + ' ...\n'));
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
        devServer.close();
        process.exit();
    });
});
