import Vue from 'vue';
import EventBus from '@/plugin';

Vue.use(EventBus);

describe('Import vue-eventbus2 as a Vue Plugin', () => {
  it('is instance of vue', () => {
    const vm = new Vue();
    expect(vm.$bus._isVue).toBeTruthy();
  });
});
