import React from "react"
import TextBox from "./TextBox";

class Container extends React.Component{

    render() {
        if(this.props.text != ""){
            return(
                <div style={this.getStyle()}>
                    <TextBox text = {this.props.text}/>
                    <TextBox image = {this.props.image}/>
                </div>
            )
        }
    }

    getStyle(){
        return {
            display:"flex",
            flexGrow: "1",
            marginLeft: "1%",
            marginRight: "1%",
            marginTop: "1%",
            justifyContent:"flex-start space-around",
            flexDirection:"row",
        };
    }

}

export default Container