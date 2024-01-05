import React, { useCallback, useState } from 'react'
import { FaSave, FaEdit, FaWindowClose } from 'react-icons/fa'
function UserComment () {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('This movie is pretty bad... KYS Love!!')
  const handleEditButton = useCallback(() => { setEdit(true) }, [])
  const handleSaveButton = useCallback(() => { setEdit(false) }, [])
  const changeText = useCallback((e) => { setText(e.target.value) }, [])

  return <div className="border-[2px] rounded-b-xl p-2 hover:bg-cyan-800 border-cyan-700 text-white">
    <div className="flex flex-row text-blue-500">
      <h3 >Movie</h3>
      <div className="flex-1"/>
      <span>19/10/2023</span>
    </div>
    {(edit && <input className="text-cyan-700 focus:outline-none w-full" type='text' value={text} onChange={changeText}/>) || <p className="w-full truncate">{text}</p>}
    <div className="flex justify-end text-xl gap-2 pt-1">
      {(!edit && <FaEdit onClick={handleEditButton} className="cursor-pointer"/>) || <FaSave onClick={handleSaveButton} className="cursor-pointer"/>}
      <FaWindowClose className="cursor-pointer"/>
    </div>
  </div>
}

export default UserComment
