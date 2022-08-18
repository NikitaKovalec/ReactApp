import React, {useContext} from 'react'
import {UserContext} from "./context"
import {Navigate} from "react-router-dom"

export const Main = () => {
	const {user, setUser} = useContext(UserContext)

	const fetchLogOut = async () => {
		try {
			const result = await fetch('http://localhost:3000/logout', {
				mode: 'cors',
				method: 'POST',
			})
			if (result.ok) {
				setUser(null)
			} else {
				throw new Error('Ошибка')
			}
		} catch (err) {
			console.log(err.message)
		}
	}

	return <>
		{!user ? <Navigate to="/" replace={true} /> : <>
			<h1>Привет {user.userName} твой ID {user.id}</h1>
			<button onClick={fetchLogOut}>Выйти</button>
		</>}
	</>
}