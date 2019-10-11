import React from "react";
import QuestAction from "./QuestAction";
import {Group} from "@vkontakte/vkui";

class QuestActionList extends React.Component{

    render() {
        const actions = this.props.actions !== null ?
            this.props.actions.map(act => <QuestAction key={act.id} text={act.text}/>)
            :
            "ERROR! You forgot to setup actions";

        return(
            <Group>
                {actions}
            </Group>
        )
    }

}

export default QuestActionList