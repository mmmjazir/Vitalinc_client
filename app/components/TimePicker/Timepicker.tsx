// import { Button } from '@/components/ui/button';
// import React, { FC, useEffect, useState } from 'react'
// import { Switch } from '@/components/ui/switch';
// import { toast } from '@/components/ui/use-toast';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { AccessTime, AccessTimeFilled } from '@mui/icons-material';

// type Props = {
//     // hours: {
//     //     [key: string]: { isOpen: boolean, startTime: string, endTime: string }
//     // };
//     state: any;
//     setState: (state: any) => void;
//     setFieldValue:any;
// }

// const Timepicker: FC<Props> = ({state,setState,setFieldValue}) => {
 
//     // useEffect(() => {
//     //     setFieldValue('hours', shopDetails.hours);
//     // }, []);

//     const [isExpanded, setIsExpanded] = useState(false);

//     const days = Object.keys(state.hours);

//     const handleToggle = (day: string) => {
//         const updatedHours = {
//             ...state.hours,
//             [day]: {
//               ...state.hours[day],
//               isOpen: !state.hours[day]?.isOpen,
//             },
//           };
//        setFieldValue('hours', updatedHours);

//           if (!updatedHours[day].isOpen) {
//             delete updatedHours[day].startTime;
//             delete updatedHours[day].endTime;
//           }
        
//           setState((prev: any) => ({
//             ...prev,
//             hours: updatedHours,
//           }));
//         // const updatedHours = {
//         //     ...shopDetails.hours,
//         //     [day]: {
//         //         ...shopDetails.hours[day],
//         //         isOpen: !shopDetails.hours[day]?.isOpen,
//         //     },
//         // };

//         // // If closing the day, remove startTime and endTime
//         // if (!updatedHours[day].isOpen) {
//         //     delete updatedHours[day].startTime;
//         //     delete updatedHours[day].endTime;
//         // }

//         // setShopDetails((prev:any)=> ({ ...prev, hours: updatedHours }));
//         // setFieldValue('hours', updatedHours);
//         // setShopDetails((prev: any) => {
//         //     const updatedHours = {
//         //         ...prev.hours,
//         //         [day]: {
//         //             ...prev.hours[day],
//         //             isOpen: !prev.hours[day]?.isOpen,
//         //         },
//         //     };
    
//         //     // If closing the day, remove startTime and endTime
//         //     if (!updatedHours[day].isOpen) {
//         //         delete updatedHours[day].startTime;
//         //         delete updatedHours[day].endTime;
//         //     }
    
//         //     // Update Formik value
//         //     setFieldValue('operatingHours', updatedHours);
    
//         //     return {
//         //         ...prev,
//         //         hours: updatedHours,
//         //     };
//         // });
  
//     };

//     const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
//         const updatedHours = {
//             ...state.hours,
//             [day]: {
//               ...state.hours[day],
//               [field]: value,
//             },
//           };
//          setFieldValue('hours', updatedHours);
//           setState((prev: any) => ({
//             ...prev,
//             hours: updatedHours,
//           }));
      

//         // setShopDetails((prev: any) => {
//         //     const updatedHours = {
//         //         ...prev.hours,
//         //         [day]: {
//         //             ...prev.hours[day],
//         //             [field]: value,
//         //         },
//         //     };
    
//         //     setFieldValue(`operatingHours.${day}.${field}`, value);
    
//         //     return {
//         //         ...prev,
//         //         hours: updatedHours,
//         //     };
//         // });
//     };

//     const saveHours = () => {
//         setIsExpanded(false);
//     };

//     return (
//         <div className="border w-fit rounded-lg px-4 py-3">
//             <div 
//                 className="flex gap-8 justify-between items-center cursor-pointer" 
//                 onClick={() => setIsExpanded(!isExpanded)}
//             >
//                 <div className={`flex gap-2 `}>
//                     <p className="text-[16px] font-medium text-gray-600">Select Hours</p>  
//                     <AccessTimeFilled sx={{color: 'gray'}} fontSize='small'/>
//                 </div>
              
