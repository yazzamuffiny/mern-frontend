import { useState } from 'react'
import axios from 'axios';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutForm = () => {

    //dispatch for useContext
    const { dispatch } = useWorkoutContext()
    //set states for new components
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [image, setImage] = useState(null);

    const [error, setError] = useState(null);

    //handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        //get user then set user_id = email
        const user = JSON.parse(localStorage.getItem('user'))
        const user_id = user.email

        // const workout = {title, load, reps, user_id, image}

        const formData = new FormData()
        formData.append('title', title)
        formData.append('load', load)
        formData.append('reps', reps)
        formData.append('user_id', user_id)
        formData.append('image', image)
 
        try {
            const response = await axios.post(`${baseURL}/api/workouts/`, formData,{
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'multipart/form-data'
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

         <label>Upload Image:</label>
         <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}


    </form>
  )
}

export default WorkoutForm
