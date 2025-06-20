import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AbilitiesPartComponent } from './abilities-part.component';

const meta: Meta<AbilitiesPartComponent> = {
  title: 'Features/Pokemon/Components/AbilitiesPart',
  component: AbilitiesPartComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [],
    }),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<AbilitiesPartComponent>;

export const AbilitiesPart: Story = {
  args: {},
};
