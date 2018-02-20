window.Vue = require('vue');
const EventBus = require('@/main');

describe('Import vue-eventbus2', () => {
  it('is instance of vue', () => {
    expect(EventBus._isVue).toBeTruthy();
  });
});
