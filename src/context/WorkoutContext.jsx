import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //updates the workouts to the new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                //creates an array with the new workout at the front and previous workouts after
                workouts: [action.payload, ...state.workouts]
            }
        default:
            return state //return state unchanged
    }
}

export const WorkoutsContextProvider = ({children}) => {

    const[state, dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}