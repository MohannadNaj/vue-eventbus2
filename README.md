# vue-eventbus2

> Event Bus for Vue.js Components

[![npm version](https://badge.fury.io/js/vue-eventbus2.svg)](https://www.npmjs.com/package/vue-eventbus2)
[![npm downloads](https://img.shields.io/npm/dt/vue-eventbus2.svg)](https://www.npmjs.com/package/vue-eventbus2)
[![Build Status](https://travis-ci.org/MohannadNaj/vue-eventbus2.svg?branch=master)](https://travis-ci.org/MohannadNaj/vue-eventbus2)
[![Coverage Status](https://coveralls.io/repos/github/MohannadNaj/vue-eventbus2/badge.svg?branch=master)](https://coveralls.io/github/MohannadNaj/vue-eventbus2?branch=master)

## Installation

``` shell
npm install vue-eventbus2 --save
# or
yarn add vue-eventbus2 --save
```


## Usage

The preferred usage of this package is to require it globally once:
``` js
window.EventBus = require('vue-eventbus2')
```

Now use it in your application to fire and listen to events:

``` js

EventBus.listen('my-event', function(data) {console.log(data)})
EventBus.listen('another-event', function() {console.log('another-event')})

EventBus.fire('my-event', {some: "data"})

EventBus.fire('another-event'})

```

## Testing

this Event Bus shipped with the following built-in testing helpers:

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
EventBus.## expectListenEvent('test2') // Failed, no one is listening to the poor test2..
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

# run all tests
npm test
```

## Credits

- Jeffrey Way for [This lesson on laracasts](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13).
- [Webpack Template from Vuejs-Templates](http://vuejs-templates.github.io/webpack/)
