import { useState } from 'react'
import axios from 'axios';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {

    //dispatch for useContext
    const { dispatch } = useWorkoutContext()
    //set states for new components
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    const [error, setError] = useState(null)

    //handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        try {
            const response = await axios.post('http://localhost:4000/api/workouts/', workout,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            //show success
            console.log('new workout added', response.data)
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})

        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label htmlFor="title">Exercise Title:</label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
         />

        <label htmlFor="load">Load (in kg):</label>
        <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
         />

        <label htmlFor="reps">Reps:</label>
        <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
         />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}


    </form>
  )
}

export default WorkoutForm
