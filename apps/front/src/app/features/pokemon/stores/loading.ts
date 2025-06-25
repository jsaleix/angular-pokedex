import { computed, signal } from '@angular/core';

const loadingSignal = signal(true);

export const needsLoading = computed(() => {
  return loadingSignal();
});

export const disableLoading = () => {
  loadingSignal.set(false);
};
