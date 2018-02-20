const EventBus = require('./EventBus').default;

module.exports = function (Vue) {
  return new EventBus(Vue);
};
