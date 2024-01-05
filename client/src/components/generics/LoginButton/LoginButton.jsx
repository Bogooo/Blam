import React, { useCallback, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import { useSelector } from 'react-redux'
function LoginButton () {
  const { isAuthorized } = useSelector(state => state.user)
  const [settings, setSettings] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  console.log(settings, showRegister)

  const handleLogin = useCallback(() => {
    setShowLogin(true)
    setShowRegister(false)
  }, [])

  const handleRegister = useCallback(() => {
    setShowLogin(false)
    setShowRegister(true)
  }, [])

  const handleSettings = useCallback(() => {
    setSettings(true)
  }, [])

  return <div className="w-2/12 rounded-xl text-2xl text-white bg-violet-500 p-2 text-center">
      {!isAuthorized && <div className="flex flex-row justify-evenly items-center">
          <button className="hover:underline" onClick={handleLogin}>Login</button>
        |
          <button className="hover:underline" onClick={handleRegister}>Register</button>
      </div>}
      {isAuthorized && <div className="flex flex-row items-center gap-2">
          <FaUser/>
          Username
          <div className="flex-1"/>
          <BsThreeDotsVertical className="cursor-pointer" onClick={handleSettings}/>
      </div>}
    {
      showLogin &&
        <LoginForm close={() => setShowLogin(false)}/>
    }
    {
        showRegister &&
        <RegisterForm close={() => setShowRegister(false)}/>
    }

  </div>
}

export default LoginButton
