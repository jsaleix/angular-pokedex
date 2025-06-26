import { MAX_DEX_ID } from '../constants';

export function getRandomDexId() {
  return Math.floor(Math.random() * MAX_DEX_ID) + 1;
}
