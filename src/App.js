import React, {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import {Registration} from "./Registration";
import {Login} from "./Login";
import {Main} from "./Main";
import {UserContext} from "./context"

export const App = () => {
	const [user, setUser] = useState(JSON.parse(window.userOblect) || null)

	return (<>
			<UserContext.Provider value={{user, setUser}}>
				<Routes>
					<Route path={'/'} element={<Registration/>}/>
					<Route path={'/login'} element={<Login/>}/>
					<Route path={'/main'} element={<Main/>}/>
				</Routes>
			</UserContext.Provider>
		</>
	)
}