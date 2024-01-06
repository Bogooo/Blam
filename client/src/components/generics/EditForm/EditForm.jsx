import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editAction } from '../../../store/actions/userActions'

const schema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required').matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/,
    'Invalid password format'
  ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

EditForm.propTypes = {
  close: PropTypes.func.isRequired
}

function EditForm ({ close }) {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    dispatch(editAction(data))
  }

  return (
        <div className="rounded-xl bg-slate-50 absolute top-24 right-4">
            <div onClick={close} className="text-2xl text-white bg-violet-800 rounded-t-xl" style={{ cursor: 'pointer' }}>-</div>
            <form className="flex flex-col gap-2 text-xl text-violet-500 p-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label className="text-left">Username:</label>
                    <input className="rounded focus:outline-none" placeholder="New username..." {...register('username')} />
                    {(errors.username && <span className="text-pink-600 text-sm">{errors?.username.message}</span>) ||
                        <div className="h-5" />}
                </div>
                <div className="flex flex-col">
                    <label className="text-left">Password:</label>
                    <input type='password' className="rounded focus:outline-none" placeholder="New password" {...register('password')} />
                    {(errors.password && <span className="text-pink-600 text-sm">{errors?.password.message}</span>) ||
                        <div className="h-5" />}
                </div>
                <div className="flex flex-col">
                    <label className="text-left">Confirm Password:</label>
                    <input type='password' className="rounded focus:outline-none" placeholder="Confirm new password" {...register('confirmPassword')} />
                    {(errors.confirmPassword && <span className="text-pink-600 text-sm">{errors?.confirmPassword.message}</span>) ||
                        <div className="h-5" />}
                </div>
                <Button isLoading={isLoading} className="p-3 bg-violet-500 rounded-xl text-white focus:outline-none">Modify</Button>
                {(error && <span className="text-pink-600 text-sm">Something went wrong...</span>) ||
                    <div className="h-5" />}
            </form>
        </div>
  )
}

export default EditForm
