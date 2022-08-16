import React from 'react'
import {Link} from "react-router-dom";

export const Login = () => {
	return (<>
			<h3>Login</h3>
			<Link to='/'>
				<button style={{marginTop: 20}}>Registration</button>
			</Link>
		</>
	)
}