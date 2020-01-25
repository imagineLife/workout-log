import React, { useContext } from 'react';
import {AppContext, AppProvider} from './Context'
import App from '../App'

const WrappedApp = () => {
	const ctxVals = useContext(AppContext)
	return(
		<AppProvider>
			<App />
		</AppProvider>
	)
}

export default WrappedApp;