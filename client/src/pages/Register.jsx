import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify"
import { setCredentials } from '../redux/slices/authSlice';
import Loading from '../components/Loader';
import axios from 'axios';
import { useRegisterMutation } from '../redux/slices/api/authApiSlice';


const Register=() =>{
  const { user } = useSelector((state)=>state.auth);
  const [registerInfo, setRegisterInfo]= useState({
    name: "",
    email:"",
    password:"",
    isAdmin: false,
    role:"",
    isActive: false,
    tasks:[],
    title:"",
  })
 
  const navigate=useNavigate()
 const dispatch = useDispatch();

 const [register, { isLoading }] = useRegisterMutation();

  

  const handleSubmit= async (e) => {
   e.preventDefault()
   console.log("registerInfo", registerInfo)
     try {

      const result = await axios.post("http://localhost:8800/api/user/register", registerInfo )
     
      console.log("result", result)

      dispatch(setCredentials(result.data))
     navigate("/dashboard")
     } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.message)
     }

  };

  /* useEffect(()=>{
  user && navigate("/dashboard")
  },[user]) */
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0  md:gap-40 flex-col md:flex-row items-center justify-center'>
{/* 3ana 2 container 3ala hatheka 3malna 2 differents sizez w bich na3mlo tawa 2 div lkoul wa7da div*/
}    
{/*left side*/ }
 
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
 <input
 placeholder="Name"
 type="name"
 name="name"
 label=" name"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, name:e.target.value})}

 />
 <input
 placeholder="email@example.com"
 type="email"
 name="email"
 label=" Email Address"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, email:e.target.value})} />

<input
 placeholder="your password"
 type="password"
 name="password"
 label=" Password"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, password:e.target.value})}/>
 <input
 placeholder="false"
 type="boolean"
 name="isAdmin"
 label=" isAdmin"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, isAdmin:e.target.value})}
 />
 <input
 placeholder="text"
 type="role"
 name="role"
 label=" role"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, role:e.target.value})}
 />
 <input
 placeholder="false"
 type="boolean"
 name="isActive"
 label=" isActive"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, isActive:e.target.value})}
 />
 <input
 placeholder="text"
 type="Array"
 name="Task"
 label=" Task"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, tasks:e.target.value})}
 />
 <input
 placeholder="text"
 type="Title"
 name="Title"
 label=" Title"
 className="w-full rounded-full"
 onChange={e =>setRegisterInfo({...registerInfo, title:e.target.value})}
 />
{ isLoading ? (<Loading  />) : (<Button 
type='submit'
label='sign Up'
className='w-full h-10 bg-blue-700
 text-white rounded-full'/>)}

</div>
  </form>
  </div>
    </div>
    </div>
  )
}
export default Register;