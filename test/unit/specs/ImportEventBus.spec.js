import EventBus from '@/main';

describe('Import vue-eventbus2', () => {
  it('is instance of vue', () => {
    expect(EventBus._isVue).toBeTruthy();
  });
});
