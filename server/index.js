const express = require('express')
const app = express()
const path = require('path')
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('userList', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	port: 5432,
})
const port = 3000

const User = sequelize.define('user', {
	userName: DataTypes.STRING,
	password: DataTypes.STRING,
}, {
	tableName: 'users',
})

User.sync()
	.then(() => {
		console.log('Подключено')
	})
	.catch((err) => {
		console.log('Ошибка' + err.message);
	})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use('/build', express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
	res.render('../../main.ejs', {
		serverPort: port
	})
})

app.post('/login', async (req, res) => {
	if(!req.body) return res.status(400).send('Заполните поля')
	try {
		await User.findOne({where: {userName: req.body.name, password: req.body.pass}})
		res.json('Успешно')
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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})