import React from 'react'
import {Route, Routes} from "react-router-dom";
import {Registration} from "./Registration";
import {Login} from "./Login";
import {Main} from "./Main";

export const App = () => {
	return (<>
			<Routes>
				<Route path={'/'} element={<Registration />}/>
				<Route path={'/login'} element={<Login />}/>
				<Route path={'/main'} element={<Main />}/>
			</Routes>
		</>
	)
}