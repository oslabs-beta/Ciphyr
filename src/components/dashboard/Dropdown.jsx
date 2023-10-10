import { useState, useEffect } from 'react'

export default function Dropdown() {
  const [options, setOptions] = useState([]);

  // grab all instances relevant to current user
  const getInstances = async () => {
    const res = await fetch('/api/instance')
    const result = await res.json()
    setOptions(result)
  }
  // call getInstances once every render
  useEffect(() => {
    getInstances()
  }, [])

  // map user's instances into a dropdown list
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