let _eventBus,
  EventBus;

if (typeof window === 'object' && typeof window.__VUE_EVENTBUS2 === 'object') {
  _eventBus = window.__VUE_EVENTBUS2;
} else {
  EventBus = require('./EventBus').default;

  _eventBus = new EventBus();

  if (typeof window === 'object') { window.__VUE_EVENTBUS2 = _eventBus; }
}

module.exports = _eventBus;
