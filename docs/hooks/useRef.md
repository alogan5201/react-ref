# useRef

Notes

- returns a 'ref' object.
- Call signature: `const refContainer = useRef(initialValueToBePersisted)`
- Value is persisted in the `refContainer.current` property.
- values are accessed from the `.current` property of the returned object.
- The`.current` property could be initialised to an initial value e.g.
  `useRef(initialValue)`
- The object is persisted for the entire lifetime of the component.
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#useref)

---

## Accessing the DOM

```jsx live
function access() {
  const textAreaEl = useRef(null)
  const handleBtnClick = () => {
    textAreaEl.current.value =
      "The is the story of your life. You are an human being, and you're on a website about React Hooks"
    textAreaEl.current.focus()
  }
  return (
    <section style={{ textAlign: 'center' }}>
      <div>
        <button onClick={handleBtnClick}>Focus and Populate Text Field</button>
      </div>
      <label
        htmlFor='story'
        style={{
          display: 'block',
          background: 'olive',
          margin: '1em',
          padding: '1em',
        }}
      >
        The input box below will be focused and populated with some text
        (imperatively) upon clicking the button above.
      </label>
      <textarea ref={textAreaEl} id='story' rows='5' cols='33' />
    </section>
  )
}
```

## Instance Like Variables (Generic Container)

Other than just holding DOM refs, the "ref" object can hold any value.

```jsx live
function instance() {
  const textAreaEl = useRef(null)
  const stringVal = useRef('This is a string saved via the ref object --- ')
  const handleBtnClick = () => {
    textAreaEl.current.value =
      stringVal.current +
      "The is the story of your life. You are an human being, and you're on a website about React Hooks"
    textAreaEl.current.focus()
  }
  return (
    <section style={{ textAlign: 'center' }}>
      <div>
        <button onClick={handleBtnClick}>Focus and Populate Text Field</button>
      </div>
      <label
        htmlFor='story'
        style={{
          display: 'block',
          background: 'olive',
          margin: '1em',
          padding: '1em',
        }}
      >
        Prepare to see text from the ref object here. Click button above.
      </label>
      <textarea ref={textAreaEl} id='story' rows='5' cols='33' />
    </section>
  )
}
```

You could do the same as storing the return value from a `setInterval` for cleanup.

```jsx
function TimerWithRefID() {
  const setIntervalRef = useRef()

  useEffect(() => {
    const intervalID = setInterval(() => {
      // something to be done every 100ms
    }, 100)

    // this is where the interval ID is saved in the ref object
    setIntervalRef.current = intervalID
    return () => {
      clearInterval(setIntervalRef.current)
    }
  })
}
```
