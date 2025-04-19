import { formStyles } from '@/app/styles/styles'
import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';


interface Props {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) =>  void;
  }
  
 const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
  })
  
const ForgotPassword:FC<Props> = ({setRoute}) => {

  const [forgotPassword,{isSuccess,data,error}] = useForgotPasswordMutation();

    const formik = useFormik({
        initialValues: {email:""},
        validationSchema: schema,
        onSubmit: async(email)=>{
         await forgotPassword(email);
        }
      })

      useEffect(() => {
        if(isSuccess){
          const message = data?.message || 'Reset password Otp send successful';
          toast.success(message);
          setRoute('Accept-Password-Otp')
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
         Forgot your password?
      </h1>
      <form onSubmit={handleSubmit}>
        <label 
        className={`${formStyles.label}`}
        htmlFor='email'
        >
         Enter your Email
        </label>
        <input 
            type="text" 
            name='' 
            value={values.email} 
            onChange={handleChange} 
            id='email' 
            placeholder='loginmail@gmail.com' 
            className={`${errors.email && touched.email && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {errors.email && touched.email && (
              <span className='text-red-500 pt-2 block'>{errors.email}</span>
            )}
 
            <input type="submit" value='Send me reset password instructions' className={`${formStyles.button} !bg-myPrimary`} />
       <br />
       <h5 className='text-center pt-4 font-Poppins text-[14px]'>
            {" "}
        <span 
          className='text-myPrimary pl-1 cursor-pointer'
          onClick={()=> setRoute('Login')}
          >
          Back to login
        </span>
       </h5>
      </form>
      <br />
    </div>
  )
}

export default ForgotPassword