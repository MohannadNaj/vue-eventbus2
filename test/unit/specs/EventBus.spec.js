import EventBus from '@/main';

let vm;

const log = (...args) => { console.log(...args); };

describe('vue.eventbus', () => {
  beforeEach(() => {
    vm = EventBus.fresh();
  });

  it('instance of vue, dah!', () => {
    expect(vm._isVue).toBeTruthy();
  });

  it('can clear fire history', () => {
    vm.fire('test');
    vm.fire('test2');

    vm.clearHistory();

    expect(vm.fireHistory.length).toBe(0);
  });

  it('fire method will trigger the right listened event', (done) => {
    vm.listen('test', () => { throw "shouldn't be triggered!"; });
    vm.listen('test2', done);

    vm.fire('test2');
  });


  it('fire method will trigger all listeners by order', (done) => {
    const listener1 = jest.fn();
    const listener2 = jest.fn(() => {
      expect(listener1).toHaveBeenCalled();
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

    expect(vm.listenHistory.length).toBe(0);
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

  it('has working testing methods', done => {
    jest.spyOn(EventBus, 'expectEqual')
    EventBus.listen('hi', () => {done()})
    EventBus.expectListenEvent('hi')
    EventBus.fire('hi2')
    EventBus.expectEvent('hi2')

    expect(EventBus.expectEqual).toHaveBeenCalledTimes(2)
    EventBus.fire('hi')
  })

  it('testing methods looks for the appropriate matchers', done => {
    let tmpExpect = expect;
    let jestFn = jest.fn(done)

    expect = () => {return {to: {equal: jestFn}}}
    EventBus.expectEvent('hi2')

    expect = tmpExpect    
    expect(jestFn)
    .toHaveBeenCalledTimes(1)

  });
});
