import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './App'
import {BrowserRouter} from "react-router-dom"
import {UserContext} from "./context"

function AppWithContext() {
	const [user, setUser] = useState(JSON.parse(window.userCookies) || null)

	return (
		<BrowserRouter>
			<UserContext.Provider value={{user, setUser}}>
				<App/>
			</UserContext.Provider>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root'))
	.render(
		<AppWithContext />
	)