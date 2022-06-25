# useMemo

Notes:

- `useMemo` returns a memoized value.
- Call signature: `const memoizedValue = useMemo(functionThatReturnsValue, arrayDependencies)`
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#usememo)

---

## Starter Example

```jsx live
function starter() {
  const App = () => {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = { value: 'someValue' }
    const doSomething = () => {
      return someValue
    }

    return (
      <div>
        <Age age={age} handleClick={handleClick} />
        <Instructions doSomething={doSomething} />
      </div>
    )
  }

  const Age = ({ age, handleClick }) => {
    return (
      <div>
        <div
          style={{ border: '2px', background: 'papayawhip', padding: '1rem' }}
        >
          Today I am {age} Years of Age
        </div>
        <pre> - click the button below 👇 </pre>
        <button onClick={handleClick}>Get older! </button>
      </div>
    )
  }

  const Instructions = memo((props) => {
    return (
      <div style={{ background: 'black', color: 'yellow', padding: '1rem' }}>
        <p>Follow the instructions above as closely as possible</p>
      </div>
    )
  })

  return <App />
}
```

The example above is similar to the one for [useCallback](/usecallback).

The only difference here is that `someValue` is an object NOT a string.
Owing to this, the `Instructions` component still re-renders despite the use of `React.memo`.

Why?

Objects are compared by reference, and the reference to `someValue` changes whenever `<App />` re-renders.

Any solutions?

## Basic Usage

The object, `someValue` may be memoized using `useMemo`. This prevents the needless re-render.

```jsx live
function basic() {
  const App = () => {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = useMemo(() => ({ value: 'someValue' }))
    const doSomething = () => {
      return someValue
    }

    return (
      <div>
        <Age age={age} handleClick={handleClick} />
        <Instructions doSomething={doSomething} />
      </div>
    )
  }

  const Age = ({ age, handleClick }) => {
    return (
      <div>
        <div
          style={{ border: '2px', background: 'papayawhip', padding: '1rem' }}
        >
          Today I am {age} Years of Age
        </div>
        <pre> - click the button below 👇 </pre>
        <button onClick={handleClick}>Get older! </button>
      </div>
    )
  }

  const Instructions = memo((props) => {
    return (
      <div style={{ background: 'black', color: 'yellow', padding: '1rem' }}>
        <p>Follow the instructions above as closely as possible</p>
      </div>
    )
  })

  return <App />
}
```
