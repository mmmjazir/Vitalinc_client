// import React, { FC, useState,useEffect } from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub } from 'react-icons/ai';
// import { FcGoogle } from 'react-icons/fc';
// import { formStyles } from '../../../app/styles/styles';
// import { useLoginMutation } from '@/redux/features/auth/authApi';
// import toast from 'react-hot-toast';
// import { signIn } from 'next-auth/react';

// interface Props {
//   setRoute: (route: string) => void;
//   setOpen: (open: boolean) =>  void;
//   refetch: any;
// }

// const schema = Yup.object().shape({
//   email: Yup.string().email("Invalid email!").required("Please enter your email!"),
//   password: Yup.string().required("Please enter your password!").min(6),
// })

// const Login:FC<Props> = ({setRoute,setOpen,refetch}) => {
//   const [show,setShow] = useState(false);
//   const [login,{isSuccess,error}] = useLoginMutation();

//   const formik = useFormik({
//     initialValues: {email:"",password:""},
//     validationSchema: schema,
//     onSubmit: async({email,password})=>{
//      await login({email,password})
//     }
//   })

//  useEffect(() => {
//    if(isSuccess){
//      toast.success('Login Successful');
//      setOpen(false);
//      refetch();
//    }
//    if(error){
//     if("data" in error){
//       const errorData = error as any ;
//       toast.error(errorData.data.message);
//     }
//    }
//  }, [isSuccess,error])
 

//   const {errors,touched,values,handleChange,handleSubmit} = formik

//   return (
//     <div className='w-full'>
//       <h1 className={`${formStyles.title} text-myPrimary`}>
//         Login with Vitalinc
//       </h1>
//       <form onSubmit={handleSubmit}>
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
//          <h5 onClick={()=> setRoute('Forgot-Password')} className='text-myPrimary flex justify-end cursor-pointer pr-2'>Forgot password?</h5>
//             <input type="submit" value='Login' className={`${formStyles.button} !bg-myPrimary`} />
//        <br />
//        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
//         Or join with
//        </h5>
//        <div className='flex items-center justify-center my-3'>
//         <FcGoogle size={30} className='cursor-pointer mr-2' 
//          onClick={() => signIn('google')}
//         />
//         <AiFillGithub size={30} className='cursor-pointer ml-2' 
//         onClick={() => signIn('github')}
//         />
//        </div>
//        <h5 className='text-center pt-4 font-Poppins text-[14px]'>
//         Not have any account?{" "}
//         <span 
//           className='text-myPrimary pl-1 cursor-pointer'
//           onClick={()=> setRoute('Sign-Up')}
//           >
//           Sign up
//         </span>
//        </h5>
//       </form>
//       <br />
//     </div>
//   )
// }

// export default Login



"use client"
import React, { FC, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Github, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { signIn } from 'next-auth/react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6)
})

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

    const searchParams:any = useSearchParams()
  const redirectRoute = searchParams.get("redirect")
  const router = useRouter()

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login Successful');
      setOpen(false);
      refetch();
      if(redirectRoute !== null || undefined){
        router.push(`${redirectRoute}`)    
      }
    
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error])

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <Lock className="mx-auto h-12 w-12 text-myPrimary" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
          </div>
          <button
            type="button"
            onClick={() => setRoute('Forgot-Password')}
            className="text-sm font-medium text-myPrimarys hover:text-myPrimary transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" className="w-full bg-myPrimarys hover:bg-myPrimary text-white transition-colors">
          Sign in
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
        Don&apos;t have an account?{' '}
        <button onClick={() => setRoute('Sign-Up')} className="font-medium text-myPrimarys hover:text-myPrimary transition-colors">
          Sign up
        </button>
      </p>
    </div>
  )
}

export default Login

