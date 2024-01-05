import React, { useEffect, useState } from 'react'
import UserView from '../UserView'
import ApiClient from '../../../libs/api/ApiClient'
import PropTypes from 'prop-types'

UsersList.propTypes = {
  setUser: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired
}
function UsersList ({ setUser, refresh }) {
  // const users2 = [<UserView key={1}/>, <UserView key={2}/>, <UserView key={3}/>, <UserView key={4}/>, <UserView key={5}/>, <UserView key={6}/>, <UserView key={7}/>, <UserView key={8}/>, <UserView key={9}/>, <UserView key={10}/>, <UserView key={11}/>, <UserView key={12}/>, <UserView key={13}/>, <UserView key={14}/>, <UserView key={15}/>, <UserView key={16}/>, <UserView key={17}/>, <UserView key={18}/>, <UserView key={19}/>]
  const [users, setUsers] = useState([])
  const renderedUsers = users.map((user, index) => {
    return <UserView key={index} onClick={() => setUser(user)} />
  })

  useEffect(async () => {
    const res = await ApiClient.getUsers()
    if (res) {
      setUsers(res)
    }
  }, [refresh])

  return <div className="h-[95%] overflow-y-auto scrollbar scrollbar-thumb-cyan-950 scrollbar-thumb-rounded-full">
      {renderedUsers}
  </div>
}

export default UsersList
