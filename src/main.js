let EventBusInstance;
let windowObject = null;

if (typeof window !== 'undefined') { windowObject = window; } else if (typeof global !== 'undefined') { windowObject = global; }

if (windowObject != null && windowObject.__VUE_EVENTBUS2 != null) {
  EventBusInstance = windowObject.__VUE_EVENTBUS2;
} else {
  const EventBus = require('./EventBus').default;
  let VueInstance = null;

  if (windowObject != null && windowObject.Vue) {
    VueInstance = windowObject.Vue;
  }
  if (!VueInstance) {
    VueInstance = require('vue');
    VueInstance.config.productionTip = false;
    VueInstance = 'default' in VueInstance ? VueInstance.default : VueInstance;

    /* eslint-disable no-console */
    console.warn('EventBus imported it\'s own version of Vue, this may cause loading of multiple instances of Vue, try to set `window.Vue` to the used vue instance before importing the EventBus.');
  }

  EventBusInstance = new EventBus(VueInstance);

  if (windowObject != null) {
    windowObject.__VUE_EVENTBUS2 = EventBusInstance;
  }
}

module.exports = EventBusInstance;
