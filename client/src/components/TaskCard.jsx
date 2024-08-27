import clsx from 'clsx';
import React, {useState} from 'react'
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import {useSelector} from "react-redux";
import TaskDialog from './task/TaskDialog';
import {BGS, PRIORITYSTYLES, TASK_TYPE} from "../utils/index.js"
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from 'react-icons/fa';
import UserInfo from './UserInfo.jsx';


const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };
const TaskCard = ({task}) => {
   const {user}= useSelector((state)=> state.auth)
   const {open, setOpen}= useState(false);
    return (

        <>
    <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
       <div className='w-full flex justify-between'>
       <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITYSTYLES[task?.priority])}>
        <span className='text-lg'> {ICONS[task?.priority]}</span>
        <span className='uppercase'>{task?.priority}Priority</span>
       </div>

       {user?.isAdmin && <TaskDialog task={task}/>}
    </div>
    <>
    <div className='flex items-center gap-2'>
        <div className={clsx("w-4 h-4 rounded-full", 
            TASK_TYPE[task.stage])} /> 
            <h4 className='text-line-clamp-1 text-black'>{task?.title}</h4>
    </div>
      <span className=' text-sm text-gray-600'>
           {formatDate(new Date (task?.Date))}
      </span>
    </>
    <div className='w-full border-t border-gray-200 my-2' />
        <div className='flex items-center justify-between mb-2'>
             <div className='flex items-center gap-3'>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <BiMessageAltDetail />
                    <span className=''>
                        {task?.activities?.length}
                    </span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <MdAttachFile />
                    <span className=''>
                        {task?.assets?.length}
                    </span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <FaList/>
                    <span className=''>
                       0/{task?.subTasks?.length}
                    </span>
                </div>
             </div>
        {/*Users or the team*/}
        <div className='flex flex-row-reverse'>
       {task?.team?.map((m,index)=>(
        <div key={index}
        className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS?.length])}>
            <UserInfo user={m} />
        </div>
       ))}

        </div>
        </div>
        {/* sub Tasks */}

        {task?.subTasks?.length > 0 ? ( <div className='py-4 border-t border-gray-200' >
  <h5 className='text-base line-clamp-1 text-black'> {task?.subTasks[0].title}</h5>
        </div>) : (<></> )}
       </div>
    </>
  )
}

export default TaskCard