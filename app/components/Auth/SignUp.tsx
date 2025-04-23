// 'use client'
// import React, { FC, useEffect, useState } from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub } from 'react-icons/ai';
// import { FcGoogle } from 'react-icons/fc';
// import { formStyles } from '../../../app/styles/styles';
// import { useRegisterMutation } from '@/redux/features/auth/authApi';
// import toast from 'react-hot-toast';
// import { signIn } from 'next-auth/react';


// interface Props {
//   setRoute: (route: string) => void;
// }

// const schema = Yup.object().shape({
//   name: Yup.string().required("Please enter your name!").min(4),
//   email: Yup.string().email("Invalid email!").required("Please enter your email!"),
//   password: Yup.string().required("Please enter your password!").min(6).matches(
//     /^(?=.*[a-z])/,
//     "Must Contain One Lowercase Character(a-z)"
//   )
//   .matches(
//     /^(?=.*[A-Z])/,
//     "Must Contain One Uppercase Character(A-Z)"
//   )
//   .matches(
//     /^(?=.*[0-9])/,
//     "Must Contain One Number Character(0-9)"
//   )
//   .matches(
//     /^(?=.*[!@#\$%\^&\*])/,
//     "  Must Contain One Special Case Character($,#,&,*)"
//   ),

// })

// const SignUp:FC<Props> = ({setRoute}) => {
//   const [show,setShow] = useState(false);
//   const [register,{isSuccess,data,error,isLoading}] = useRegisterMutation();

// useEffect(()=>{
//   if(isSuccess){
//     const message = data?.message || 'Registration successful';
//    toast.success(message);
//    setRoute('Verification');
//   }
//   if(error){
//     if("data" in error){
//       const errorData = error as any ;
//       toast.error(errorData.data.message);
//     }
//    }
//   }, [isSuccess,error]);

//   const formik = useFormik({
//     initialValues: {name:'',email:'',password:''},
//     validationSchema: schema,
//     onSubmit: async({name,email,password})=>{
//       const data = {
//         name,email,password
//       };
//      await register(data);
//     }
//   })

//   const {errors,touched,values,handleChange,handleSubmit} = formik

//   return (
//     <div className='w-full'>
//       <h1 className={`${formStyles.title} text-myPrimary`}>
//         Signup to Vitalinc 
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//       <label 
//         className={`${formStyles.label}`}
//         htmlFor='email'
//         >
//          Enter your Name
//         </label>
//         <input 
//             type="text" 
//             name='' 
//             value={values.name} 
//             onChange={handleChange} 
//             id='name' 
//             placeholder='johndoe' 
//             className={`${errors.name && touched.name && 'border-red-500'} 
//             ${formStyles.input}
//             `}
//             />
//             {errors.name && touched.name && (
//               <span className='text-red-500 pt-2 block'>{errors.name}</span>
//             )}
//             </div>
//         <label 
//         className={`${formStyles.label}`}
//         htmlFor='email'
//         >
//          Enter your Email
//         </label>
//         <input 
//             type="text" 
//             name='' 
//             value={values.email} 
//             onChange={handleChange} 
//             id='email' 
//             placeholder='loginmail@gmail.com' 
//             className={`${errors.email && touched.email && 'border-red-500'} 
//             ${formStyles.input}
//             `}
//             />
//             {errors.email && touched.email && (
//               <span className='text-red-500 pt-2 block'>{errors.email}</span>
//             )}
//             <div className='mt-5 relative mb-1'>
//             <label 
//             className={`${formStyles.label}`}
//             htmlFor='password'
//            >
//          Enter your password
//         </label>
//         <div className='relative'>
//         <input 
//             type={!show ? 'password' : 'text'}
//             name='password' 
//             value={values.password} 
//             onChange={handleChange} 
//             id='password' 
//             autoComplete="new-password"
//             placeholder='password!@%' 
//             className={`${errors.password && touched.password && 'border-red-500'} 
//             ${formStyles.input} pr-8
//             `}
//             />
//             {!show ? (
//               <AiOutlineEyeInvisible 
//               className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//               onClick={() => setShow(true)} 
//               size={20}
//               />
//             ) : (
//               <AiOutlineEye
//               className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//               onClick={() => setShow(false)} 
//               size={20}
//               />
//             )
//             }
//             </div>
//             {errors.password && touched.password && (
//               <span className='text-red-500 pt-2 block'>{errors.password}</span>
//             )}
//         </div>
 
//             <input type="submit" value={isLoading ?'Loading...':'Sign Up'} className={`${formStyles.button} !bg-myPrimary`} />
//        <br />
//        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
//         Or join with
//        </h5>
//        <div className='flex items-center justify-center my-3'>
//         <FcGoogle size={30} className='cursor-pointer mr-2' 
//         onClick={() => signIn('google')}
//         />
//         <AiFillGithub size={30} className='cursor-pointer ml-2' 
//         onClick={() => signIn('github')}
//         />
//        </div>
//        <h5 className='text-center pt-4 font-Poppins text-[14px]'>
//         Already have an account?{" "}
//         <span 
//           className='text-myPrimary pl-1 cursor-pointer'
//           onClick={()=> setRoute('Login')}
//           >
//           Sign in
//         </span>
//        </h5>
//       </form>
//       <br />
//     </div>
//   )
// }

// export default SignUp




'use client'
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Github, User, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Props {
  setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!").min(4),
  email: Yup.string().email("Invalid email!").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(8)
    .matches(/^(?=.*[a-z])/, "Must contain one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain one number")
})

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { isSuccess, data, error, isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration successful';
      toast.success(message);
      setRoute('Verification');
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name, email, password
      };
      await register(data);
    }
  })

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <User className="mx-auto h-12 w-12 text-myPrimary" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Create an Account</h1>
        <p className="mt-2 text-sm text-gray-600">Sign up to get started with Vitalinc</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              className={`${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} pl-10`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && touched.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className={`${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} pl-10`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && touched.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type={show ? 'text' : 'password'}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className={`${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} pl-10 pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {show ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <Button type="submit" className="w-full bg-myPrimarys hover:bg-myPrimary text-white transition-colors" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="w-full" onClick={() => signIn('google')}>
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() => signIn('github')}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button onClick={() => setRoute('Login')} className="font-medium text-myPrimarys hover:text-myPrimary transition-colors">
          Sign in
        </button>
      </p>
    </div>
  )
}

export default SignUp

