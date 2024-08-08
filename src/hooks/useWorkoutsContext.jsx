import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext hook must be used inside WorkoutsContextProvider')
    } //there is only context when this is invoked inside WorkoutsContextProvider

    return context
}