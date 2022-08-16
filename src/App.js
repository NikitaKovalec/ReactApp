import React from 'react'
import {Route, Routes} from "react-router-dom";
import {Registration} from "./Registration";
import {Login} from "./Login";

export const App = () => {
	return (<>
			<Routes>
				<Route path={'/'} element={<Registration />}/>
				<Route path={'/login'} element={<Login />}/>
			</Routes>
		</>
	)
}