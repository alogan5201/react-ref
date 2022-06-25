# useEffect

Notes:

- `useEffect` accepts a function which can perform any side effects.
- Call signature: `useEffect(effectFunction, arrayDependencies)`
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#useeffect)

---

## Basic Side Effect

```jsx live
function Basic() {
  const [count, setCount] = useState(0)
  return (
    <>
      <p>Count value is: {count}</p>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Plus (+)
      </button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Minus (-)
      </button>
    </>
  )
}
```

## Effect with Cleanup

It's pretty common to clean up an effect after some time. This is possible by returning a function from within the effect function passed to `useEffect`.
Below's an example with `addEventListener`.

```jsx live
function Effect() {
  useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    // return a clean-up function
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return (
    <div>
      When you click the window you'll find a message logged to the console
    </div>
  )
}
```

## Multiple Effects

Multiple `useEffect` calls can happen within a functional component as shown below:

```jsx live
function Multiple() {
  // 🍟
  useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  // 🍟 another useEffect hook
  useEffect(() => {
    console.log('another useEffect call')
  })

  return <div>Check your console logs</div>
}
```

> useEffect calls can be skipped i.e not invoked on every render.
> This is done by passing a second array argument to the effect function.

## Skipping Effects (Array Dependency)

In the example below, `useEffect` is passed an array of one value, `[randomNumber]`
Hence, the effect function will be called on mount **and** whenever a new "randomNumber" is generated.

Click the "Generate random number" button to see this.

```jsx live
function Skipping() {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])

  useEffect(() => {
    setEffectLogs((prevEffectLogs) => [
      ...prevEffectLogs,
      'effect fn has been invoked',
    ])
  }, [randomNumber])

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </button>
      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
```

## Skipping Effects (Empty Array Dependency )

In this example, `useEffect` is passed an empty array, `[]`.
Hence, the effect function will be called only on mount.

Click the button and you'll see that the effect function isn't invoked.

```jsx live
function SkippingEffects() {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])

  useEffect(() => {
    setEffectLogs((prevEffectLogs) => [
      ...prevEffectLogs,
      'effect fn has been invoked',
    ])
  }, [])

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </button>
      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
```

## Skipping Effects (No array dependency)

Without an array dependency, the effect function will be run after every single render.

```jsx
useEffect(() => {
  console.log('This will be logged after every render!')
})
```
