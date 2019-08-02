import React from 'react'
import { connect } from 'react-redux'

import { signIn } from 'store/user'

import AuthForm from 'modules/authorization/authForm'

function App({ signIn, profile }) {
  console.log(profile[0])

  return (
    <div className='App'>
      <h1>Hello,{Object.values(profile)}</h1>
      <AuthForm onSend={signIn} />
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)

  return {
    profile: state.user.profile,
    isLoading: state.user.isLoading
  }
}

const mapDispatchToProps = {
  signIn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
