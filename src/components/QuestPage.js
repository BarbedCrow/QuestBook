import React from "react"
import Container from "./Container";
import TextBox from "./TextBox";
import ActionButton from "./ActionButton";

class QuestPage extends React.Component{

    render() {
        return(
            <div style={this.getStyle()}>
                <TextBox text={"text"}/>
                <ActionButton text ={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by."}/>
            </div>
        )
    }

    getStyle(){
        return {
            height:"100vh",
            display:"flex",
            flex:1,
            flexDirection:"column",
            justifyContent:'flex-start',
        };
    }

}

export default QuestPage