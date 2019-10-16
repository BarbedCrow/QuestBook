import React from "react"
import {Group, Div, FormLayoutGroup, FormLayout, Input, Gallery} from "@vkontakte/vkui"
import ImageContainer from "../ImageContainer";
import QuestActionList from "./Action/QuestActionList";
import QuestInventory from "./QuestInventory";

class Quest extends React.Component{

    constructor(props) {
        super(props);

        this.onNodeActionClick = this.onNodeActionClick.bind(this);
        this.checkInputAnswer = this.checkInputAnswer.bind(this);

        this.state = {
            quest: this.props.quest,
            activeNodeIdx: 0,
            activeModal: null,
            isShowInventoryTip:this.props.isFirstLaunch
        };
    }


    componentDidMount() {
        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        if(activeNode.actions === null){
            console.warn("actions is not set for node " + activeNode.id)
        }
        if(activeNode.text === ""){
            console.warn("actions is not set for node " + activeNode.id)
        }
    }

    render(){
        if (this.state.activeNodeIdx < 0 || this.state.activeNodeIdx >= this.state.quest.nodes.length){
            console.warn("activeNodeIdx is out of boundaries: " + this.state.activeNodeIdx);
            return null
        }

        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        return(
            <Gallery
                slideWidth="100%"
                align={"center"}
                style={{ height: "100%", width:"100%" }}

            >
                <div>
                    {
                        activeNode.image !== "" ?
                            <ImageContainer image={activeNode.image}/>
                            :
                            null
                    }

                    <Group>
                        <Div>
                            {activeNode.text !== "" ? activeNode.text : null}
                        </Div>
                    </Group>

                    {activeNode.actions.length === 1 && activeNode.actions[0].type === 1 ?
                        <FormLayout>
                            <FormLayoutGroup top="Answer">
                                <Input type="text" defaultValue="" onChange={(e) => this.checkInputAnswer(e)}/>
                            </FormLayoutGroup>
                        </FormLayout>
                        :
                        <QuestActionList actions={activeNode.actions} onButtonClick={this.onNodeActionClick}/>
                    }
                </div>
                <QuestInventory globals={this.state.quest.globals}/>

            </Gallery>
        )
    }

    onNodeActionClick(id){
        const action = this.getAction(id);
        this.setState({activeNodeIdx:action.nextNodeId});
    }

    getAction(id){
        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        for(let i = 0; i < activeNode.actions.length; i += 1){
            const node = activeNode.actions[i];
            if(node.id === id){
                return node;
            }
        }
    }

    checkInputAnswer(e){
        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        const action = activeNode.actions[0];
        const val = e.target.value;
        if (val === action.text){
            this.setState({activeNodeIdx:action.nextNodeId});
        }
    }

}

export default Quest