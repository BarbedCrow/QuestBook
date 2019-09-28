import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import Quest from "./components/Quest"

class App extends React.Component{

	render(){
		return(
			<div style ={this.getStyle()}>
				<Quest/>
			</div>
		)
	}

	getStyle(){
		return {
			backgroundColor: "#AC9357",
			height:"auto"
		};
	}

}

export default App;

