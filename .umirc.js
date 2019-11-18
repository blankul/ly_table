export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true,
        },
        antd: true,
        routes: {
          exclude: [/models\//],
        },
        polyfills: ['ie9'],
        locale: {},
        library: 'react',
        dll: {
          exclude: [],
        },
        pwa: true,
        hd: false,
        fastClick: true,
        title: 'default title',
        // chunks: ['vendor', 'umi'],
        scripts: [
          // { src: 'http://cdn/a.js' },
          // { src: '<%= PUBLIC_PATH %>a.js' },
          // { content: `alert('a');` },
        ],
        headScripts: [],
        metas: [{ charset: 'utf-8' }],
        // links: [{ rel: 'stylesheet', href: 'http://cdn/a.css' }],
      },
    ],
  ],
};
