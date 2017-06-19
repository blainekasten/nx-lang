Spaces are delimiters!


# observer

```nx
@[_thing_](_reaction_)
```

# Changer

Every value read/write is an async function to an immutable value.

```nx
(_thing_ _assignment)

// e.g.,
(queue.running true)
```

# Observable values

This is how you create a basic type

```nx
(def _VAR_NAME_ _VAR_BASE_VALUE_)
```

All values are in file-based namespace.

You must export values to be observed else-where.


# Functions

```nx
(defn ?name [?args] (
  // fn body
))
```

# import/export system.

All files must be namespaced, then imports and exports can happen.

```nx
(ns name/method)
```

```nx
(import map core/map)
(import map core)
```



TODO: Needs a way to cancel an observation
