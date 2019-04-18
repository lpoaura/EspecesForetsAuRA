module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'cartes/foretaura'
        : '/',
    outputDir: undefined,
    assetsDir: 'assets',
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    css: undefined
}