import React from 'react'

export const Root = () => {
	return (<>
			<form action="/createUser" method="POST">
				<h3>Введите данные</h3>
				<label>Имя</label>
				<input type="text" name="name" />
				<label>Пароль</label>
				<input type="text" name="pass" />
				<input type="submit" value="Отправить" />
			</form>
		</>
	)
}