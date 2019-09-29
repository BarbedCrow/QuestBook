import React from "react"
import QuestButton from "./QuestButton";

class QuestButtonsList extends React.Component{

    render() {
        const buttons = this.props.buttons.map((button) => <QuestButton key={button.id} header={button.header} desc={button.desc} onButtonClick={this.props.onButtonClick} id={button.id}/>);
        return(
            <div style={this.getStyle()}>
                {buttons}
            </div>
        )
    }

    getStyle(){
        return{
            height:"auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-around",
            alignContent:"space-around",
        }
    }

}

export default QuestButtonsList