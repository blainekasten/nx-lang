# Composition

We need to be able to compose observers. Let's take input events as an example.


```nx
(ns Comp)
(import {mousemove} nx/events)
(import querySelector js/document)
(import takeUntil nx/observerHelpers)

(def input (querySelector "input"))

(defn outOfRange [event] (
 // something that returns a boolean
)

(@[(mouseMove input) @[takeUntil outOfRange]] {event} (
))
```


```jsish
var input = querySelector("input"); // input is an observer to a node of values

observe(input.mousemove, function) {
}
```


Let's take an example of an object, observing it's values, then observing the observer of that observer

```jsish
var value = {
  foo: 'bar'
}

const observer = observe(value).with(function(updatedValue) {
  return updatedValue.foo !== 'bar' ? 1 : 0;
});


observe(observer).with(function(observerReturnValue) {
  observerReturnValue // 1;
});

value.foo = 'baz';
```
