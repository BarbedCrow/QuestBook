import React from "react"
import {CellButton, Group} from "@vkontakte/vkui";
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron'

class QuestAction extends React.Component{

    render() {
        return(
            <Group>
                <CellButton before={<Icon16Chevron/>} >{this.props.text}</CellButton>
            </Group>
        )
    }

}

export default QuestAction