# vue-eventbus2

> Event Bus for Vue.js.

The Event Bus is a publish-subscribe pattern implementation to ease the communication between routines that doesn't know much about each other.

This Event Bus for Vue.js will act as an intermediary message broker between your different components. So you may tell it to do something from component `A`, then you will "fire" that action in component `B`, and `C`, ...

[![npm version](https://badge.fury.io/js/vue-eventbus2.svg)](https://www.npmjs.com/package/vue-eventbus2)
[![npm downloads](https://img.shields.io/npm/dt/vue-eventbus2.svg)](https://www.npmjs.com/package/vue-eventbus2)
[![Build Status](https://travis-ci.org/MohannadNaj/vue-eventbus2.svg?branch=master)](https://travis-ci.org/MohannadNaj/vue-eventbus2)
[![Coverage Status](https://coveralls.io/repos/github/MohannadNaj/vue-eventbus2/badge.svg?branch=master)](https://coveralls.io/github/MohannadNaj/vue-eventbus2?branch=master)



## Contents

- [Quickstart](#quickstart)
- [API](#api)
- [Installation](#installation)
- [Testing](#testing)
- [Credits](#credits)
- [License](#license)

## Quickstart

``` bash
npm install vue-eventbus2 --save
```

``` js
window.Vue = require('vue')
window.EventBus = require('vue-eventbus2')

EventBus.listen('my-event', function(data) {console.log(data)})
EventBus.listen('another-event', function() {console.log('another-event is triggered')})

EventBus.fire('my-event', {some: "data"})
// > {some: "data"}

EventBus.fire('another-event'})
// > another-event is triggered
```

## API

### Register Events Listeners

`EventBus.listen(eventName |required, callback |required)`

Use the `listen` method to set event listeners:
``` js

EventBus.listen('add-task', (task) => {
    console.log(task.status);
});

EventBus.listen('log-data', (data = `In the bus`) => {
    console.log(data)
});
```

### Firing Events
`EventBus.fire(eventName |required, data |optional)`

Use the `fire` method to fire events:
``` js

EventBus.fire('add-task', {status: 'completed'});

EventBus.fire('log-data', `log me!`);
EventBus.fire('log-data');
```

## Installation

### Adding the package
``` bash
npm install vue-eventbus2 --save
# or
yarn add vue-eventbus2 --save
```


### Importing the package

#### 1. Globally
The preferred usage of this package is to require it globally once:
``` js
window.Vue = require('vue') // vue-eventbus2 will look here or `global.Vue` to see where to find Vue
window.EventBus = require('vue-eventbus2')
```

#### 2. Building

You may find it more convenient if you build the EventBus by passing the Vue instance your self:
``` js
let Vue = require('vue')
let EventBus = require('vue-eventbus2/builder')(Vue)
```

#### 3. as a Plugin
You may prefer to use it as a Vue Plugin without exposing it to any global object, this way it will be associated to the main Vue instance which will be inherited to each Vue instance/component. [read more about Vue Plugins](https://vuejs.org/v2/guide/plugins.html).

You can import it as a plugin by requiring `vue-eventbus2/plugin`, this will set the Event Bus as a `$bus` property in the main Vue instance.

``` js
let Vue = require('vue')
let EventBusPlugin = require('vue-eventbus2/plugin');

Vue.use(EventBusPlugin);

let vm = new Vue();

vm.$bus.fire('some event')
```

### 4. as a Plugin with a custom property name
If you didn't like the `$bus` property name, change it by passing the preferred name as an option:
``` js
let Vue = require('vue')
let EventBusPlugin = require('vue-eventbus2/plugin');

Vue.use(EventBusPlugin, 'MyEventBus'); // passing the name as an option

let vm = new Vue();

vm.MyEventBus.fire('some event')

```

___

## Testing

this Event Bus shipped with the following built-in testing helpers.

> Behind the scenes, the Event Bus only needs the `equal` assertion, it will check whether to use jasmine's `expect(object).toEqual`  or chai's `expect(object).to.equal` and will act accordingly.

### expectEvent(eventName)

Assert that the given event name is fired.

``` js
EventBus.fire('test1')

EventBus.expectEvent('test1') // Pass
EventBus.expectEvent('test2') // Fail..
```

### notExpectEvent(eventName)

Assert that the given event name is not fired.

``` js
EventBus.fire('test1')

EventBus.notExpectEvent('test1') // Fail
EventBus.notExpectEvent('test2') // Pass..
```

### expectListenEvent(eventName)

Assert that the given event name is being listened to.

``` js
EventBus.listen('test1', () => {console.log(`I'm a listener!`)})

EventBus.expectListenEvent('test1') // Pass
EventBus.expectListenEvent('test2') // Failed, no one is listening to the poor test2..
```

### getFireHistory()

Get a list of the recorded fired events.

``` js
EventBus.fire('one')
EventBus.fire('two')

EventBus.getFireHistory() // ['one','two']
```

### getListenHistory()

Get a list of the recorded fired events.

``` js
EventBus.listen('one')
EventBus.listen('two')

EventBus.getListenHistory() // ['one','two']
```

### clearHistory()

Clears the recorded fire/listen events.
``` js
EventBus.fire('test');
EventBus.fire('test2');
EventBus.listen('test2');

EventBus.clearHistory();

EventBus.getFireHistory(); // []
EventBus.getListenHistory(); // []

```

Useful to be used within `beforeEach` or `afterEach` spec methods:
``` js
window.EventBus = require('vue-eventbus2')

describe('My spec', () => {

  beforeEach(() => {
    EventBus.clearHistory()
  })

  it('do something', () => {
    EventBus.fire('hello')
  })  
});
```

### fresh()

Alias for [clearHistory](#clearhistory) except it will also return the EventBus instance.

Useful to be used within `beforeEach` or `afterEach` spec methods:
``` js
  beforeEach(() => {
    EventBus = EventBus.fresh()
  })
```

## Contribution & Build Setup

``` bash
# install dependencies
npm install

# run unit tests and watch file changes
npm run watch

# run all tests and check code coverage
npm test
```

## Credits

- Jeffrey Way for [This lesson on laracasts](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13).
- [Webpack Template from Vue.js-Templates](http://vuejs-templates.github.io/webpack/)

## License
The MIT License (MIT).
