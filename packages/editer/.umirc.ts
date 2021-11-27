import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/Container' },
  ],
  fastRefresh: {},
  mfsu: {},
  "theme": {
    "@primary-color": "rgb(58, 185, 212)",
  },
  alias: {
    '@': path.resolve(__dirname, './src')
  }
});
