import {useContext} from 'react'
import { FormMoverContext } from './FormMoverContext'
import RecurringDates from '../RecurringDates'

export default function FormConfirm () {
  const {userData} = useContext(FormMoverContext)
  // const handleChange = (e) => {
  //   const {name, value} = e.target
  //   setUserData({...userData, [name] : value})
  // }
  
  return (
    <div className="flex flex-col">
    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
      Title
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
        <p>{userData['title']}</p>
        
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
      Description
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['description']}</p>
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
     Date
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['date']}</p>
      </div>
    </div>
    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
     Discord Name
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['discordName'] || ''}</p>
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
      Location
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['location']}</p>
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
      Start Time
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['startTime']}</p>
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
      End Time
      </div>
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['endTime']}</p>
      </div>
    </div>

    <div className ="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
     Recurring
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
       <input type="checkbox" 
       checked={!!userData["monthly"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
      
       value='monday'
       name='monday'
       checked={!!userData["monday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='tuesday'
       name='tuesday'
       checked = {!!userData["tuesday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='wednesday'
       name='wednesday'
       defaultChecked={!!userData["wednesday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='thursday'
       name='thursday'
       defaultChecked={!!userData["thursday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='friday'
       name='friday'
       defaultChecked={!!userData["friday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='saturday'
       name='recurring'
       defaultChecked={!!userData["saturday"]}
       className="outline-non text-gray-800"
       />
       <input type="checkbox" 
       
       value='sunday'
       name='recurring'
       defaultChecked={!!userData["sunday"]}
       className="outline-non text-gray-800"
       />
      </div>
    </div>
    </div>
  )
}