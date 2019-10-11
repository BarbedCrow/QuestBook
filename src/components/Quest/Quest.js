import React from "react"
import {Group, Div} from "@vkontakte/vkui"
import ImageContainer from "../ImageContainer";
import QuestActionList from "./Action/QuestActionList";

class Quest extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            quest:this.props.quest,
            activeNodeIdx:0
        }
    }

    render(){
        const activeNode = this.state.quest.nodes[this.state.activeNodeIdx];
        return(
            <Group>
                {
                    activeNode.image !== "" ?
                    <Div>
                        <ImageContainer image={activeNode.image}/>
                    </Div>
                    :
                    null
                }
                <Div>
                    {activeNode.text !== "" ? activeNode.text : "ERROR! You forgot to setup text for node with id " + activeNode.id}
                </Div>
                <QuestActionList actions={activeNode.actions}/>
            </Group>
        )
    }

}

export default Quest