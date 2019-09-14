
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env){
    return {
        plugins: [
            new BundleAnalyzerPlugin(),
        ]
    };
};