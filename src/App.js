import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {Root, View, Panel, PanelHeader, Group, CellButton} from "@vkontakte/vkui";

class App extends React.Component{

	constructor(props){
		super(props);

		this.state={
			activeView:"view1"
		}
	}

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<View activePanel="panel1" id="view1">
					<Panel id="panel1">
						<PanelHeader>Quests</PanelHeader>
						<Group>
							<CellButton onClick={ () => this.setState({ activeView: 'view2' }) }>
								Open Quest
							</CellButton>
						</Group>
					</Panel>
				</View>
				<View activePanel="panel2" id="view2">
					<Panel id="panel2">
						<PanelHeader>Quest</PanelHeader>
						<Group>
							<CellButton onClick={ () => this.setState({ activeView: 'view1' }) }>
								Back to Quests
							</CellButton>
						</Group>
					</Panel>
				</View>
			</Root>
		)
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

