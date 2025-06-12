import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { TypeItemComponent } from './type-item.component';

const meta: Meta<TypeItemComponent> = {
  title: 'Features/Pokemon/Components/TypeItem',
  component: TypeItemComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="padding: 10px 50px; max-height: 80vh; width: 80vw; background-color: black">${story}</div>`,
    ),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<TypeItemComponent>;

export const TypeItem: Story = {
  args: { pkmType: 'Fire' },
};
