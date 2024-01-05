import React, { useState } from 'react'
import UserEdit from '../../generics/UserEdit'
import UsersList from '../../generics/UsersList'

const initialUser = {
  id: -1,
  name: '',
  email: '',
  admin: false,
  password: ''
}
function AdminPage () {
  const [user, setUser] = useState(initialUser)
  const [refresh, setRefresh] = useState(false)

  return <div className="w-full flex flex-row overflow-hidden">
      <div className="w-2/3 p-10">
          <h1 className="text-blue-500 text-5xl underline">Users</h1>
          <UsersList setUser={setUser} setRefresh={setRefresh} refresh={refresh}/>
      </div>
      <div className="w-1/3 p-10">
        <UserEdit user={user} setRefresh={setRefresh}/>
      </div>
  </div>
}

export default AdminPage
