We implement our own stack system so we can properly handle async calls in
a logical fashion.

Since everything is an observation and asynchroneous, it could be really easy
to get out of sync. So we are going to schedule all observations to happen in the next tick.

Take for example this code:

```nx
(def[:obj {
  :key1 true
  :key2 true
}])

(@[obj.key1](
  (obj.key2 !obj.key2)
  // respond to it
  
))

// inside some other observation
(defn [:mapObjKeys] {key}(
  (key !key)
))
(map[obj :mapObjKeys])
```

In this scenario, if everything was sequential, the execution order would be something like this:

```
create :obj
create observation of :obj:key1
map :obj
  invert :obj:key1
    run observation of :obj:key1
    invert :obj:key2 // false

  invert :obj:key2 // true
```

This is a race condition. This is what we want to have happen

```
create :obj
create observation of :obj:key1
map :obj
  invert :obj:key1
  invert :obj:key2 // true

run observations
  run observation of :obj:key1
    invert :obj:key2 // false
```

So what this means is that all observation callers need to just be kicked
into the next tick, so all current thread operations can finish.

