import  { useEffect, useState } from 'react'
import Title from '../components/Title';
import Loading from '../components/Loader';
import Tabs from '../components/Tabs';
import {useParams} from "react-router-dom"
import TaskTitle from '../components/TaskTitle';
import {MdGridView} from "react-icons/md";
import {FaList} from "react-icons/fa"
import BoardView from '../components/BoardView';
import { IoMdAdd } from 'react-icons/io';
import Table from "../components/task/Table"
import AddTask from '../components/task/AddTask';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';
import axios from 'axios';




const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams(); //params come from react router
 
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

 const [dataTasks, setDataTasks]= useState([])

  const {data, isLoading} = useGetAllTaskQuery({
    strQuery: status,
    isTrashed :"", 
    search :"",
  })

  useEffect(()=>{
    const fetchData= async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/task")
          console.log("response", response)
          setDataTasks(response.data.tasks)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[setDataTasks])



  return isLoading? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
      <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
          <Title title={status ? `${status} Tasks` : "Tasks"} />
  
          {!status && (
           /*  <Textbox
            onClick={() => setOpen(true)}
              label='Create Task'
              name='Create Task'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 '
            />  */
            <button
            onClick={() => setOpen(true)}
            label='Add Task'
            icon={<IoMdAdd className='text-lg' />}
             className='flex flex-row-reverse gap-6 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 '
            >Add Task</button>
          )}
        </div>
      
      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}
        { selected === 0 ?
         (<BoardView tasks={dataTasks}/>
      ) : (
      <div className='w-full'>
        <Table tasks={data?.tasks}/>
      </div> 
      )}
      </Tabs>
      <AddTask open={open} setOpen={setOpen}  />
    </div>
  );
};
export default Tasks