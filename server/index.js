const express = require('express')
const app = express()
const path = require('path')

const port = 3000

app.set('view engine', 'ejs')

app.use('/build', express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
	res.render('../../main.ejs', {
		serverPort: port
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})