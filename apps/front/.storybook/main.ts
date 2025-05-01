import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: (config) => {
    config.module?.rules?.push({
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['@tailwindcss/postcss'],
            },
          },
        },
      ],
    });
    return config;
  },
};
export default config;
