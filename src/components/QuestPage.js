import React from "react"
import Container from "./Container";
import TextBox from "./TextBox";
import ActionButton from "./ActionButton";
import ButtonsList from "./ButtonsList";

class QuestPage extends React.Component{

    render() {
        console.log(this.props.node.actions)
        return(
            <div style={this.getStyle()}>
                <TextBox text={this.props.node.text}/>
                <ButtonsList actions={this.props.node.actions}/>
            </div>
        )
    }

    getStyle(){
        return {
            height:"100vh",
            display:"flex",
            flex:1,
            flexDirection:"column",
            justifyContent:'flex-start',
        };
    }

}

export default QuestPage