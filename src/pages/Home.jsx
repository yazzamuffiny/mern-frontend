import { useEffect } from 'react'
import axios from 'axios'
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

import WorkoutDetails from './WorkoutDetails';
import WorkoutForm from './WorkoutForm';

const baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
    const { workouts, dispatch} = useWorkoutContext()
    

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await axios.get(`${baseURL}/api/workouts/`)
            
            if (response.status === 200) {
                dispatch({type: 'SET_WORKOUTS', payload: response.data})
                console.log(response.data)
            }
        }

        fetchWorkouts()
    }, [])

  return (
    <div className='home'>
      <div className='workouts'>
        {/* if there is workouts map over the array */}
        {workouts && workouts.map((workout) =>{
            return (
                <WorkoutDetails key={workout._id} workout={workout}/>
            )
        })}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
