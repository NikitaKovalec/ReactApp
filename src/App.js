import React, {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import {Registration} from "./Registration";
import {Login} from "./Login";
import {Main} from "./Main";
import {BrowserRouter} from "react-router-dom"
import {UserContext} from "./context"

export const App = () => {
	const [user, setUser] = useState(JSON.parse(window.userOblect) || null)

	return (<>
		<BrowserRouter>
			<UserContext.Provider value={{user, setUser}}>
				<Routes>
					<Route path={'/'} element={<Login/>}/>
					<Route path={'/registration'} element={<Registration/>}/>
					<Route path={'/main'} element={<Main/>}/>
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
		</>
	)
}