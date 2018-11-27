const presets = [
  [
    '@babel/env',
    {
      // I target up to the last 2 versions of each browser as specified
      targets: {
        edge: '16',
        firefox: '61',
        chrome: '68',
        safari: '10',
        opera: '54',
        ie: "11",
      },
      useBuiltIns: 'usage',
    },
  ],
];

module.exports = { presets };
