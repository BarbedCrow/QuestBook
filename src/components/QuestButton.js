import React from "react"
import {Button} from "@vkontakte/vkui";

class QuestButton extends React.Component{

    render(){
        return(
            <div style={this.getStyle()}>
                <h1>{this.props.header}</h1>
                <p>{this.props.desc}</p>
                <Button style={this.getBtnStyle()}>Start</Button>
            </div>
        )
    }

    getBtnStyle(){
        return{
            flex:1,
            color:"#FFB954",
            backgroundColor:"#384649",
            textAlign:"center",
        }
    }

    getStyle(){
        return{
            display:"flex",
            flexDirection:"column",
            textAlign:"center",
            border:"1px solid black",
            boxShadow: "inset 3px 3px 10px #ccc",
            borderRadius:"5px",
            backgroundColor:"#EFE9DB",
            padding:"1%",
            margin:"1%"
        }
    }

}

export default QuestButton