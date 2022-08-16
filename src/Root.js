import React from 'react'

export const Root = () => {
	return (<>
		<h1>Hello World</h1>
		<h1>{window.serverPort}</h1>
		</>
	)
}