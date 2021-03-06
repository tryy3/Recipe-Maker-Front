var path = require("path");
var webpack = require("webpack");

const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: ["./src/main.js"],
    output: {
        path: resolve("dist"),
        publicPath: "/dist/",
        filename: "build.js"
    },
    plugins: [new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: "graphql-tag/loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue: '@vue/runtime-dom',
            //vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        },
        extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: "eval-source-map"
};

if (process.env.NODE_ENV === "production") {
    module.exports.mode = "production";
    module.exports.devtool = "#source-map";
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);

    module.exports.optimization = {
        minimize: true
    };
}
