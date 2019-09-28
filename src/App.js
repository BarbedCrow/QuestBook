import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import Quest from "./components/Quest"
import QuestButtonsList from "./components/QuestButtonsList";

const buttons = [
	{header:"Quest 1", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 2", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 3", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 4", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 5", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 6", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 7", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 8", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 9", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 10", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},

];

class App extends React.Component{

	render(){
		return(
			<div style ={this.getStyle()}>
				{/*<QuestButtonsList buttons = {buttons}/>*/}
				<Quest/>
			</div>
		)
	}

	getStyle(){
		return {
			background: 'radial-gradient(#D6C594, #938B6A)',
			height:"100vh"
		};
	}

}

export default App;

