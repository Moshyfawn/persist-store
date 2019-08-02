import { useState } from 'react'

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues || {})
  const [touchedValues, setTouchedValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setValues({
      ...values,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  const handleBlur = e => {
    const target = e.target
    const name = target.name
    setTouchedValues({
      ...touchedValues,
      [name]: true
    })
    const event = validate(values)
    setErrors({
      ...errors,
      ...event
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const event = validate(values)
    setErrors({
      ...errors,
      ...event
    })
    onSubmit(values, event)
  }

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  }
}

export default useForm
