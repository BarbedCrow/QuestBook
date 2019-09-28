import React from "react"
import ActionButton from "./ActionButton";
import Divider from "@material-ui/core/Divider";

class ButtonsList extends React.Component{

    render() {
        const btns = this.props.actions.map((button) => {
            return(
                <div>
                    <ActionButton text = {button.text} action = {button.action} />
                    <Divider variant="inset"  />
                </div>
            )
        });
        return(
            <div style={this.getStyle()}>
                {btns}
            </div>
        )
    }

    getStyle(){
        return{
            display:"flex",
            flexDirection:"column",
            marginLeft: "1%",
            marginRight: "1%",
            marginTop: "1%",
            marginBottom: "1%",
            border:"1px solid black",
            boxShadow: "inset 3px 3px 10px #ccc",
            backgroundColor:"#EFE9DB",
            borderRadius:"5px"
        }
    }

}

export default ButtonsList
