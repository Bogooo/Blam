import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import UserCommentsList from '../UserCommentsList'

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
    pass: yup.string().required(),
    isAdmin: yup.bool()
  })
  .required()

function UserEdit () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = useCallback((obj) => console.log(obj), [])

  return <div className="border-4 rounded-xl border-cyan-600 bg-slate-950 p-10 h-full">
    <h2 className="text-3xl text-blue-500 underline my-2">Account</h2>
    <form className="flex flex-col gap-2 text-xl text-cyan-800" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" defaultValue="Username" {...register('name')} />
          {(errors.name && <span className="text-pink-600 text-sm">Username required</span>) || <div className="h-5"/>}
        </div>

        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" {...register('email')} />
          {(errors.email && <span className="text-pink-600 text-sm">Email required</span>) || <div className="h-5"/>}
        </div>

        <div className="flex flex-col">
          <input className="rounded  focus:outline-none" {...register('pass')} />
          {(errors.pass && <span className="text-pink-600 text-sm">Password required</span>) || <div className="h-5"/>}
        </div>

        <div>
          <label className="text-white pr-2">Admin</label>
          <input className="" type="checkbox" {...register('isAdmin')}/>
        </div>
        <div className="flex flex-wrap justify-around text-black text-center w-full">
          <button className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Clear</button>
          <button className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Create</button>
          <button className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Delete</button>
          <button className="p-3 bg-cyan-300 rounded-xl focus:outline-none">Save</button>
        </div>
    </form>

    <h2 className="text-3xl text-blue-500 underline my-2">Reviews</h2>
    <div className="h-1/2">
        <UserCommentsList/>
    </div>

  </div>
}

export default UserEdit
