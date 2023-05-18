import {useDispatch} from 'react-redux'
import { useEffect } from "react"
import { userById } from "../../redux/actions/actions"

const Profile = () => {


    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user ? user.id : ''
    const dispatch = useDispatch()

    useEffect( () =>{
        dispatch(userById(userId))
    }, [dispatch, userId])

    return (
        <div>
            {user ? (
                <>
                    <img src={'holis'} alt='image not found'/>
                    <p>Name: {user.name}</p>
                    <p>Lastname: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Profile