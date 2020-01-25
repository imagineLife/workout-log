import React, { createContext, useState } from 'react'
import feetQs from './questions/feet.json'
const AppContext = createContext()

const {Provider, Consumer} = AppContext;

const AppProvider = ({children}) => {

	let [formState, setFormState] = useState({
		'Feet': feetQs
	})

	let updateFormData = (thisObj, curState) => {		
		let stateClone = {...curState}
		let thisSectionFromState = stateClone[thisObj.section]
		let thisQuestionFromState = thisSectionFromState.filter((d,idx) => idx == thisObj.index)[0]
		let newQuestionObj = {...thisQuestionFromState, ...thisObj}
		
		delete newQuestionObj.section;
		delete newQuestionObj.index;
		
		let newSection = thisSectionFromState.map((s, idx) => {
			if(idx === thisObj.index) return newQuestionObj
				return s
		})
		
		let newState = {...stateClone, ...{[thisObj.section]: newSection}}
		
		setFormState(newState)
	}

	return(
		<Provider value={{formState, updateFormData}}>
			{children}
		</Provider>
	)
}

export { AppProvider, AppContext }