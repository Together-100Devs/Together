import{useContext} from 'react'
import { FormMoverContext } from './FormMoverContext'


export default function RecurringDates () {
    
    
    const {userData, setUserData} = useContext(FormMoverContext)
    const handleChange = (e) => {
      const {name, value} = e.target
      setUserData({...userData, [name] : value})
    }

  return (
    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
     Recurring
      </div>
      <div className=" bg-white my-2 p-1 flex border border-gray-200 rounded">
       <div className='flex space-x-4 items-center'>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['monthly'] || ''}
       name='monthly'
       label="monthly"
       className=" w-16 h-16 mx-1 outline-non text-gray-800"
       />
       <p>Monthly</p>
       </div>
       <div className='flex space-x-4 items-center'>
         <input type="checkbox" 
       onChange={handleChange}
       value={userData['monday'] || ''}
       name='monday'
       className=" w-16 h-16 mx-1 outline-non text-gray-800"
       />
        <p>Monday</p>
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['tuesday'] || ''}
       name='tuesday'
       className="mx-1 outline-non text-gray-800"
       />
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['wednesday'] || ''}
       name='wednesday'
       className="mx-1 outline-non text-gray-800"
       />
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['thursday'] || ''}
       name='thursday'
       className="mx-1 outline-non text-gray-800"
       />
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['friday'] || ''}
       name='friday'
       className=" mx-1 outline-non text-gray-800"
       />
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['saturday'] || ''}
       name='recurring'
       className="mx-1 outline-non text-gray-800"
       />
       </div>
       <div>
        <input type="checkbox" 
       onChange={handleChange}
       value={userData['sunday'] || ''}
       name='recurring'
       className="mx-1 outline-non text-gray-800"
       />
       </div>
      </div>
    </div>
  )
}
