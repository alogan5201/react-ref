---
id: array-map
title: Array Map
description: This helpful guide lays out the prerequisites for learning React Native, using these docs, and setting up your environment.
---

# Array Map

```jsx
import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'

import Link from '@docusaurus/Link'

function StarList() {
  const stringifyData = (data) => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const [data, setData] = useState(initialData)
  useEffect(() => {

    console.log(data, data.length)
    if(data[0].name){
      console.log(data[0].name)
    }
  }, [data]);

  useEffect(() => {
    fetch('https://api.github.com/users/alogan5201/starred')
      .then((response) => response.json())
      .then((data) => {
      //  console.log('🚀 ~ data', data)
        setData(data)
        // set(stringifyData(data))
      
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
    <div className='container'>
<div className='row'>

  <div className='col col--4'>
  <h4> 👇🌟Stars🌟 👇</h4>
   
    
   <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
   {data && data[0].name ? data.map((item, i) => {
       return <li key={i}>
       <Link to={item.html_url}>
       {item.name}
       </Link>
       
       
       </li>
     }) : ''}
   </ul>
  </div>
</div>
    </div>
  
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
            <StarList />
          </div>
        </div>
      </main>
    </Layout>
  )
}

```
