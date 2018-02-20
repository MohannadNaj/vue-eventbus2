const EventBus = require('./EventBus').default;

module.exports = {
  install: function install(Vue, propName = '$bus') {
    /* eslint-disable no-param-reassign */
    Vue.prototype[propName] = new EventBus(Vue);
  },
};
