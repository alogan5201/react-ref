import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import Button from '@mui/material/Button'
import { useList } from 'react-use'

function FetchMount() {
  const stringifyData = (data) => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const [data, setData] = useState(initialData)
  const [
    list,
    {
      set,
      push,
      updateAt,
      insertAt,
      update,
      updateFirst,
      upsert,
      sort,
      filter,
      removeAt,
      clear,
      reset,
    },
  ] = useList([])
  const Items = ({ items }) => {
    // modifying array to array of li JSX
    const list = items.map((i) => <li key={i.name}>{i.name}</li>)
    return list
  }
  useEffect(() => {
    fetch('https://api.github.com/users/alogan5201/starred')
      .then((response) => response.json())
      .then((data) => {
        console.log('🚀 ~ data', data)
        // set(stringifyData(data))
        let arr = []
        for (let index = 0; index < data.length; index++) {
          const element = data[index]
          console.log(element.name, element.html_url)
          let obj = {
            name: element.name,
            url: element.html_url,
          }
          list.push(obj)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <h4> 👇User Data 👇</h4>
      <section>
        <ul>
          {list.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
        <pre>{list}</pre>
      </section>
    </>
  )
}
export default function StarsPage() {
  return (
    <Layout>
      <main className='container margin-vert--xl'>
        <div className='row'>
          <div className='col col--6 col--offset-3'>
            <h1 className='hero__title'>Stars</h1>
            <FetchMount />
          </div>
        </div>
      </main>
    </Layout>
  )
}
