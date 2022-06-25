# useState

## Declare State Variable

Declaring a state variable is as simple as calling `useState` with some initial state value.

```jsx live
function State(props) {
  const [count] = useState(100)

  return (
    <div>
      <div> State variable is {count}</div>
    </div>
  )
}
```

## Update State Variable

Updating a state variable is as simple as invoking the updater function returned by the `useState` invocation.

```jsx
const [stateValue, updaterFn] = useState(initialStateValue)
```

```jsx live
function UpdateState() {
  const [age, setAge] = useState(19)
  const handleClick = () => setAge(age + 1)

  return (
    <div>
      Today I am {age} Years of Age
      <div>
        <button onClick={handleClick}>Get older! </button>
      </div>
    </div>
  )
}
```

## Multiple State Variables

Multiple state variables may be used and updated from within a functional component as shown below:

```jsx live
function MultipleStateVariables() {
  const [age, setAge] = useState(19)
  const [siblingsNum, setSiblingsNum] = useState(10)

  const handleAge = () => setAge(age + 1)
  const handleSiblingsNum = () => setSiblingsNum(siblingsNum + 1)

  return (
    <div>
      <p>Today I am {age} Years of Age</p>
      <p>I have {siblingsNum} siblings</p>

      <div>
        <button onClick={handleAge}>Get older!</button>
        <button onClick={handleSiblingsNum}>More siblings!</button>
      </div>
    </div>
  )
}
```

## Use Object State Variable

As opposed to strings and numbers, you could also use an object as the initial value passed on to useState.

> Nb: You have to pass the entire object to the `useState` updater function as the object is replaced NOT merged.

```jsx live
function UseObjectState() {
  const [state, setState] = useState({ age: 19, siblingsNum: 4 })
  const handleClick = (val) =>
    setState({
      ...state,
      [val]: state[val] + 1,
    })
  const { age, siblingsNum } = state

  return (
    <div>
      <p>Today I am {age} Years of Age</p>
      <p>I have {siblingsNum} siblings</p>

      <div>
        <button onClick={handleClick.bind(null, 'age')}>Get older!</button>
        <button onClick={handleClick.bind(null, 'siblingsNum')}>
          More siblings!
        </button>
      </div>
    </div>
  )
}
```

```jsx
// 🐢 setState (object merge) vs useState (object replace)
// assume initial state is {name: "Ohans"}

setState({ age: 'unknown' })
// new state object will be
// {name: "Ohans", age: "unknown"}

useStateUpdater({ age: 'unknown' })
// new state object will be
// {age: "unknown"} - initial object is replaced
 {age: "unknown"} - initial state object is replaced
```

## Initialize State from Function

As opposed to just passing an initial state value, state could also be initialized from a function as shown below:

```jsx live
function InitializeStatefromFunc() {
  const [token] = useState(() => {
    let token = window.localStorage.getItem('my-token')
    return token || 'default#-token#'
  })

  return <div>Token is {token}</div>
}
```

## Functional setState

The updater function returned from invoking useState can also take a function similar to the good ol' setState.

```jsx
const [value, updateValue] = useState(0)
// both forms of invoking updateValue below are valid 👇

updateValue(1)
updateValue((previousValue) => previousValue + 1)
```

This is ideal when the state update depends on some previous value of state.

```jsx live
function FunctionalSetState() {
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
