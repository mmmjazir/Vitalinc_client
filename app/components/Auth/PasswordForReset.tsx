import React, { FC, useState,useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { formStyles } from '../../../app/styles/styles';
import toast from 'react-hot-toast';
import { usePasswordForResetMutation } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';


interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) =>  void;
}

const schema = Yup.object().shape({
  newPassword: Yup.string().required("Please enter your password!").min(6).matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character(a-z)")
  .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character(A-Z)")
  .matches(/^(?=.*[0-9])/, "Must Contain One Number Character(0-9)")
  .matches(
    /^(?=.*[!@#\$%\^&\*])/,
    "Must Contain One Special Case Character($,#,&,*)"
  ),
  confirmPassword: Yup.string()
  .required("Please confirm your password!")
  .oneOf([Yup.ref("newPassword")], "Passwords must match")
  .min(6),
})

const PasswordForReset:FC<Props> = ({setRoute,setOpen}) => {
  const [show,setShow] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [passwordForReset,{isSuccess,data,error}] = usePasswordForResetMutation();
  const {ResetPasswordToken} = useSelector((state:any) => state.auth);
  const formik = useFormik({
    initialValues: {newPassword:"",confirmPassword:""},
    validationSchema: schema,
    onSubmit: async({newPassword,confirmPassword})=>{
     await passwordForReset({newPassword,confirmPassword,ResetPasswordToken})
    }
  })

 useEffect(() => {
   if(isSuccess){
    const message = data?.message;
     toast.success(message);
    setRoute('Login')
    }
   if(error){
    if("data" in error){
      const errorData = error as any ;
      toast.error(errorData.data.message);
    }
   }
 }, [isSuccess,error])
 

  const {errors,touched,values,handleChange,handleSubmit} = formik

  return (
    <div className='w-full'>
      <h1 className={`${formStyles.title}`}>
        Set your new password
      </h1>
      <form onSubmit={handleSubmit}>
          <div className='mt-5 relative mb-1'>
            <label 
            className={`${formStyles.label}`}
            htmlFor='password'
           >
         Enter your New password
        </label>
        <div className='relative'>
        <input 
            type={!show ? 'password' : 'text'}
            name='newPassword' 
            value={values.newPassword} 
            onChange={handleChange} 
            id='newPassword' 
            autoComplete="new-password"
            placeholder='password!@%' 
            className={`${errors.newPassword && touched.newPassword && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {!show.newPassword ? (
              <AiOutlineEyeInvisible 
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow(prev => ({...prev, newPassword: true}))} 
              size={20}
              />
            ) : (
              <AiOutlineEye
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow((prev) => ({...prev, newPassword: false}))} 
              size={20}
              />
            )
            }
            </div>
            {errors.newPassword && touched.newPassword && (
              <span className='text-red-500 pt-2 block'>{errors.newPassword}</span>
            )}

          <label 
            className={`${formStyles.label}`}
            htmlFor='password'
           >
         Confirm your New password
        </label>
        <div className='relative'>
        <input 
            type={!show ? 'password' : 'text'}
            name='confirmPassword' 
            value={values.confirmPassword} 
            onChange={handleChange} 
            id='confirmPassword' 
            autoComplete="confirm-password"
            placeholder='password!@%' 
            className={`${errors.confirmPassword && touched.confirmPassword && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {!show ? (
              <AiOutlineEyeInvisible 
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow(prev => ({...prev, confirmPassword: true}))} 
              size={20}
              />
            ) : (
              <AiOutlineEye
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow((prev) => ({...prev, confirmPassword: false}))} 
              size={20}
              />
            )
            }
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className='text-red-500 pt-2 block'>{errors.confirmPassword}</span>
            )}
        </div>
        
            <input type="submit" value='Reset Password' className={`${formStyles.button}`} />
       <br />
      
       <h5 className='text-center pt-4 font-Poppins text-[14px]'>
        {" "}
        <span 
          className='text-primary pl-1 cursor-pointer'
          onClick={()=> setRoute('Login')}
          >
          Back to Signin?
        </span>
       </h5>
      </form>
      <br />
    </div>
  )
}

export default PasswordForReset;