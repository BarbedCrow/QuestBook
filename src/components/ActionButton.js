import React from "react"
import {Button} from "@vkontakte/vkui";

class ActionButton extends React.Component{

    render() {
        return(
            <Button style={this.getStyle()}>{this.props.text}</Button>
        )
    }

    getStyle(){
        return(
            {
                display:"flex",
                marginLeft: "1%",
                marginRight: "1%",
                marginTop: "1%",
                color:"white",
                backgroundColor:"#306771",
            }
        )
    }

}
export default ActionButton