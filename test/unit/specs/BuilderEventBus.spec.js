import Vue from 'vue';
import EventBusBuilder from '@/builder';

describe('Build vue-eventbus2 by passing the vue instance', () => {
  it('is instance of vue', () => {
    const EventBus = EventBusBuilder(Vue);
    expect(EventBus._isVue).toBeTruthy();
  });
});
