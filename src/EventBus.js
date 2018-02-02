export default class {
  constructor() {
    this.init();
    return this.vue;
  }

  init() {
    this.vue = new Vue({ methods: this.methods, data: this.data });
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
    };
  }
}
