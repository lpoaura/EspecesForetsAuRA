const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
s;

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: undefined,
  assetsDir: "assets",
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),
          // Required - Routes to render.
          routes: [
            "/",
            "/dept/01",
            "/dept/03",
            "/dept/07",
            "/dept/15",
            "/dept/26",
            "/dept/38",
            "/dept/42",
            "/dept/43",
            "/dept/63",
            "/dept/69",
            "/dept/73",
            "/dept/74",
          ],
        }),
      ],
    };
  },
};
