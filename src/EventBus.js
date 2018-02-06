export default class {
  constructor(VueInstance = null) {
    if (VueInstance) { Vue = VueInstance; }

    if (! VueInstance && Vue == null) { var Vue = require('vue'); }

    this.init(Vue);
    return this.vue;
  }

  init(VueInstance) {
    this.vue = new VueInstance({ methods: this.methods, data: this.data });
  }


  get data() {
    return {
      fireHistory: [],
      listenHistory: [],
    };
  }

  get methods() {
    return {
      fresh() {
        this.clearHistory();
        return this;
      },

      fire(event, data = null) {
        this.recordFire(event, data);
        this.$emit(event, data);
      },

      listen(event, callback) {
        this.recordListen(event, callback);
        this.$on(event, callback);
      },

      recordFire(event, data = null) {
        this.fireHistory.push(this.prepareEventRecord(event, data));
      },

      getFireHistory() {
        const result = [];
        this.fireHistory.forEach((item) => {
          result.push(Object.keys(item)[0]);
        });
        return result;
      },

      recordListen(event, data = null) {
        this.listenHistory.push(this.prepareEventRecord(event, data));
      },

      prepareEventRecord(event, data) {
        const recordedEvent = {};
        recordedEvent[event] = data;
        return recordedEvent;
      },

      getListenHistory() {
        const result = [];
        this.listenHistory.forEach((item) => {
          result.push(Object.keys(item)[0]);
        });
        return result;
      },

      clearHistory() {
        this.$off();
        this.listenHistory = [];
        this.fireHistory = [];
      },
      expectEvent(eventName, eventStatus = 'Fire', expectPresent = true) {
        const expectedEvent = eventName;

        const eventInHistory = this[`get${eventStatus}History`]().filter(
          e => e == expectedEvent,
        );

        if (expectPresent) return this._expectEqual(expectedEvent, eventInHistory[0]);

        return this._expectEqual(eventInHistory, []);
      },
      notExpectEvent(eventName, eventStatus = 'Fire') {
        return this.expectEvent(eventName, eventStatus, false);
      },
      expectListenEvent(eventName) {
        return this.expectEvent(eventName, 'Listen');
      },
      _expectEqual(actual, _expectation) {
        if (expect == null) { throw "can't find expect method"; }

        const expectFn = expect(actual);

        if (expectFn.to != null && expectFn.to.equal != null) { return expectFn.to.equal(_expectation); }

        expectFn.toEqual(_expectation);
      },
    };
  }
}