//                 {isExpanded ? <ChevronUp /> : <ChevronDown />}
//             </div>
            
//             <div className={`transition-all  mt-4 duration-300 ease-in-out overflow-hidden ${isExpanded ? 'block' : 'hidden'}`}>
//             {days.map((day) => (
//                     <div key={day} className="flex p-1 items-center gap-4 mb-2">
//                         <span className="w-24">{day}</span>
//                         <Switch
//                         id='hours'
//                         name='hours'
//                             className="border-2 bg-gray-500"
//                             checked={state.hours[day]?.isOpen}
//                             onCheckedChange={() => handleToggle(day)}
//                         />
//                         <span>{state.hours[day]?.isOpen ? 'Open' : 'Closed'}</span>
//                         {state.hours[day]?.isOpen && (
//                             <>
//                                 <input
//                                     type="time"
//                                     value={state.hours[day]?.startTime || ''}
//                                     onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
//                                     className="border rounded p-1"
//                                 />
//                                 <span>to</span>
//                                 <input
//                                     type="time"
//                                     value={state.hours[day]?.endTime || ''}
//                                     onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
//                                     className="border rounded p-1"
//                                 />
//                             </>
//                         )}
//                     </div>
//                 ))}
//                 <Button className='text-white bg-gray-500 hover:bg-gray-400 mt-4' onClick={saveHours}>
//                     Done
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Timepicker;



import React, { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'

type Props = {
  state: {
    hours: {
      [key: string]: { isOpen: boolean; startTime: string; endTime: string }
    }
  }
  setState: (state: any) => void
  setFieldValue: any
}

const Timepicker: FC<Props> = ({ state, setState, setFieldValue }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const days = Object.keys(state.hours)

  const handleToggle = (day: string) => {
    const updatedHours = {
      ...state.hours,
      [day]: {
        ...state.hours[day],
        isOpen: !state.hours[day]?.isOpen,
      },
    }
    setFieldValue('hours', updatedHours)

    if (!updatedHours[day].isOpen) {
      delete updatedHours[day].startTime
      delete updatedHours[day].endTime
    }

    setState((prev: any) => ({
      ...prev,
      hours: updatedHours,
    }))
  }

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    const updatedHours = {
      ...state.hours,
      [day]: {
        ...state.hours[day],
        [field]: value,
      },
    }
    setFieldValue('hours', updatedHours)
    setState((prev: any) => ({
      ...prev,
      hours: updatedHours,
    }))
  }


  return (
    <div className="border my-2 rounded-lg px-4 py-3 w-full max-w-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-2 items-center">
          <p className="text-[16px] font-medium text-gray-600">Select Hours</p>
          <Clock className="text-gray-600" size={20} />
        </div>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      <div
        className={`transition-all mt-4 duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        {days.map((day) => (
          <div key={day} className="flex flex-wrap border-b-2 pb-3 items-center gap-2 mb-4">
            <span className="w-24">{day}</span>
            <Switch
              id="hours"
              name="hours"
              className="border-2 bg-gray-500"
              checked={state.hours[day]?.isOpen}
              onCheckedChange={() => handleToggle(day)}
            />
            <span className="w-16">{state.hours[day]?.isOpen ? 'Open' : 'Closed'}</span>
            {state.hours[day]?.isOpen && (
              <div className="flex items-center gap-2 mt-2 w-full">
                <input
                  type="time"
                  value={state.hours[day]?.startTime || ''}
                  onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                  className="border rounded p-1 flex-grow"
                />
                <span>to</span>
                <input
                  type="time"
                  value={state.hours[day]?.endTime || ''}
                  onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                  className="border rounded p-1 flex-grow"
                />
              </div>
            )}
          </div>
        ))}
       
      </div>
    </div>
  )
}

export default Timepicker