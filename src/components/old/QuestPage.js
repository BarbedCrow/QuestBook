import React from "react"
import TextBox from "./TextBox";
import ButtonsList from "./ButtonsList";
import ImageContainer from "./ImageContainer";
import Swipe from "react-easy-swipe"
import Inventory from "./Inventory";
import InputText from "./InputText";

class QuestPage extends React.Component{

    constructor(){
        super();

        this.state={
            inInventory:false
        };

        this.onSwipeMove = this.onSwipeMove.bind(this)
        this.onCheckInputSuccess = this.onCheckInputSuccess.bind(this)
    }

    componentDidMount() {
        this.setState({actions:this.props.node.actions})
    }

    render() {
        console.log(this.props.node)
        const actions = (this.props.node.isLast)? this.props.node.endpointActions : this.props.node.actions
        const content = (this.state.inInventory)?
            <div style={this.getStyle()}>
                {(this.props.node.image != null) ? <ImageContainer image={this.props.node.image}/> : null}
                <Inventory globals={this.props.node.globals}/>
            </div>
            :
            <div style={this.getStyle()}>
                {(this.props.node.image != null) ? <ImageContainer image={this.props.node.image}/> : null}
                <TextBox text={this.props.node.text}/>
                {
                    (this.props.node.input != null)?
                        <InputText onCheckSuccess={this.onCheckInputSuccess} answer={this.props.node.input}/>
                        :
                        <ButtonsList actions={actions}/>
                }
            </div>;
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

    onCheckInputSuccess(){
        if(this.state.actions.length === 0){
            return
        }

        this.state.actions[0].action()
    }

    onSwipeStart(event) {

    }
    onSwipeEnd(event) {

    }

    onSwipeMove(position, event) {
        const minWidth = window.innerWidth / 8
        if (position.x < -minWidth && !this.state.inInventory){
            this.setState({inInventory:true})
        }else if(position.x > minWidth && this.state.inInventory){
            this.setState({inInventory:false})
        }
    }

}

export default QuestPage