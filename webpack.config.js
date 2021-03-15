const path = require('path');
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');
module.exports = {

    mode : 'development',
    plugins : [new MiniCssExtractPlugin()],
    // entry : './src/index.js',
    // output : {
    //     filename : 'bundle.js',
    //     path: path.resolve(__dirname,'public')
    // },
    module :  {
        rules : [
            {
                test : /\.js$/,
                exclude: /node_modules/,
                use :{
                    //without additional settings , this will refer babelrc
                    loader : 'babel-loader'
                }
            },
            {
                test : /\.(s[ac]|c)ss$/i,
                use : [MiniCssExtractPlugin.loader,"css-loader" ,"sass-loader","postcss-loader"]
            }

        ]
    },
    devtool : 'source-map',
    devServer :{
        contentBase : './dist'
    }
}