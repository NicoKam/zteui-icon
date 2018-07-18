module.exports = {
  mode: 'production',
  devtool: false,
  entry:
    './src/index',
  output: {
    filename: '[name].js',
    // library: 'lib',
    libraryTarget: 'umd',
    path: `${__dirname}/dist`,
  },
  resolve: {
    // modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)?$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader',
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            noquotes: true,
            limit: 8192,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=8192&name=[path][name].[hash:12].[ext]'],
        exclude: /node_modules/,
      },
    ],
  },
};
