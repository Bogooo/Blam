import React from 'react'
import UserComment from '../UserComment'
function UserCommentsList () {
  const comms = [<UserComment key={1}/>, <UserComment key={2}/>, <UserComment key={3}/>, <UserComment key={4}/>, <UserComment key={5}/>, <UserComment key={6}/>, <UserComment key={7}/>, <UserComment key={8}/>, <UserComment key={9}/>, <UserComment key={10}/>, <UserComment key={11}/>, <UserComment key={12}/>, <UserComment key={13}/>, <UserComment key={14}/>, <UserComment key={15}/>, <UserComment key={16}/>, <UserComment key={17}/>, <UserComment key={18}/>, <UserComment key={19}/>]

  return <div className="h-full space-y-2 p-2 overflow-y-auto scrollbar scrollbar-thumb-cyan-950 scrollbar-thumb-rounded-full">
    {comms}
  </div>
}

export default UserCommentsList
