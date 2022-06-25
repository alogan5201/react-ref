# useCallback

Notes:

- `useCallback` returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.
- Call signature: `const memoizedCallback = useCallback(function, arrayDependency)`
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#usecallback)

---

## Starter Example

The following example will form the basis of the explanations and code snippets that follow.

```jsx live
function Starter() {
  function App() {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = 'someValue'
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

  function Age({ age, handleClick }) {
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

In the example above, the parent component, `<Age />` is updated (and re-rendered) whenever the "Get older" button is clicked.
Consequently, the `<Instructions />` child component is also re-rendered because the `doSomething` prop is passed a
new callback, with a new reference. This can be seen from the random text colour which changes whenever the state value `age` is updated.

> NB: Even though the `Instructions` child component uses `React.memo` to optimize performance, it is still re-rendered.

How can this be fixed? i.e prevent `<Instructions />` from re-rendering needlessly?

## useCallback with referenced function

```jsx live
function referenced() {
  const App = () => {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = 'someValue'
    const doSomething = useCallback(() => {
      return someValue
    }, [someValue])

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

## useCallback with inline function

`useCallback` works with an inline function as well. Here's the same solution with a inline `useCallback` call.

```jsx live
function inline() {
  const App = () => {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = 'someValue'

    return (
      <div>
        <Age age={age} handleClick={handleClick} />
        <Instructions
          doSomething={useCallback(() => {
            return someValue
          }, [someValue])}
        />
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
