import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom"
import {UserContext} from "./context";

export const Login = () => {
	const [name, setName] = useState("")
	const [pass, setPass] = useState("")
	const [isError, setIsError] = useState(false)

	const {setUser} = useContext(UserContext)

	const fetchLogin = async () => {
		setIsError(false)
		try {
			const result = await fetch('http://localhost:3000/login/', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({name, pass})
			})
			if (result.ok) {
				window.alert("Вы вошли")
				setUser({name})
			} else {
				throw new Error('Ошибка')
			}
		} catch (err) {
			console.log(err.message)
			setUser(null)
			setIsError(true)
		} finally {
			setPass('')
			setName('')
		}}

	return (<>
			{isError ? <h4>Ошибка</h4> : null}
			<div>
				<h3>Login</h3>
				<label>Имя</label>
				<input value={name} onChange={(e) => setName(e.target.value)}/>
				<label>Пароль</label>
				<input value={pass} onChange={(e) => setPass(e.target.value)}/>
				<button onClick={fetchLogin}>Войти</button>
			</div>
			<Link to='/'>
				<button style={{marginTop: 20}}>Registration</button>
			</Link>
			<Link to='/main'>
				<button style={{marginTop: 20, marginLeft: 10}}>Main</button>
			</Link>
		</>
	)
}