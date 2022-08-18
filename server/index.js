const express = require('express')
const app = express()
const path = require('path')
const cookieParser= require('cookie-parser')
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

app.get('/', async (req, res) => {
	const cookies = req.cookies
	const cookiesValue = cookies.user_session
	if (cookiesValue) {
		const user = await User.findOne({where: {id: cookiesValue}})
		res.render('../../main.ejs', {
			user: user.dataValues
		})
	}
	res.render('../../main.ejs', {
		user: null
	})
})

app.post('/login', async (req, res) => {
	if(!req.body) return res.status(400).send('Заполните поля')
	try {
		const user = await User.findOne({where: {userName: req.body.name}})
		if (!user) return res.status(404).send('Нет такого пользователя')
		if (user.password === req.body.pass) {
			res.cookie('user_session', JSON.stringify(user.id))
			res.json(user)
		}else {
			res.status(401).send('Ошибка введенных данных')
		}
	} catch (err) {
		await console.log(err.message)
		res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
	}
})

app.post('/createUser', async (req, res) => {
	if(!req.body) return res.status(400).send('Заполните поля')
	try {
		await User.create({userName: req.body.name, password: req.body.pass})
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