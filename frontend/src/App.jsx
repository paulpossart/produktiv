import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState(null)

  if (!auth) return 'sign in';

  return (
    <>
      home
    </>
  )
}

export default App
