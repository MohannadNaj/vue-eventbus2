let EventBusInstance;
let windowObject = null;

import Vue from 'vue'
import EventBus from './EventBus'

EventBusInstance = new EventBus(Vue);

export default EventBusInstance;
