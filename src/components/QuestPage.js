import React from "react"
import TextBox from "./TextBox";
import ButtonsList from "./ButtonsList";
import ImageContainer from "./ImageContainer";
import Swipe from "react-easy-swipe"
import Inventory from "./Inventory";

class QuestPage extends React.Component{

    constructor(){
        super()

        this.state={
            inInventory:false
        }

        this.onSwipeMove = this.onSwipeMove.bind(this)
    }

    render() {
        const content = (this.state.inInventory)?
            <div style={this.getStyle()}>
                {(this.props.node.image != null) ? <ImageContainer image={this.props.node.image}/> : null}
                <Inventory/>
            </div>
            :
            <div style={this.getStyle()}>
                {(this.props.node.image != null) ? <ImageContainer image={this.props.node.image}/> : null}
                <TextBox text={this.props.node.text}/>
                <ButtonsList actions={this.props.node.actions}/>
            </div>
        return(
            <Swipe
                onSwipeStart={this.onSwipeStart}
                onSwipeMove={this.onSwipeMove}
                onSwipeEnd={this.onSwipeEnd}
            >
                {content}
            </Swipe>
        )
    }

    getStyle(){
        return {
            height:"auto",
            display:"flex",
            flex:1,
            flexDirection:"column",
            justifyContent:'flex-start space-around',
            alignItems:"space-around",
            alignContent:"space-around",
        };
    }

    onSwipeStart(event) {

    }
    onSwipeEnd(event) {

    }

    onSwipeMove(position, event) {
        var minWidth = window.innerWidth / 4
        if (position.x < -minWidth && !this.state.inInventory){
            this.setState({inInventory:true})
        }else if(position.x > minWidth && this.state.inInventory){
            this.setState({inInventory:false})
        }
    }

}

export default QuestPage