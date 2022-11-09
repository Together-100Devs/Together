import {useState} from 'react';
import FormMover from './FormMover'
import FormMoverControl from './FormMoverControl'
import FormCreateEvent from './FormCreateEvent'
import FormScheduleEvent from './FormScheduleEvent'
import FormConfirm from './FormConfirm'
import FormSuccess from './FormSuccess'

const UserForm = () => {
    
  const [currentStep, setCurrentStep] = useState(1)
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
  
  return (
    <div>
        <div className="container horizontal mt-5">
          <FormMover 
            steps = {steps}
            currentStep = {currentStep}
          />
        </div>
        <div>
          <FormMoverControl/>
        </div>
      </div>
    
  )
    //  state= {
    //     step: 1,
    //     title:'',
    //     description: '',
    //     discordName: '',
    // }
    
//   // Move to next step
//   nextStep = () =>{
//     const {step} = this.state;
//     this.setState({
//         step: step + 1
//     })
//   }

//   // Move to previous step
//   prevStep = () =>{
//     const {step} = this.state;
//     this.setState({
//         step: step - 1
//     })
//   }

  // Handle input change
//   handleChange = input => e => {
//     this.setState({[input]: e.target.value})
//   }

//   const {step} = this.state;
//   const {title, description, discordName} = this.state;
//   const values = {title, description, discordName}
   
  
//   switch(step){
//     case 1:
//         return (
//             <FormCreateEvent
               
//                 handleChange={this.handleChange}
//                 values={values}
//             />
//         )
//     case 2:
//         return <h1>FormScheduleEvent</h1>
//     case 3: 
//         <h1>Confirm</h1>
//     case 4: 
//         <h1>Success</h1>
    
//   }
}

// UserForm.PropTypes = {
//     step: PropTypes.number,
//     title:PropTypes.string,
//     description: PropTypes.string,
//     discordName: PropTypes.string,
// }

export default UserForm