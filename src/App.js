import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {Root, View, Panel, PanelHeader, Spinner, HeaderButton, platform, IOS} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import QuestList from "./components/Quest/QuestList";
import Quest from "./components/Quest/Quest";

const textPlaceholder1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const actionPlaceholder1 = {id:"0", nextNodeId:"1", type:0, text:"Some action text"};
const actionPlaceholder2 = {id:"1", nextNodeId:"0", type:0, text:"Some text about how i like to do anything instead of my job"};
const actionPlaceholder3 = {id:"2", nextNodeId:"1", type:0, text:"Some action text without any sense of logic"};
const actions = [
	actionPlaceholder1,
	actionPlaceholder2,
	actionPlaceholder3
];

const questNodePlaceholder1 ={id:"0", text:textPlaceholder1, image:"https://cdn.akc.org/Marketplace/Breeds/Staffordshire_Bull_Terrier_SERP.jpg", actions:actions};
const questNodePlaceholder2 ={id:"1", text:textPlaceholder1, image:"https://www.k9web.com/wp-content/uploads/2019/01/staffordshire-bull-terrier.jpg", actions:actions};
const questNodes = [
	questNodePlaceholder1,
	questNodePlaceholder2
];

const quests = [
	{id:"1", name:"Quest1", desc:"Lorem ipsum dolor sit amet", author:"Andrew Bamby", nodes: questNodes},
	{id:"2", name:"Second Quest", desc:"Some placeholder text about how cool this quest is", author:"Kremdlya ZhepbI", nodes: questNodes},
	{id:"3", name:"The third and the last quest", desc:"The most unbelievable quest on the planet Earth.Trust me.", author:"The most unbelievable man on the planet Mars", nodes: questNodes}
];

class App extends React.Component{

	questListView = "questList";
	questListPanel = "questListPanel";
	questView = "quest";
	questPanel = "questPanel";

	osname = platform();

	constructor(props){
		super(props);

		this.requestQuests = this.requestQuests.bind(this);
		this.onQuestButtonClick = this.onQuestButtonClick.bind(this);
		this.onRequestBackToQuestList = this.onRequestBackToQuestList.bind(this);

		this.state={
			activeView:this.questListView,
			activeQuest:null,
			quests:null
		};
	}

	componentDidMount() {
		this.requestQuests();
	}

	render() {
		return (
			this.state.quests === null ?
				<Spinner size="large" />
				:
				<Root activeView={this.state.activeView}>
					<View activePanel={this.questListPanel} id={this.questListView}>
						<Panel id={this.questListPanel}>
							<PanelHeader>Quests</PanelHeader>
							<QuestList quests ={this.state.quests} onQuestButtonClick={this.onQuestButtonClick} />
						</Panel>
					</View>
					<View activePanel={this.questPanel} id={this.questView}>
						<Panel id={this.questPanel}>
							<PanelHeader
								left={
									<HeaderButton onClick={this.onRequestBackToQuestList}>
										{this.osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
									</HeaderButton>
								}
							>
								{this.state.activeQuest !== null ? this.state.activeQuest.name : null}
							</PanelHeader>
							{this.state.activeQuest !== null ? <Quest quest={this.state.activeQuest}/> : <Spinner size="large" />}
						</Panel>
					</View>
				</Root>
		)
	}

	requestQuests(){
		this.setState({quests:quests})
	}

	getQuest(id){
		for(let i = 0; i < this.state.quests.length; i += 1){
			const quest = this.state.quests[i];
			if(quest.id === id){
				return quest;
			}
		}
	}

	onRequestBackToQuestList(){
		this.setState({
			activeView:this.questListView,
			activeQuest:null
		})
	}

	onQuestButtonClick(id){
		this.setState({
			activeView:this.questView,
			activeQuest:this.getQuest(id)
		})
	}

}

export default App;

