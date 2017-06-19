

# NX

A language based on asynchroneous observations. All things are asynchroneous. All things are observable.

## Observations

Everything is an observation of something else. When that other thing changes, your observation happens.
Everyone assumed side-effects were bad. Well, they are when you can't expect them. But if everything
is a side-effect, then that's all you expect and can build your app around.

```nx
(def queue {
  :running true
  :components []
})

// A function that observes queue.running
@[queue.running] (
)
```

Observation syntax: `@[_thing_ ?[_modifiers_]]`

## Asynchroneous

In order to observe all things, things have to happen asynchroneously. There is no exception.
This requires a mental model of knowing how things react to eachother.

## Functions

Functions can only be called within observations.
Can be defined anywhere though.


## runtime questions

Switch statement is the default.

```nx
(cond [condition](
        // do thing)
      [condition2](
        // do other thing)
      else(
        // default
      ))
```

```js
if (condition) {
  // do thing
} else if (condition) {
  // do other thing
} else {
  // default
}
```
