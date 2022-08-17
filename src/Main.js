import React, {useContext} from 'react'
import {UserContext} from "./context"
import Cookies from 'js-cookie'

export const Main = () => {
	const {user} = useContext(UserContext)
	return(
		<>
		<h1>Привет {user.name} твой ID {Cookies.get('user_session')} </h1>
		</>
	)
}