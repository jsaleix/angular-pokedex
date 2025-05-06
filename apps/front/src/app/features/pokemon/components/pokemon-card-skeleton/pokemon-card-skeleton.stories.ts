import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { PokemonCardSkeletonComponent } from './pokemon-card-skeleton.component';

const meta: Meta<PokemonCardSkeletonComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Card-Skeleton',
  component: PokemonCardSkeletonComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="max-height: 80vh; width: 80vw;">${story}</div>`,
    ),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonCardSkeletonComponent>;

export const PokemonCardSkeleton: Story = {
  args: {},
};
