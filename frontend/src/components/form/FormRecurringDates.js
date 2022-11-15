import{ useContext } from 'react'
import { FormMoverContext } from './FormMoverContext'




export default function FormRecurringDates () {
    
    const {userData, setUserData} = useContext(FormMoverContext)
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setUserData({ ...userData, [name]: checked })
        } else {
            setUserData({ ...userData, [name]: value });
            }
      console.log(`${userData[[name]]}`)
    }

    const allChange = (e) => {
      const { name, value, className, type,  checked } = e.target;
        if (type=== "checkbox" && className === "day") {
            setUserData({ ...userData, [name]: checked })
        } else {
            setUserData({ ...userData, [name]: value });
            }
      console.log(`${userData[[name]]}`)
    }
    
    
       
    
  return (
    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
     Recurring
      </div>
      <div className="bg-white p-1 flex-col space-y-6 border border-gray-200 rounded">
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={allChange}
       value='monthly'
       name='monthly'
       label="monthly"
       checked={!!userData["monthly"]}
       className="  mx-1 outline-non text-gray-800"
       />
       <p>Monthly</p>
       </div>
       
       <div className="mx-8 space-y-2">
        <div className='  flex space-x-4 items-center'>
         <input type="checkbox" 
       onChange={handleChange}
       value= 'monday'
       name= 'monday'
       id='monday'
       checked={!!userData["monday"]}
       className="day mx-1 outline-non text-gray-800"
       />
        <p>Monday</p>
       </div>
       <div className=' flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='tuesday'
       name='tuesday'
       id='tuesday'
       checked = {!!userData["tuesday"]}
       className="day mx-1 outline-non text-gray-800"
       />
       <p>Tuesday</p>
       </div>
       <div className=' flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='wednesday'
       name='wednesday'
       id='wednesday'
       checked={!!userData["wednesday"]}
       className="day mx-1 outline-non text-gray-800"
       />
       <p>Wednesday</p>
       </div>
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='thursday'
       name='thursday'
       checked={!!userData["thursday"]}
       className="mx-1 outline-non text-gray-800"
       />
       <p>Thursday</p>
       </div>
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='friday'
       name='friday'
       checked={!!userData["friday"]}
       className=" mx-1 outline-non text-gray-800"
       />
       <p>Friday</p>
       </div>
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='saturday'
       name='Saturday'
       checked={!!userData["saturday"]}
       className="mx-1 outline-non text-gray-800"
       />
       <p>Saturday</p>
       </div>
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value='sunday'
       name='sunday'
       checked={!!userData["sunday"]}
       className="mx-1 outline-non text-gray-800"
       />
       <p>Sunday</p>
       </div>
       </div>
      </div>
    </div>
  )
}
