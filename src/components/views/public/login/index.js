import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import {
  selectors as sessionSelectors,
} from 'redux/modules/session'
import { actions as sessionActions } from 'redux/modules/session'
import {
  LoginIllustration,
  iTranslateLogo,
} from 'assets/images'
import { Input, Button } from 'components/ui'

const { TextInput } = Input

const PageContainer = styled(Flex)`
  height: 100vh;
  width: 100vw;
`

const LoginContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Logo = styled.img`
  height: 50px;
  width: 50px;
  text-shadow: 1px 2px 4px black;
`

const H1 = styled.h1`
  text-align: center;
  margin: 20px 0 20px 0;
`

const H4 = styled.h4`
  font-weight: 100;
  text-align: center;
  margin: 20px 0 20px 0;
`

const FormContainer = styled(Flex)`
  padding: 100px 50px;
  flex: 1;
`

const Form = styled.form`
  height: 100%;
  width: 75%;
`

const Label = styled.h5`

`

const InputContainer = styled.div`
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 40px;
  z-index: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  transition: .3s ease-out;
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;  left: 0;  right: 0;  bottom: 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.brand};
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform .3s ease-out;
  }
  ${props => props.selected && `
    & {
      border-bottom: 2px solid transparent;
      transition: .3s ease-out;
    }
    &:after {
      transform: scaleX(1);
    }
  `}
`

const AuthInput = styled(TextInput)`
  padding: 0;
  border: none !important;
  border-radius: 0 !important;
  &:focus {
    border: none !important;
    box-shadow: none;
  }
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.brand};
  border: none;
  padding: 0 20px;
  span {
    color: white;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.brand};
    box-shadow: ${({ theme }) => theme.shadow.flat};
  }
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.brand};
  margin-left: 5px;
  &:hover {
    color: ${({ theme }) => theme.colors.brand};
  }
`

const IllustrationContainer = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Illustration = styled.img`
  height: 500px;
  width: 500px;
`

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      emailSelected: false,
      password: '',
      passwordSelected: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  successfulLogin = () => {
    this.props.history.push('/')
    this.setState({ email: '', password: '' })
  }

  errorLogin = () => (
    this.setState({ password: '' })
  )

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.login(email, password, this.successfulLogin, this.errorLogin)

  }

  render() {
    return (
      <PageContainer>
        <LoginContainer width={2/5}>
          <Box mt={20} ml={40}>
            <Link to='/'>
              <Logo src={iTranslateLogo} />
            </Link>
          </Box>
          <H1>iTranslate</H1>
          <H4>Welcome back!</H4>
          <FormContainer
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
          >
            <Form onSubmit={() => alert('test')}>
              <Label>Email</Label>
              <InputContainer selected={this.state.emailSelected}>
                <AuthInput
                  placeholder='michelthomas@gmail.com'
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  onFocus={() => this.setState({ emailSelected: true })}
                  onBlur={() => this.setState({ emailSelected: false })}
                />
              </InputContainer>
              <Label>Password</Label>
              <InputContainer selected={this.state.passwordSelected}>
                <AuthInput
                  type='password'
                  placeholder='••••••••'
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  onFocus={() => this.setState({ passwordSelected: true })}
                  onBlur={() => this.setState({ passwordSelected: false })}
                />
              </InputContainer>
              <Flex justifyContent='flex-end'>
                <StyledButton
                  onClick={this.handleSubmit}
                  loading={this.props.isLoggingIn}
                >
                  Log In
                </StyledButton>
              </Flex>
            </Form>
            <Flex justifyContent='flex-end' width={3/4}>
              <p>Don't have an account yet?</p>
              <StyledLink to='/register'>Sign Up</StyledLink>
            </Flex>
          </FormContainer>
        </LoginContainer>
        <IllustrationContainer width={3/5}>
          <Illustration src={LoginIllustration} />
        </IllustrationContainer>
      </PageContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password, success, error) => (
    dispatch(sessionActions.loginStart(email, password, success, error))
  ),
})

const mapStateToProps = state => ({
  isLoggedIn: sessionSelectors.isLoggedIn(state),
  isLoggingIn: sessionSelectors.isLoggingIn(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
