import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'
function Categories () {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = useCallback(() => {
    setShowMenu(!showMenu)
  }, [showMenu])

  return <div className="text-purple-400 text-xl">
      <h1 className="text-3xl flex items-center" onClick={handleMenuClick}>Categories
            <TiThMenu/>
      </h1>
      {showMenu && <ul className="p-4 flex justify-around text-2xl flex-row border-purple-300 border-b-2">
          <li>
              <Link className="hover:underline" to={'/'}>Action</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Adventure</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Horror</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Science fiction</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Fantasy</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Drama</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Comedy</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Documentary</Link>
          </li>
          <li>
              <Link className="hover:underline" to={'/'}>Romance</Link>
          </li>
      </ul>}
  </div>
}

export default Categories
