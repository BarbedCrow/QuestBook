import React from "react"

class TextBox extends React.Component{

    render(){
        if(this.props.text != "") {
            return(
                <div style={this.getStyle()}>
                    <p>{this.props.text}</p>
                </div>
            )
        }else{
            return(
                <div style={this.getStyle()}>
                    <img src ={this.props.image}/>
                </div>
            )
        }
    }

    getStyle(){
        return {
            flex:0.5,
            marginLeft: "1%",
            marginRight: "1%",
            marginTop: "1%",
            backgroundColor:"white",
            color:"black",
            border:"1px solid black",
            boxShadow: "inset 3px 3px 10px #ccc",
            borderRadius:"5px",
            padding:"1%",
            textAlign:"width",
        }
    }

}

export default TextBox