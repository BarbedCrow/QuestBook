import React from "react"
import Container from "./Container";
import TextBox from "./TextBox";
import ActionButton from "./ActionButton";
import ButtonsList from "./ButtonsList";
import ImageContainer from "./ImageContainer";

class QuestPage extends React.Component{

    render() {
        console.log(this.props.node.actions)
        return(
            <div style={this.getStyle()}>
                {(this.props.node.image != null) ? <ImageContainer image={this.props.node.image}/> : null}
                <TextBox text={this.props.node.text}/>
                <ButtonsList actions={this.props.node.actions}/>
            </div>
        )
    }

    getStyle(){
        return {
            height:"auto",
            display:"flex",
            flex:1,
            flexDirection:"column",
            justifyContent:'flex-start space-around',
            alignItems:"space-around",
            alignContent:"space-around",
        };
    }

}

export default QuestPage