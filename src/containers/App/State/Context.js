import React, { createContext } from 'react'

const AppContext = createContext()

const {Provider, Consumer} = AppContext;

const AppProvider = ({children}) => {
	return(
		<Provider value={{demo: 'value'}}>
			{children}
		</Provider>
	)
}

export { AppProvider, AppContext }