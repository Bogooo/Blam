import React, { useState } from 'react'
import { getPath } from '../../../route/RouteObject'
import { Link } from 'react-router-dom'

function Header () {
  const [logged, setLogged] = useState(false)

  return (
        <div className="bg-gray-900 w-full text-slate-300 flex flex-row flex-wrap items-center p-4 text-3xl">
             <nav className="space-x-2 pr-4">
                <Link className="cursor-pointer hover:underline text-violet-400" to={getPath('home')}>
                    ALB Movies
                </Link>
             </nav>
            <div className="flex flex-grow" />
            <input type="text" className="w-8/12 focus:outline-none focus:border-4 rounded text-violet-500 border-violet-500"/>
            <div className="flex flex-grow" />
            {!logged && <button className="rounded-xl text-white bg-violet-500 p-2 w-1/12 text-center cursor-pointer" onClick={() => setLogged(true)}>Login</button>}
            {logged && <div className="rounded-xl text-white bg-violet-500 p-2 w-1/12 text-center cursor-pointer" onClick={() => setLogged(false)}>User</div>}
        </div>
  )
}

export default Header
