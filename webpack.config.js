const path = require('path');

module.exports = {
    entry: './src/XUL.js', // 输入文件
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: "XUL.js", // 输出文件
        library: {
            name: 'XUL', // 你希望暴露的库的名称
            type: 'umd', // 指定输出格式为 UMD
        },
        // 兼容 AMD、CommonJS 和作为全局变量
        umdNamedDefine: true,
        globalObject: 'this', // 兼容不同环境的全局对象
    },
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 使用 Babel 转换 ES6+ 代码为 ES5
                    },
                },
            },
        ],
    },
    externals: [
        "eventemitter3",
        "fast-xml-parser",
        "xmldom",
        "xpath",
        'path-browserify'
    ], // 排除依赖库
    // 其他配置...
    resolve: {
        fallback: {
            // path: require.resolve('path-browserify'),
            path:false,
            fs: false, // 如果你不需要 polyfill `fs`，可以设置为 `false`
            // buffer: require.resolve('buffer/'),
            // stream: require.resolve('stream-browserify'),
            // 添加其他需要 polyfill 的模块
        },
    },
};