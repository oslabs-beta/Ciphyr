import { useState, useEffect } from 'react'

export default function Dropdown() {
  const [options, setOptions] = useState([])

  const getInstances = async () => {
    const res = await fetch('/api/instance')
    const result = await res.json()
    setOptions(result)
    console.log(options)
  }

  useEffect(() => {
    getInstances()

  }, [])


  return (
   <>
    <option value="null">Choose an Instance</option>
    {options.map((option) => (
    <option value={option.api_key}>
    {option.label}
  </option>
  ))}
    </>
  )
}