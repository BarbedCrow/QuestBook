import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import Quest from "./components/Quest"
import QuestButtonsList from "./components/QuestButtonsList";

const buttons = [
	{header:"Quest 1", id:"1" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 2", id:"2" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 3", id:"3" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 4", id:"4" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 5", id:"5" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 6", id:"6" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 7", id:"7" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 8", id:"8" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 9", id:"9" , desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},
	{header:"Quest 10", id:"10", desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},

];

class App extends React.Component{

	constructor(){
		super()

		this.state={
			currentQuestId:-1
		}

		this.setStateIternal = this.setStateIternal.bind(this)
	}

	render(){
		const content = (this.state.currentQuestId === -1)?
			<QuestButtonsList buttons = {buttons} onButtonClick={this.setStateIternal}/>
			:
			<Quest id ={this.state.currentQuestId}/>
		return(
			<div style ={this.getStyle()}>
				{content}
			</div>
		)
	}

	setStateIternal(id){
		this.setState({currentQuestId:id})
	}

	getStyle(){
		return {
			background: 'radial-gradient(#D6C594, #938B6A)',
			height:"100vh"
		};
	}

}

export default App;

