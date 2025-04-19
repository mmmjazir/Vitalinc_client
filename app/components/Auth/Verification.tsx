import { formStyles } from '@/app/styles/styles';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react'
import {toast} from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';


interface Props {
  setRoute: (route:string) => void
}

interface VerifyNumber{
  "0":string;
  "1":string;
  "2":string;
  "3":string;
}

const Verification:FC<Props> = ({ setRoute }) => {
  const {token} = useSelector((state: any) => state.auth);
  const [activation,{isSuccess,error}] = useActivationMutation();
 const [invalidError,setInvalidError] = useState<boolean>(false);
  

 useEffect(()=>{
   if(isSuccess){
    toast.success('Account activated successfully');
    setRoute('Login')
   }
   if(error){
    if('data' in error){
      setInvalidError(true)
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
   }
 },[isSuccess,error])
 
 const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0:"",
    1:"",
    2:"",
    3:"",
  })

  const verificationHandler = async ()=> {
   const verificationNumber = Object.values(verifyNumber).join('');
   if(verificationNumber.length !== 4){
     setInvalidError(true);
     return;
   }
   await activation({
    activation_token: token,
    activation_code: verificationNumber,
   })
  }

 const handleInputChange = async (index:number,value:string)=> {
  setInvalidError(false);
  const newVerifyNumber = {...verifyNumber, [index]: value};
   setVerifyNumber(newVerifyNumber);

   if(value === "" && index > 0){
    inputRefs[index -1].current?.focus();
   }else if(value.length === 1 && index < 3){
    inputRefs[index + 1].current?.focus()
   }

 }


  return (
    <div>
      <h1 className={`${formStyles.title}`}>
        Verify Your Account
      </h1>
      <br />
      <div className='w-full flex items-center justify-center mt-2'>
        <div className='bg-green-600 rounded-full w-[80px] h-[80px] flex items-center justify-center'>
           <VscWorkspaceTrusted size={40}/>
        </div>
      </div>
      <br />
      <br />
      <div className='m-auto flex items-center justify-around'>
        {Object.keys(verifyNumber).map((key,index)=>(
          <input type="text" 
          key={key}
          ref={inputRefs[index]}
          className={`w-[65px] h-[65px] bg-transparent border-[3px] outline-none rounded-[10px] text-center text-[18px] text-black dark:text-white font-Poppins ${
            invalidError? 'shake border-red-500' : 'dark:border-white border-[#0000004a]'
          }`}
          placeholder=''
          maxLength={1}
          value={verifyNumber[key as keyof VerifyNumber]}
          onChange={(e)=> handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <button className={`${formStyles.button}`} onClick={verificationHandler}>
        Verify OTP
      </button>
      <h5 className='font-Poppins pt-4 text-center text-[14px] text-black dark:text-white'>
        Go back to sign in?{" "}
        <span className='ml-1 text-myPrimary cursor-pointer'
        onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  )
}

export default Verification