import React from "react"
import QuestButton from "./QuestButton";

class QuestList extends React.Component{

    render(){
        return this.props.quests.map(desc => <QuestButton key={desc.id} id={desc.id} name={desc.name} desc={desc.desc} author={desc.author} onClick={this.props.onQuestButtonClick}/>)
    }

}

export default QuestList