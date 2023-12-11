import React from 'react'
import UserView from '../UserView'
function UsersList () {
  const users = [<UserView key={1}/>, <UserView key={2}/>, <UserView key={3}/>, <UserView key={4}/>, <UserView key={5}/>, <UserView key={6}/>, <UserView key={7}/>, <UserView key={8}/>, <UserView key={9}/>, <UserView key={10}/>, <UserView key={11}/>, <UserView key={12}/>, <UserView key={13}/>, <UserView key={14}/>, <UserView key={15}/>, <UserView key={16}/>, <UserView key={17}/>, <UserView key={18}/>, <UserView key={19}/>]

  return <div className="h-[95%] overflow-y-auto scrollbar scrollbar-thumb-cyan-950 scrollbar-thumb-rounded-full">
      {users}
  </div>
}

export default UsersList
