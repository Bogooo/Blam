import React from 'react'
import UserEdit from '../../generics/UserEdit'
import UsersList from '../../generics/UsersList'
function AdminPage () {
  return <div className="w-full flex flex-row overflow-hidden">
      <div className="w-2/3 p-10">
          <h1 className="text-blue-500 text-5xl underline">Users</h1>
          <UsersList/>
      </div>
      <div className="w-1/3 p-10">
        <UserEdit/>
      </div>
  </div>
}

export default AdminPage
