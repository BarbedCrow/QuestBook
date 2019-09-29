import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import Quest from "./components/Quest"
import QuestButtonsList from "./components/QuestButtonsList";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
			currentQuestId:""
		}

		this.onButtonClick = this.onButtonClick.bind(this)
		this.onBackButtonClick = this.onBackButtonClick.bind(this)
	}

	render(){
		const classes = makeStyles(theme => ({
			root: {
				flexGrow: 1,
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			title: {
				flexGrow: 1,
			},
		}));

		const backBtn = (this.state.currentQuestId !== "") ?
			<IconButton edge="start" onClick={this.onBackButtonClick} className={classes.menuButton} color="inherit" aria-label="menu">
				<ArrowBackIosIcon />
			</IconButton>
			:
			null

		const content = (this.state.currentQuestId === "")?
			<QuestButtonsList buttons = {buttons} onButtonClick={this.onButtonClick}/>
			:
			<Quest onBackButtonClick={this.onBackButtonClick} id ={this.state.currentQuestId}/>
		return(
			<div style ={this.getStyle()}>
				<AppBar position={"sticky"} style={{backgroundColor:"#4D708B"}}>
					<Toolbar>
						{backBtn}
						<Typography variant="h6" className={classes.title}>QuestBook</Typography>
					</Toolbar>
				</AppBar>
				{content}
			</div>
		)
	}

	onBackButtonClick(){
		this.onButtonClick("")
	}

	onButtonClick(id){
		this.setState({currentQuestId:id})
	}

	getStyle(){
		return {
			background: 'radial-gradient(#D6C594, #938B6A)',
			height:"auto",
			minHeight:"100vh"
		};
	}

}

export default App;

