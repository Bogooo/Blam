import React, { useCallback, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
function LoginButton () {
  const [logged, setLogged] = useState(false)
  const [settings, setSettings] = useState(false)
  console.log(settings)
  const handleSettings = useCallback(() => {
    setSettings(true)
  }, [])

  return <div className="w-2/12 rounded-xl text-2xl text-white bg-violet-500 p-2 text-center">
      {!logged && <div className="flex flex-row justify-evenly items-center">
          <button className="hover:underline" onClick={() => setLogged(true)}>Login</button>
        |
          <button className="hover:underline" onClick={() => setLogged(true)}>Register</button>
      </div>}
      {logged && <div className="flex flex-row items-center gap-2" onClick={() => setLogged(false)}>
          <FaUser/>
          Username
          <div className="flex-1"/>
          <BsThreeDotsVertical className="cursor-pointer" onClick={handleSettings}/>
      </div>}

  </div>
}

export default LoginButton
