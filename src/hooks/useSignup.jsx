import axios from 'axios'
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${baseURL}/api/user/signup`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.dat.error)
            }
            
            if (response.status === 200) {
                //save user to local storage
                localStorage.setItem('user', JSON.stringify(response.data))
                //update auth context - don't forget to import dispatch for useAuthContext
                dispatch({type: 'LOGIN', payload: response.data})

                setIsLoading(false)
            }
            console.log(response);
        } catch (error) {
            console.error(error.response.data.error)
            setError(error.response.data.error)
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}

