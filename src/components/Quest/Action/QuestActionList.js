import React from "react";
import Button from "../../Button";
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron'

class QuestActionList extends React.Component{

    render() {
        return(
            this.props.actions !== null ?
                this.props.actions.map(act => <Button icon={<Icon16Chevron/>}  onClick={this.props.onButtonClick} key={act.id} id={act.id} text={act.text}/>)
            :
                null
        )
    }

}

export default QuestActionList