import React from "react"
class ImageContainer extends React.Component{

    render() {
        return(
            <img style={this.getStyle()} src={this.props.image}/>
        )
    }

    getStyle(){
        return{
            marginLeft: "1%",
            marginRight: "1%",
            marginTop: "1%",
            border:"1px solid black",
            borderRadius:"5px",
            flex:1,
            alignSelf:"stretch",
            objectFit:"contain",
            height: "100%",
            width :"97.7%"
        }
    }

}

export default ImageContainer