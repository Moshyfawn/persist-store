import React from 'react'
import styled, { css } from 'styled-components'

import useForm from './useForm'

function AuthForm({ onSend, error: serverError }) {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      username: '',
      password: ''
    },

    onSubmit(values, errors) {
      if (Object.entries(errors).length === 0) {
        onSend(values)
      }
    },

    validate(values) {
      const errors = {}
      if (values.username === '') {
        errors.username = 'Пожалуйста, введите имя пользователя'
      }
      if (values.password === '') {
        errors.password = 'Пожалуйста, введите пароль'
      }
      return errors
    }
  })

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Inputs>
        <InputWrapper>
          <Label htmlFor='username'>Имя пользователя:</Label>
          <Validation isActive={!!errors.username}>
            {errors.username}
          </Validation>
          <input
            type='text'
            name='username'
            value={values.username}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor='password'>Пароль:</Label>
          <Validation isActive={!!errors.password}>
            {errors.password}
          </Validation>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </InputWrapper>
      </Inputs>
      <ServerValidation isActive={!!serverError}>
        {serverError}
      </ServerValidation>
      <button type='submit'>Войти</button>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-end;
  width: 150px;
  height: 200px;
`

const Validation = styled.div`
  opacity: ${props => (props.isActive ? css`1` : css`0`)};
  color: red;
  font-size: 14px;
  min-height: 20px;
  transition: all 0.15s ease-in-out;
`

const Inputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  display: block;
`

const InputWrapper = styled.div`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`

const ServerValidation = styled(Validation)`
  align-self: flex-start;
`

const Label = styled.label``

export default AuthForm
