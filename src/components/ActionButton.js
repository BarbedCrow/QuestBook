import React from "react"
import {Button, CellButton} from "@vkontakte/vkui";
import Icon24Send from '@vkontakte/icons/dist/24/send';
import Icon24Add from '@vkontakte/icons/dist/24/add';

class ActionButton extends React.Component{

    render() {
        return(
            <CellButton style={this.getStyle()} before={<Icon24Send style={{color:"#4D708B"}}/>} >{this.props.text}</CellButton>
        )
    }

    getStyle(){
        return(
            {
                display:"flex",
                marginLeft: "1%",
                marginRight: "1%",
                marginTop: "1%",
                color:"#AC9357"
            }
        )
    }

}
export default ActionButton