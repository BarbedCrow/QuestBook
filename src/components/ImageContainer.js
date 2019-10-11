import React from "react"
class ImageContainer extends React.Component{

    render() {
        return(
            <img style={this.getStyle()} src={this.props.image} alt={this.props.image}/>
        )
    }

    getStyle(){
        return{
            height: "100%",
            width :"100%"
        }
    }

}

export default ImageContainer