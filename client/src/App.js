import React, { useEffect, useState } from 'react'
import Post from './Post'
import Header from './Header'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDrtJBcGZVbl1KQ71TSoOhefbZDTo-JSxU',
  storageBucket: 'whativaneats.appspot.com',
}

firebase.initializeApp(config)
const storage = firebase.storage()
const storageRef = storage.ref()

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    storageRef.listAll().then(async response => {
      const items = await Promise.all(response.items.map(item => item.getDownloadURL()))

      setItems(items.reverse())
    })
  }, [])

  return (
    <div className="container">
      <Header />

      <div className="container__feed">
        {items.map((url, index) => <Post url={url} key={index} />)}
      </div>
    </div>
  )
}

export default App
