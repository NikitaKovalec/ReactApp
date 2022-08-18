const express = require('express')
const app = express()
const crypto = require('crypto')
const path = require('path')
const cookieParser = require('cookie-parser')
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('userList', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	port: 5432,
})
const port = 3000

const User = sequelize.define('user', {
	userName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: DataTypes.STRING,
}, {
	tableName: 'users',
	indexes: [
		{
			unique: true,
			fields: ['userName']
		}
	]
})

User.sync()
	.then(() => {
		console.log('Подключено')
	})
	.catch((err) => {
		console.log('Ошибка' + err.message);
	})

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use('/build', express.static(path.join(__dirname, '../build')))

app.get('*', async (req, res) => {
	const cookies = req.cookies
	const userId = cookies.user_session
	let user = null
	if (userId) {
		user = (await User.findOne({where: {id: userId}})).dataValues
	}

	res.render('../../main.ejs', {
		user
	})
})

app.post('/login', async (req, res) => {
	if (!req.body) return res.status(400).send('Заполните поля')
	try {
		const user = await User.findOne({where: {userName: req.body.name}})
		if (!user) return res.status(404).send('Нет такого пользователя')
		const passForHash = req.body.pass
		const salt = req.body.name
		const hash = crypto.createHash('sha512', salt).update(passForHash).digest('hex')
		if (user.password === hash) {
			res.cookie('user_session', JSON.stringify(user.id), {httpOnly: true})
			res.json(user)
		} else {
			res.status(401).send('Ошибка введенных данных')
		}
	} catch (err) {
		await console.log(err.message)
		res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
	}
})

app.post('/createUser', async (req, res) => {
	if (!req.body) return res.status(400).send('Заполните поля')
	try {
		const passForHash = req.body.pass
		const salt = req.body.name
		const hash = crypto.createHash('sha512', salt).update(passForHash).digest('hex')
		await User.create({userName: req.body.name, password: hash})
		res.json('Пользователь создан')
	} catch (err) {
		await console.log(err.message)
		res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
	}
})

app.post('/logout', async (req, res) => {
	res.clearCookie('user_session')
	res.send('Вы вышли')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})