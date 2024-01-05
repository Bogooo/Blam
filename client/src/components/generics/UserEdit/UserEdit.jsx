import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import UserCommentsList from '../UserCommentsList'
import PropTypes from 'prop-types'
import Button from '../Button'
import ApiClient from '../../../libs/api/ApiClient'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email('Invalid email format').matches(
    // Regular expression for validating email addresses
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    'Invalid email format'
  ),
  pass: yup.string().required().min(8, 'Password must be at least 8 characters').matches(
    // Regular expression for validating password criteria
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/,
    'Invalid password format: Minimum 8 characters, at least one uppercase letter, one number, and one special character'
  ),
  isAdmin: yup.bool()
}).required()

UserEdit.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
}
const initialUser = {
  id: -1,
  name: '',
  email: '',
  admin: false,
  password: ''
}

function UserEdit ({ selectedUser, setRefresh }) {
  const [user, setUser] = useState(initialUser)
  const [load, setLoad] = useState(false)
  const [create, setCreate] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = useCallback(async (obj) => {
    if (create) {
      setLoad(true)
      await ApiClient.register({
        name: obj.name,
        email: obj.email,
        password: obj.password,
        confirmed_password: obj.password
      })
      setLoad(false)
    } else {
      setLoad(true)
      await ApiClient.updateUserByAdmin({
        user,
        name: obj.name,
        email: obj.email,
        password: obj.password,
        confirmed_password: obj.password
      })
      setLoad(false)
    }
  }, [create])

  if (selectedUser != null) {
    setUser(selectedUser)
  }

  const handleClear = useCallback(() => { setUser(initialUser) }, [])
  const handleDelete = useCallback(async () => {
    if (user.id >= -1) {
      setLoad(true)
      await ApiClient.deleteUser(user?.id)
      setLoad(false)
    }
  }, [user])

  return <div className="border-4 rounded-xl border-cyan-600 bg-slate-950 p-10 h-full">
    <h2 className="text-3xl text-blue-500 underline my-2">Account</h2>
    <form className="flex flex-col gap-2 text-xl text-cyan-800" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" defaultValue={user.name} {...register('name')} />
          {(errors.name && <span className="text-pink-600 text-sm">Username required</span>) || <div className="h-5"/>}
        </div>

        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" defaultValue={user.email} {...register('email')} />
          {(errors.email && <span className="text-pink-600 text-sm">Email required</span>) || <div className="h-5"/>}
        </div>

        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" defaultValue={user.password} {...register('pass')} />
          {(errors.pass && <span className="text-pink-600 text-sm">Password required</span>) || <div className="h-5"/>}
        </div>

        <div>
          <label className="text-white pr-2">Admin</label>
          <input className="" defaultValue={user.admin} type="checkbox" {...register('isAdmin')}/>
        </div>
        <div className="flex flex-wrap justify-around text-black text-center w-full">
          <Button type={'button'} className="p-3 bg-cyan-300 rounded-xl focus:outline-none" onClick={handleClear}>Clear</Button>
          <Button isLoading={load} type={'submit'} onClick={() => setCreate(true)} className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Create</Button>
          <Button type={'button'} onClick={handleDelete} isLoading={load} className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Delete</Button>
          <Button isLoading={load} type={'submit'} onClick={() => setCreate(false)} className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Save</Button>
        </div>
    </form>

    <h2 className="text-3xl text-blue-500 underline my-2">Reviews</h2>
    <div className="h-1/2">
        <UserCommentsList/>
    </div>

  </div>
}

export default UserEdit
