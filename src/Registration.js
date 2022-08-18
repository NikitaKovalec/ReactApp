import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {UserContext} from "./context"

export const Registration = () => {
	const [name, setName] = useState("")
	const [pass, setPass] = useState("")
	const [isError, setIsError] = useState(false)
	const {user} = useContext(UserContext)

	const navigate = useNavigate()
	useEffect(() => {
		if (user) navigate('/main')
	}, [user])

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
			<div>
				<h3>Registration</h3>
				<label>Имя</label>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<label>Пароль</label>
				<input value={pass} onChange={(e) => setPass(e.target.value)} />
				<button onClick={fetchReg}>Отправить</button>
			</div>
			<Link to='/login'>
				<button style={{marginTop: 20}}>Login</button>
			</Link>
		</>
	)
}