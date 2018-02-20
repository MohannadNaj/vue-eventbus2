/* eslint-disable import/no-duplicates */
import EventBus from '@/main';
import EventBusAnotherImport from '@/main';

describe('Import vue-eventbus2', () => {
  it('is instance of vue', () => {
    expect(EventBus._isVue).toBeTruthy();
    EventBus.fire('Hello World!');
  });
  it('uses the same instance', () => {
    EventBusAnotherImport.fire('Hello Universe!');

    expect(EventBus.getFireHistory().length)
      .toEqual(2);
  });
});
