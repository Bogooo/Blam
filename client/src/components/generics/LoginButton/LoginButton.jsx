import React, { useCallback, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import EditForm from '../EditForm'
import { useSelector } from 'react-redux'
import logoutImage from '../../../assets/logout.png'

function LoginButton () {
  const { isAuthorized } = useSelector(state => state.user)
  const [setSettings] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const handleLogin = useCallback(() => {
    setShowLogin(true)
    setShowRegister(false)
    setShowEdit(false)
  }, [])

  const handleRegister = useCallback(() => {
    setShowLogin(false)
    setShowRegister(true)
    setShowEdit(false)
  }, [])

  const handleEdit = useCallback(() => {
    setShowLogin(false)
    setShowRegister(false)
    setShowEdit(true)
  }, [])

  const handleSettings = useCallback(() => {
    setSettings(true)
  }, [])

  const handleLogout = useCallback(() => {
    setShowLogin(false)
    setShowRegister(false)
    setShowEdit(false)
    // Implementează aici logica pentru logout
    // Exemplu: dispatch(logoutAction());
  }, [])

  return (
      <div className="w-2/12 rounded-xl text-2xl text-white bg-violet-500 p-2 text-center">
        {!isAuthorized && (
            <div className="flex flex-row justify-evenly items-center">
              <button className="hover:underline" onClick={handleLogin}>
                Login
              </button>
              |
              <button className="hover:underline" onClick={handleRegister}>
                Register
              </button>
              |
              <button className="hover:underline" onClick={handleEdit}>
                Edit
              </button>
              |
              <button onClick={handleLogout}>
                <img src={logoutImage} alt="logout" style={{ width: '28px', height: '28px' }} />
              </button>
            </div>
        )}
        {isAuthorized && (
            <div className="flex flex-row items-center gap-2">
              <FaUser />
              Username
              <div className="flex-1" />
              <BsThreeDotsVertical className="cursor-pointer" onClick={handleSettings} />
            </div>
        )}
        {showLogin && <LoginForm close={() => setShowLogin(false)} />}
        {showRegister && <RegisterForm close={() => setShowRegister(false)} />}
        {showEdit && <EditForm close={() => setShowEdit(false)} />}
      </div>
  )
}

export default LoginButton
