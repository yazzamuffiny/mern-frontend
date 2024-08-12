import { useState } from 'react'
import axios from 'axios'

//icons
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { useWorkoutContext } from '../hooks/useWorkoutsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutDetails = ({workout}) => {

  //states
  const [isEditing, setIsEditing] = useState(false)

  const [editTitle, setEditTitle] = useState(workout.title)
  const [editLoad, setEditLoad] = useState(workout.load)
  const [editReps, setEditReps] = useState(workout.reps)

  const {dispatch} = useWorkoutContext()
  
//handle delete
  const handleDelete = async () => {
    
    const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`)
    const json = await response.data

    if(response.status === 200) {
      dispatch({type: 'DELETE_WORKOUTS', payload: json})
    }
  }

  //handle edit
  const handleEdit = () => {
    setIsEditing(true);
  }

  //handle submit edit
  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps,
    };

    try {
      const response = await axios.patch(
        `${baseURL}/api/workouts/${workout._id}`,
        updatedWorkout
      );
      const updatedData = response.data;

      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({ type: 'UPDATE_WORKOUT', payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.log("error updating workout", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(workout.title);
    setEditLoad(workout.load);
    setEditReps(workout.reps);
    setIsEditing(false);
  };



  return (
    <div className="workout-details">
      {isEditing ? (

				// EDIT FORM
        <div className="edit-modal">
          <label>Edit Exercise Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <label>Edit Load:</label>
          <input
            type="number"
            value={editLoad}
            onChange={(e) => setEditLoad(e.target.value)}
          />

        <label>Edit Reps:</label>
          <input
            type="number"
            value={editReps}
            onChange={(e) => setEditReps(e.target.value)}
          />
          <button onClick={handleSubmitEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) 

			: // ELSE

			// BELOW IS THE ORIGINAL WORK OUT DETAILS:
			(
        <>
          <h4>{workout.title}</h4>
          <p>
            <strong>Load (kg): </strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              includeSeconds: true,
            })}{' '}
            ago
          </p>
          <FaRegEdit className="edit" onClick={handleEdit}/>
          <MdDeleteForever className="delete" onClick={handleDelete}/>
        </>
      )} 
			{/* END OF THE IF */}
    </div>
  )
}

export default WorkoutDetails
