import { type Meta, type StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { SearchDexidComponent } from './search-dexid.component';

const meta: Meta<SearchDexidComponent> = {
  title: 'Features/Pokemon/Components/Search-Dexid',
  component: SearchDexidComponent,
  tags: [],
  args: {
    onIdChange: fn(),
  },
};

export default meta;
type Story = StoryObj<SearchDexidComponent>;

export const SearchDexid: Story = {
  args: {
    initialValue: 487,
  },
};
