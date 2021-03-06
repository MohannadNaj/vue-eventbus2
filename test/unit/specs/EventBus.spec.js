import EventBus from '@/main';

let vm;

describe('vue-eventbus2', () => {
  beforeEach(() => {
    vm = EventBus.fresh();
  });

  it('is instance of vue, dah!', () => {
    expect(vm._isVue).toBeTruthy();
  });


  it('passes the data from `fire` to `listen`', (done) => {
    EventBus.listen('data', (data) => {
      expect(data).toBe('my-data');
      done();
    });

    EventBus.fire('data', 'my-data');
  });

  it('can clear fire history', () => {
    vm.fire('test');
    vm.fire('test2');

    vm.clearHistory();

    expect(vm.getFireHistory().length).toBe(0);
  });

  it('fire method will trigger the right listened event', (done) => {
    /* eslint-disable no-throw-literal */
    vm.listen('test', () => { throw "shouldn't be triggered!"; });
    vm.listen('test2', done);

    vm.fire('test2');
  });


  it('fire method will trigger all listeners by order', (done) => {
    const listener1 = jest.fn();
    const listener2 = jest.fn(() => {
      expect(listener1).toHaveBeenCalled();
      /* eslint-disable no-use-before-define */
      expect(listener3).not.toHaveBeenCalled();
    });

    let listener3 = jest.fn(() => {
      expect(listener2).toHaveBeenCalled();
      done();
    });

    vm.listen('test', listener1);
    vm.listen('test', listener2);
    vm.listen('test', listener3);

    vm.fire('test');
  });

  it('can clear listen history', () => {
    vm.listen('test');
    vm.listen('test2');

    vm.clearHistory();

    expect(vm.getListenHistory().length).toBe(0);
  });

  it('can return array of listen history', () => {
    vm.listen('test1');
    vm.listen('test2');
    vm.listen('test1');

    expect(vm.getListenHistory()).toContain('test2');
    expect(vm.getListenHistory()).toContain('test1');
    expect(vm.getListenHistory().length).toBe(3);
  });

  it('can return array of fire history', () => {
    vm.fire('test1');
    vm.fire('test2');
    vm.fire('test1');

    expect(vm.getFireHistory()).toContain('test2');
    expect(vm.getFireHistory()).toContain('test1');
    expect(vm.getFireHistory().length).toBe(3);
  });

  it('has working testing methods', (done) => {
    jest.spyOn(EventBus, '_expectEqual');
    EventBus.listen('hi', () => { done(); });
    EventBus.expectListenEvent('hi');
    EventBus.fire('hi2');
    EventBus.expectEvent('hi2');

    expect(EventBus._expectEqual).toHaveBeenCalledTimes(2);
    EventBus.fire('hi');
  });

  it('testing methods looks for the appropriate matchers', (done) => {
    const tmpExpect = expect;
    const jestFn = jest.fn(done);

    expect = () => ({ to: { equal: jestFn } });
    EventBus.expectEvent('hi2');

    expect = tmpExpect;
    expect(jestFn)
      .toHaveBeenCalledTimes(1);
  });
});
