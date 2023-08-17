module.exports = {
    entry: {
        server: './server.js'
    },
    target: 'node',
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: "[id].bundle.js"
    },
    externals: {
        './config': 'require("./config")',
    },
    optimization: {
        minimize: false,
    }
};

