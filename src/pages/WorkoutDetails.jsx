import { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

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

  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  const {dispatch} = useWorkoutContext()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  
//handle navigate
  const handleNavigate = () => {
    let path= `/${workout._id}`
    navigate(path)
  }

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

  //split email function
  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0] : '';
  };

  const handleCancelEdit = () => {
    setEditTitle(workout.title);
    setEditLoad(workout.load);
    setEditReps(workout.reps);
    setIsEditing(false);
  };

    const handleAddComment = async () => {
      try {
        const response = await axios.post(
          `${baseURL}/api/comments/workouts/${workout._id}/comments`,
          {
              text: commentText,
              user_id: user.email,
          }
        );

        if (response.status === 201) {
          const newComment = response.data;
          const updatedComments = [...workout.comments, newComment];
          const updatedWorkout = { ...workout, comments: updatedComments};

          dispatch({type: 'UPDATE_WORKOUT', payload: updatedWorkout})

          setCommentText('')
        }
      }catch (error) {
        console.error('Error Adding Comment', error)
      }
    }


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
          <p><strong>Created by: </strong>{workout.user_id}</p>
          <FaRegEdit className="edit" onClick={handleEdit}/>
          <MdDeleteForever className="delete" onClick={handleDelete}/>

          <button onClick={handleNavigate}>Read More</button>

          <button onClick={() => {
            setShowComments(!showComments)
            console.log(workout.comments[0])}}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>

            {showComments && (
              <>
                <div className='comments'>
                  {/* map over comments array */}
                  {workout.comments.map((comment) => (
                    <div key={comment._id} className='comment'>
                      <h5>{getEmailCharactersBeforeAtSymbol(comment.user_id)}</h5>
                      <p>{comment.text}</p>
                      <span>Posted: {formatDistanceToNow(new Date(comment.createdAt), {
                      includeSeconds: true,
                      })}{' '}
                      ago</span>
                    </div>
                  ))}
                </div>
                {/* add comment section */}
                <div className="add-comment">
                  <label htmlFor="comment">Add New Comment</label>
                  <input 
                  type="text"
                  placeholder='Add a comment...' 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button onClick={handleAddComment}>Submit</button>
                </div>
              </>

            )}

        </>
      )} 
			{/* END OF THE IF */}
    </div>
  )
}

export default WorkoutDetails
