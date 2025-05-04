import { provideRouter, RouterModule } from '@angular/router';
import { moduleMetadata, type Preview } from '@storybook/angular';
// import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
