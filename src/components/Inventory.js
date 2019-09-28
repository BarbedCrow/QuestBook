import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress";
import {withStyles} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#4D708B', 0.75),
        borderRadius: 20
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#4D708B',
    },
})(LinearProgress);

class Inventory extends React.Component{

    render(){
        return(
            <div>
                <h1 style={this.mainHeaderStyle()}>Инфо</h1>
                <div style={this.getStyle()}>
                    {this.parseGlobals(this.props.globals)}
                </div>
            </div>
        )
    }

    parseGlobals(globals){
        return globals.map((global) => this.parseGlobal(global))
    }

    parseGlobal(global){
        if(global.type === 0 || global.type === 2){
            return <h3>{global.justifyName}: {global.value}</h3>
        }else if(global.type === 1){
            return(
                <div>
                    <h3>{global.justifyName}:</h3>
                    <BorderLinearProgress
                        variant="determinate"
                        color="secondary"
                        value={global.value}
                    />
                </div>
            )
        }else if(global.type === 3){
            const items = global.value.map((item) => {
                return(
                    <div style={this.itemStyle()}>
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                    </div>
                )
            });
            return(
                <div style={this.itemsListStyle()}>
                    <h3>{global.justifyName}:</h3>
                    {items}
                </div>
            )
        }
    }

    itemStyle(){
        return{
            display:"flex",
            flexDirection:"row",
            flex:1,
            flexWrap:"nowrap"
        }
    }

    itemsListStyle(){
        return{
            display:"flex",
            flexDirection:"column"
        }
    }

    mainHeaderStyle(){
        return{
            textAlign:"center",
            color:"#4D708B"
        }
    }

    getStyle(){
        return {
            flex:1,
            flexDirection:"column",
            marginLeft: "1%",
            marginRight: "1%",
            marginTop: "1%",
            backgroundColor:"#FFFBF2",
            color:"#4D708B",
            border:"1px solid black",
            boxShadow: "inset 3px 3px 10px #ccc",
            borderRadius:"5px",
            padding:"1%",
            textAlign:"width",
        }
    }

}

export default Inventory