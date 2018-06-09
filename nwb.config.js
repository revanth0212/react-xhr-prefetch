module.exports = {
  type: 'react-app',
  webpack: {
    extra: {
      module: {
        rules: [
          {
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' },
          },
        ],
      },
    },
  },
}
