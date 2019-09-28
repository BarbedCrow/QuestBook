import React from "react"

class Inventory extends React.Component{

    render(){
        // parse this.props.globals

        return(
            <div>
                {/*there must be some components*/}
            </div>
        )
    }

    getStyle(){
        return {
            flex:0.5,
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