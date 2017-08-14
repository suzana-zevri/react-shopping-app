// module.exports = {
//   webpack: (config) => {
//     config.module.loaders = (config.module.loaders || []).concat({ 
//         test: /\.css$/, 
//         use: [
//           'style-loader',
//           'css-loader?import=false',
//           //{ loader: 'css-loader', options: { modules: true, import: false } },
//           'raw-loader',
//         ]
//       },{ 
//         test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
//         loader: 'url-loader?limit=100000' 
//       })
//     return config
//     console.log(config);
//   }
// }
module.exports = {
  webpack: config => {
    config.module.rules.push({
      
    });
    return config;
  },
};