import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import {useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import {toast} from "react-toastify"
import { setCredentials } from '../redux/slices/authSlice';
import Loading from '../components/Loader';
import axios from 'axios';


const Login=() =>{
  const { user } = useSelector((state)=>state.auth);
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const navigate=useNavigate()
 const dispatch = useDispatch();

const [login, { isLoading }] = useLoginMutation();
  

  const handleSubmit= async (e) => {
   e.preventDefault()
   
     try {

      const result = await axios.post("http://localhost:8800/api/user/login", {email, password})
     
     console.log("result")
      
      dispatch(setCredentials(result))
     navigate("/dashboard")
     } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.message)
     }

  };
 useEffect(()=>console.log(email, password),[email, password])

  /* useEffect(()=>{
  user && navigate("/dashboard")
  },[user]) */
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0  md:gap-40 flex-col md:flex-row items-center justify-center'>
{/* 3ana 2 container 3ala hatheka 3malna 2 differents sizez w bich na3mlo tawa 2 div lkoul wa7da div*/
}    
{/*left side*/ }
  <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
  <div className='w-fullmd:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center g-5 md:gap-y-10 2xl:-m-20'>
    <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bodergray-300 text-gray-400'>
      Manage your time to do the best of you!
    </span>
    <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
      <span>Cloud-based</span>
      <span>Task Manager</span>
    </p>
     
     <div className='cell'>
      <div className='circle rotate-in-up-left'></div>
     </div>
  </div>
  </div>
  {/*rigth side*/}
  <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
  <form onSubmit={(e)=> handleSubmit(e)}
  className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
<div className=''>
<p className='text-blue-600 text-3xl font-bold text-center'>Welcome Back</p>
<p className='text-center text-base text-gray-700'>
  keep all your credential safe.
</p>
</div>
<div className=''>
  
</div>

<div className='flex flex-col gap-y-5'>
 <Textbox
 placeholder="email@example.com"
 type="email"
 name="email"
 label=" Email Address"
 className="w-full rounded-full"
 onChange={e =>setEmail(e.target.value)}

 />
 <Textbox
 placeholder="your password"
 type="password"
 name="password"
 label=" Password"
 className="w-full rounded-full"
 onChange={e =>setPassword(e.target.value)}

 />
 <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>Forget password?</span>
{ isLoading ? (<Loading  />) : (<Button 
type='submit'
label='Log-in'
className='w-full h-10 bg-blue-700
 text-white rounded-full'/>)}

</div>
  </form>
  </div>
    </div>
    </div>
  )
}
export default Login