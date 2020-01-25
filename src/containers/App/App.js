import React, { useContext } from 'react';
import {AppContext} from './State/Context'

const App = () => {
		const ctxVals = useContext(AppContext);
		console.log('ctxVals')
		console.log(ctxVals)

	return(		
		<main className="container">
				<h3>Overhead Assessment</h3>
				<form>
					<p> test p </p>
				</form>
		</main>
	)
};

export default App;