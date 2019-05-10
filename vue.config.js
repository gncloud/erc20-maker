console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}