import React from "react"
import {Group, Div} from "@vkontakte/vkui"
import ImageContainer from "../ImageContainer";
import QuestActionList from "./Action/QuestActionList";

class Quest extends React.Component{

    constructor(props){
        super(props);

        this.onNodeActionClick = this.onNodeActionClick.bind(this);

        this.state = {
            quest:this.props.quest,
            activeNodeIdx:0
        }
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
            console.warn("activeNodeIdx is out of boundaries: " + this.state.activeNodeIdx)
            return null
        }

        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        return(
            <Div>
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

                <QuestActionList actions={activeNode.actions} onButtonClick={this.onNodeActionClick}/>
            </Div>
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

}

export default Quest