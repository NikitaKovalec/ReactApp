import React, {useContext, useState} from 'react'
import {Link, Navigate} from "react-router-dom"
import {UserContext} from "./context"

export const Registration = () => {
	const [name, setName] = useState("")
	const [pass, setPass] = useState("")
	const [isError, setIsError] = useState(false)
	const {user} = useContext(UserContext)

	const fetchReg = async () => {
		setIsError(false)
		try {
			const result = await fetch('http://localhost:3000/createUser', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({name, pass})
			})
			if (result.ok) {
				window.alert("Зарегистрирован")
			} else {
				throw new Error('Ошибка')
			}
		} catch (err) {
			console.log(err.message)
			setIsError(true)
		} finally {
			setPass('')
			setName('')
		}
	}
	return (<>
			{isError ? <h4>Ошибка</h4> : null}
			{user ? <Navigate to="/main" replace={true}/> : <>
				<div>
					<h3>Регистрация</h3>
					<label>Имя</label>
					<input value={name} onChange={(e) => setName(e.target.value)}/>
					<label>Пароль</label>
					<input value={pass} onChange={(e) => setPass(e.target.value)}/>
					<button onClick={fetchReg}>Зарегистрироваться</button>
				</div>
				<Link to='/'>
					<button style={{marginTop: 20}}>Войти</button>
				</Link>
			</>}
		</>
	)
}