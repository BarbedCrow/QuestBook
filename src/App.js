import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
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
			backgroundColor: "#F5D089",
			height:"auto"
		};
	}

}

export default App;

