# useContext

Notes:

- `useContext` saves you the stress of having to rely on a Context consumer.
- Call signature: `const contextValue = useContext(contextObject)`
- It has a simpler API when compared to `MyContext.Consumer` and the render props API it exposes.
- View the [docs.](https://reactjs.org/docs/hooks-reference.html#usecontext)

---

```jsx
// consuming context via a consumer:
const ThemeContext = React.createContext('dark')

function Button() {
  return (
    <ThemeContext.Consumer>
      {(theme) => <button className={theme}>Amazing button</button>}
    </ThemeContext.Consumer>
  )
}
```

Here's an example with ThemeContext.Consumer:

```jsx
const ThemeContext = React.createContext('light')

const Display = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          style={{
            background: theme === 'dark' ? 'black' : 'papayawhip',
            color: theme === 'dark' ? 'white' : 'palevioletred',
            width: '100%',
            minHeight: '200px',
          }}
        >
          {'The theme here is ' + theme}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
render(Display)
```

```jsx
// consume context with the useContext hook:
import { useContext } from 'react'

function ButtonHooks() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Amazing button</button>
}
```

Here's a live example with useContext:

```jsx
const ThemeContext = React.createContext('light')

const Display = () => {
  const theme = useContext(ThemeContext)
  return (
    <div
      style={{
        background: theme === 'dark' ? 'black' : 'papayawhip',
        color: theme === 'dark' ? 'white' : 'palevioletred',
        width: '100%',
        minHeight: '200px',
      }}
    >
      {'The theme here is ' + theme}
    </div>
  )
}
render(Display)
```
