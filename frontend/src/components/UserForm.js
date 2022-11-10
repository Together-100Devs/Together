import {useState} from 'react';
import {FormMoverContext} from './FormMoverContext'
import FormMover from './FormMover'
import FormMoverControl from './FormMoverControl'
import FormCreateEvent from './FormCreateEvent'
import FormScheduleEvent from './FormScheduleEvent'
import FormConfirm from './FormConfirm'
import FormSuccess from './FormSuccess'

const UserForm = () => {
    
  const [currentStep, setCurrentStep] = useState(1)

    const [userData, setUserData] = useState('')
    const [finalData, setFinalData] = useState([])
  const steps = [
      "Description",
      "Schedule",
      "Confirm",
      "Success"
    ];

    const displayStep = (step) => {
      switch(step){
        case 1:
          return <FormCreateEvent />
        case 2:
          return <FormScheduleEvent />
        case 3:
          return <FormConfirm />
        case 4:
         return <FormSuccess />
         default:
      }
    }
  const handleClick = (direction) => {
    let newStep = currentStep
    direction === "next" ? newStep++ : newStep--
    newStep > 0 && newStep <= steps.length-1 && setCurrentStep(newStep)
  }

  return (
    <div>
        <div className="container horizontal mt-5">
          <FormMover 
            steps = {steps}
            currentStep = {currentStep}
          />

          <div className="my-10 p-10 ">
            <FormMoverContext.Provider value ={{
              userData,
              setUserData,
              finalData,
              setFinalData
            }}>
              {displayStep(currentStep)}
            </FormMoverContext.Provider>
          </div>

        </div>
        <div>
          <FormMoverControl
          handleClick = {handleClick}
          currentStep = {currentStep}
          steps= {steps}
          />
        </div>
      </div>
    
  )
  }

export default UserForm