import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {View, Panel, PanelHeader, Spinner, HeaderButton, platform, IOS, Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import QuestList from "./components/Quest/QuestList";
import Quest from "./components/Quest/Quest";
import Profile from "./components/Profile";

const textPlaceholder1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const actionPlaceholder1 = {id:"0", nextNodeId:"1", type:0, text:"Some action text"};
const actionPlaceholder2 = {id:"1", nextNodeId:"2", type:0, text:"Some text about how i like to do anything instead of my job"};
const actionPlaceholder3 = {id:"0", nextNodeId:"0", type:1, text:"Answer"};
const actions = [
	actionPlaceholder1,
	actionPlaceholder2,
];

const questNodePlaceholder1 ={id:"0", text:textPlaceholder1, image:"https://cdn.akc.org/Marketplace/Breeds/Staffordshire_Bull_Terrier_SERP.jpg", actions:actions};
const questNodePlaceholder2 ={id:"1", text:textPlaceholder1, image:"https://www.k9web.com/wp-content/uploads/2019/01/staffordshire-bull-terrier.jpg", actions:actions};
const questNodePlaceholder3 ={id:"2", text:textPlaceholder1, image:"https://www.allthingsdogs.com/wp-content/uploads/2018/10/American-Pitbull-Terrier-Sleeping.jpg", actions:[actionPlaceholder3]};
const questNodes = [
	questNodePlaceholder1,
	questNodePlaceholder2,
	questNodePlaceholder3
];

const globals = [
	{type:0, name:"Money", value:"15000"},
	{type:0, name:"Authority", value:"1000"},
	{type:1, name:"Health Points", value:"100"},
	{type:1, name:"Manna", value:"100"},
	{type:1, name:"Quest Completion", value:"35"},
	{type:2, name:"Items", value:["Knife", "Chair", "Sugar"]},
];

const quests = [
	{id:"1", name:"The first quest", desc:"Lorem ipsum dolor sit amet", author:"Andrew Bamby", globals: globals, nodes: questNodes},
	{id:"2", name:"Second Quest", desc:"Some placeholder text about how cool this quest is", author:"Kremdlya ZhepbI", globals: globals, nodes: questNodes},
	{id:"3", name:"The third and the last quest", desc:"The most unbelievable quest on the planet Earth.Trust me.", author:"The most unbelievable man on the planet Mars", globals: globals, nodes: questNodes}
];

class App extends React.Component{

	static QUEST_LIST_VIEW = "questList";
	static QUEST_LIST_PANEL = "questListPanel";
	static QUEST_VIEW = "quest";
	static QUEST_PANEL = "questPanel";
	static PROFILE_VIEW = "profile";
	static PROFILE_PANEL = "profilePanel";

	osname = platform();

	constructor(props){
		super(props);

		this.requestQuests = this.requestQuests.bind(this);
		this.onQuestButtonClick = this.onQuestButtonClick.bind(this);
		this.onRequestBackToQuestList = this.onRequestBackToQuestList.bind(this);
		this.onStoryChange = this.onStoryChange.bind(this);

		this.state={
			activeStory:App.QUEST_LIST_VIEW,
			activeQuestStory:App.QUEST_LIST_VIEW,
			activeQuest:null,
			quests:null,
            isFirstLaunch:true
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
				<Epic activeStory={this.state.activeStory} tabbar={
					<Tabbar>
						<TabbarItem
							onClick={this.onStoryChange}
							selected={this.state.activeStory === this.state.activeQuestStory}
							data-story={this.state.activeQuestStory}
							text="Quests"
						>
							<Icon28Newsfeed />
						</TabbarItem>
						<TabbarItem
							onClick={this.onStoryChange}
							selected={this.state.activeStory === App.PROFILE_VIEW}
							data-story={App.PROFILE_VIEW}
							text="Profile"
						>
							<Icon28Newsfeed />
						</TabbarItem>
					</Tabbar>
				}>
					<View activePanel={App.QUEST_LIST_PANEL} id={App.QUEST_LIST_VIEW}>
						<Panel id={App.QUEST_LIST_PANEL}>
							<PanelHeader>Quests</PanelHeader>
							<QuestList quests ={this.state.quests} onQuestButtonClick={this.onQuestButtonClick} />
						</Panel>
					</View>
					<View activePanel={App.QUEST_PANEL} id={App.QUEST_VIEW}>
						<Panel id={App.QUEST_PANEL}>
							<PanelHeader
								left={
									<HeaderButton onClick={this.onRequestBackToQuestList}>
										{this.osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
									</HeaderButton>
								}
							>
								{this.state.activeQuest !== null ? this.state.activeQuest.name : null}
							</PanelHeader>
							{this.state.activeQuest !== null ? <Quest quest={this.state.activeQuest} isFirstLaunch={this.state.isFirstLaunch}/> : <Spinner size="large" />}
						</Panel>
					</View>
					<View id={App.PROFILE_VIEW} activePanel={App.PROFILE_PANEL}>
						<Panel id={App.PROFILE_PANEL}>
							<PanelHeader>Profile</PanelHeader>
							<Profile/>
						</Panel>
					</View>
				</Epic>
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

	onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story })
	}

	onRequestBackToQuestList(){
		this.setState({
			activeStory:App.QUEST_LIST_VIEW,
			activeQuestStory:App.QUEST_LIST_VIEW,
			activeQuest:null
		})
	}

	onQuestButtonClick(id){
		this.setState({
			activeStory:App.QUEST_VIEW,
			activeQuestStory:App.QUEST_VIEW,
			activeQuest:this.getQuest(id)
		})
	}

}

export default App;

