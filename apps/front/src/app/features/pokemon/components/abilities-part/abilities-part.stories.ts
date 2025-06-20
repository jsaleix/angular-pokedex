import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AbilitiesPartComponent } from './abilities-part.component';
import { mapAbilityFromApi } from '@features/pokemon/models/abilities.dto';
import { mockAbilityData } from '@features/pokemon/services/data/abilities';

const abilities = mapAbilityFromApi(mockAbilityData);

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
  args: { abilities: [abilities, abilities] },
};
