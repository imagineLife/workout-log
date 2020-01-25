import React, { useContext, Fragment } from 'react';
import {AppContext} from './State/Context'
import './App.css'
const App = () => {
	
	const {formState, updateFormData} = useContext(AppContext);
	
	let questionSections = formState && Object.keys(formState)
	
	return(		
		<main className="container">
				<h3>Overhead Assessment</h3>
				<form>
					{ formState && 
						questionSections &&
						questionSections.map((section, idx) => {
							
							let thisSectionQuestions = formState[section]

							return(
								<Fragment key={`${section}-${idx}`}>
									<h3>{section}</h3>
									<section className="conditional-block">
									{/* UN-Conditional Questions*/}
									{thisSectionQuestions.map((q, qidx) => {

										let conditionalQuestionIsTrue = false;
										let isConditional = q.conditional
										
										let conditionalQStatus = false;
										if(isConditional){
											conditionalQStatus = thisSectionQuestions.filter(d => d.question == q.on)[0].answer
										} 
										if(
											q.conditional == false || 
											conditionalQStatus == true
										){
											return(
												<label 
														htmlFor={q.question} 
														key={`question-${qidx}`}
														className={`question-label ${conditionalQStatus == true && 'conditional'}`}
													>
														{q.question}
														<input 
															id={`question-${qidx}`} 
															checked={q.answer}
															onChange={() => {
																let thisObj = {
																	index: qidx,
																	section,
																	question: q.question,
																	answer: !q.answer
																}
																updateFormData(thisObj, formState)
															}}
															type={q.type} />
												</label>
											)	
										}
									}).filter(d => d)}
								</section>
								</Fragment>
							)
						})
					}
				</form>
		</main>
	)
};

export default App;