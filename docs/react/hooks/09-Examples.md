# Examples

## Fetching data

> Until Suspense is released, fetching data proves to be a good exercise for hooks practice.
> Enjoy the examples below

## Fetching data on mount

```jsx live
function fetchMount() {
  const stringifyData = (data) => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const fetchData = () => {
      const uri = 'https://randomuser.me/api/'
      fetch(uri)
        .then((res) => res.json())
        .then(({ results }) => {
          const { name, gender, dob } = results[0]
          const dataVal = stringifyData({
            ...name,
            gender,
            age: dob.age,
          })
          setData(dataVal)
        })
    }

    fetchData()
  }, [])

  return (
    <>
      <h4> 👇User Data 👇</h4>
      <section>
        <pre>{data}</pre>
      </section>
    </>
  )
}
```

## FetchData in response to user event

```jsx live
function fetchEvent() {
  const stringifyData = (data) => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const [data, setData] = useState(initialData)

  const [gender, setGender] = useState('female')

  useEffect(() => {
    const fetchData = () => {
      const uri = 'https://randomuser.me/api/?gender=' + gender
      fetch(uri)
        .then((res) => res.json())
        .then(({ results }) => {
          const { name, gender, dob } = results[0]
          const dataVal = stringifyData({
            ...name,
            gender,
            age: dob.age,
          })
          setData(dataVal)
        })
    }

    fetchData()
  }, [gender])

  return (
    <>
      <p>Click the buttons below to fetch data</p>
      <button
        onClick={() => setGender('male')}
        style={{ outline: gender === 'male' ? '1px solid' : 0 }}
      >
        Fetch Male User
      </button>
      <button
        onClick={() => setGender('female')}
        style={{ outline: gender === 'female' ? '1px solid' : 0 }}
      >
        Fetch Female User
      </button>

      <section>
        <pre>{data}</pre>
      </section>
    </>
  )
}
```

## Show Loading Indicator

```jsx live
function loading() {
  const stringifyData = (data) => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const loadingData = stringifyData({ data: 'loading...' })
  const [data, setData] = useState(initialData)

  const [gender, setGender] = useState('female')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      const uri = 'https://randomuser.me/api/?gender=' + gender
      fetch(uri)
        .then((res) => res.json())
        .then(({ results }) => {
          setLoading(false)
          const { name, gender, dob } = results[0]
          const dataVal = stringifyData({
            ...name,
            gender,
            age: dob.age,
          })
          setData(dataVal)
        })
    }

    fetchData()
  }, [gender])

  return (
    <>
      <p>Click the buttons below to fetch data</p>
      <button
        onClick={() => setGender('male')}
        style={{ outline: gender === 'male' ? '1px solid' : 0 }}
      >
        Fetch Male User
      </button>
      <button
        onClick={() => setGender('female')}
        style={{ outline: gender === 'female' ? '1px solid' : 0 }}
      >
        Fetch Female User
      </button>

      <section>
        {loading ? <pre>{loadingData}</pre> : <pre>{data}</pre>}
      </section>
    </>
  )
}
```
