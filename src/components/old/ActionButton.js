import React from "react"
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
class ActionButton extends React.Component{

    render() {
        return(
            <ListItem button alignItems="flex-start" onClick={this.props.action} style={this.getStyle()}>
                <ListItemIcon>
                    <ArrowRightOutlinedIcon fontSize={"inherit"} style={{color:"#4D708B"}} />
                </ListItemIcon>
                <ListItemText primary={this.props.text} />
            </ListItem>
        )
    }

    getStyle(){
        return {
            color: "#AC9357"
        }
    }

}
export default ActionButton