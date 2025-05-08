import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Layout/Header',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  tags: [],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Header: Story = {
  args: {},
};
