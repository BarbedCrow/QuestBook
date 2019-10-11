import React from "react"
import Button from "../Button";

class QuestList extends React.Component{

    render(){
        return this.props.quests.map(desc => <Button key={desc.id} id={desc.id} name={desc.name} text={desc.desc} author={desc.author} onClick={this.props.onQuestButtonClick}/>)
    }

}

export default QuestList