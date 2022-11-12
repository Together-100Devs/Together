import {useContext} from 'react'
import { FormMoverContext } from './FormMoverContext'


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
      <p>{userData['discordName']}</p>
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
      <div className="bg-white my-2 p-1 flex text-slate-400 border border-gray-200 rounded">
      <p>{userData['recurring']}</p>
      </div>
    </div>
    </div>
  )
}