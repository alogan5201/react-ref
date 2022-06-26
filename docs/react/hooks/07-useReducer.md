# useReducer

Notes:

- `useReducer` may be used as an alternative to `useState`.
- Call signature: `const [state, dispatch] = useReducer(reducer, initialState, lazyInitFunction)`
- Ideal for complex state logic where there's a dependency on previous state values or _a lotta_ state sub values
- Depending on your use case you may find useReducer to be quite testable
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#usereducer)

---

## Basic Usage

As opposed to calling `useState`, call `useReducer` with a `reducer` and `initialState` as shown below.
The `useReducer` call returns the state property and a `dispatch` function.

```jsx live
function Basic() {
  const initialState = { width: 15 }
  const [state, dispatch] = useReducer(reducer, initialState)
  function reducer(state, action) {
    switch (action) {
      case 'plus':
        return { width: state.width + 15 }
      case 'minus':
        return { width: Math.max(state.width - 15, 2) }
      default:
        throw new Error("what's going on?")
    }
  }
  return (
    <>
      <div
        style={{ background: 'teal', height: '30px', width: state.width }}
      ></div>
      <div style={{ marginTop: '3rem' }}>
        <button onClick={() => dispatch('plus')}>Increase bar size</button>
        <button onClick={() => dispatch('minus')}>Decrease bar size</button>
      </div>
    </>
  )
}
```

## Initialize State Lazily

`useReducer` takes a third function parameter. You may initialize state from this function, and whatever's returned from this function is returned as the state object.
This function will be called with `initialState` - the second parameter.

```jsx live
function initStateLazily() {
  const initializeState = () => ({
    width: 100,
  })
  // ✅ note how the value returned from the fn above overrides initialState below:
  const initialState = { width: 15 }
  const [state, dispatch] = useReducer(reducer, initialState, initializeState)
  function reducer(state, action) {
    switch (action) {
      case 'plus':
        return { width: state.width + 15 }
      case 'minus':
        return { width: Math.max(state.width - 15, 2) }
      default:
        throw new Error("what's going on?")
    }
  }

  return (
    <>
      <div
        style={{ background: 'teal', height: '30px', width: state.width }}
      ></div>
      <div style={{ marginTop: '3rem' }}>
        <button onClick={() => dispatch('plus')}>Increase bar size</button>
        <button onClick={() => dispatch('minus')}>Decrease bar size</button>
      </div>
    </>
  )
}
```

## Imitate this.setState's behaviour

`useReducer` uses a reducer that isn't as strict as Redux's e.g. the second parameter passed
to the reducer, `action` doesn't have to have a `type` property.
This allows for interesting manipulations such as renaming the second parameter and doing the following:

```jsx
const initialState = { width: 15 }
const reducer = (state, newState) => ({
  ...state,
  width: newState.width,
})

const Bar = () => {
  const [state, setState] = useReducer(reducer, initialState)
  return (
    <>
      <div
        style={{ background: 'teal', height: '30px', width: state.width }}
      ></div>
      <div style={{ marginTop: '3rem' }}>
        <button onClick={() => setState({ width: 100 })}>
          Increase bar size
        </button>
        <button onClick={() => setState({ width: 3 })}>
          Decrease bar size
        </button>
      </div>
    </>
  )
}
render(Bar)
```
