import React from "react"
import {Group, CellButton} from "@vkontakte/vkui";

class QuestButton extends React.Component{

    render(){
        return(
            <Group title={this.props.name}>
                <CellButton onClick={() => {this.props.onClick(this.props.id)}}>{this.props.desc}</CellButton>
            </Group>
        )
    }

}

export default QuestButton