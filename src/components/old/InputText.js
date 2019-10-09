import React from "react"
import TextField from "@material-ui/core/TextField";

class InputText extends React.Component{

    constructor(){
        super()
        this.state={
            text:"",
            answer:""
        }
        this.setStateInner = this.setStateInner.bind(this)
    }

    componentDidMount() {
        this.setState({answer:this.props.answer})
    }

    render(){
        return <TextField
            id="standard-multiline-flexible"
            label="Ответ"
            multiline
            rowsMax="4"
            value={this.state.text}
            onChange={event => this.setStateInner(event)}
            style={this.inputStyle()}
            margin="normal"
        />
    }

    inputStyle(){
        return{
            backgroundColor:"#FFFBF2",
            color:"#4D708B",
            border:"1px solid black",
            boxShadow: "inset 3px 3px 10px #ccc",
            borderRadius:"5px",
            padding:"1%"
        }
    }

    setStateInner(event){
        this.setState({text:event.target.value})
        if(event.target.value === this.state.answer){
            this.props.onCheckSuccess()
        }
    }

}

export default InputText