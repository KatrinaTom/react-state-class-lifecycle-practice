import React from "react"
import Clock from "./Clock"

// const App = () => {
// 	let position = null
// 	window.navigator.geolocation.getCurrentPosition (
// 		position => console.log(position),
// 		error => console.error(error)
// 	)

// 	return (
// 		<div>
// 			<hi1>{position}</hi1>
// 			<Clock date={new Date()} />
// 		</div>
// 	)
// }

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {latitude: null, errorMessage: '', date: new Date()}

		
		console.log( "1. CONSTRUCTOR Runs First" )
	}

	isItWarm() {
		const {latitude} = this.state
		const month = new Date().getMonth()

		if (((month > 4 && month <= 9) && latitude > 0) || ((month <= 4 || month > 9) && latitude < 0) || latitude === 0) {
			return true
		}
		return false
	}

	getClockIcon() {
		if (this.isItWarm()) {
			return "/summer.png"
		}
		return "/winter.png"
	}

	tick() {
		this.setState({date: new Date()})
	}

	componentDidMount() {
		console.log( "3. component DID MOUNT runs after first render" )
		window.navigator.geolocation.getCurrentPosition (
			position => this.setState({latitude: position.coords.latitude}),
			error => this.setState({errorMessage: error.Message})
		)
	}

	componentDidUpdate(prevState) {
		console.log( "4. component DID UPDATE, runs after susequent renders not on the first render" )
		if (prevState.date !== this.state.date) {
			this.timerId = setInterval(() => this.tick() , 1000)
		}
	}

	componentWillUnmount() {
		console.log( "5. component WILL UNMOUNT runs after first render" )
	}

	render(){
		console.log( "2. RENDER Runs Second" )
		const {latitude, errorMessage, date} = this.state
		return(
			<div>
				<h1>{latitude}</h1>
				{errorMessage || 
					<Clock 
						date={date}  
						icon={latitude ? this.getClockIcon() : null }
					/>
				}
			</div>
		)
	}

	// render() {
	// 	const {latitude, errorMessage} = this.state
	// 	return (
	// 		<div>
	// 			<h1>{latitude}</h1>
	// 			{errorMessage || 
	// 				<Clock 
	// 					date={new Date()} />}
	// 					icon={latitude ? this.getClockIcon() : null }


	// 		</div>
		
	// 	)
	// }
}

export default App
