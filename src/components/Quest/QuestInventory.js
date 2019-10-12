import React from "react"
import {ModalPage, ModalPageHeader, ModalRoot} from "@vkontakte/vkui";

const MODAL_PAGE_INFO = "info";

class QuestInventory extends React.Component{

    constructor(props){
        super(props);

        this.onShowAdditionalInfo = this.onShowAdditionalInfo.bind(this);
        this.onCloseAdditionalInfo = this.onCloseAdditionalInfo.bind(this);

        this.onSwipeMove = this.onSwipeMove.bind(this)

        this.state={
            activeModal:null
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    render() {
        return(
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id={MODAL_PAGE_INFO}
                    header={<ModalPageHeader>INFO</ModalPageHeader>}
                    onClose={this.onCloseAdditionalInfo}
                >

                </ModalPage>
            </ModalRoot>
        )
    }

    onShowAdditionalInfo(){
        this.setState({activeModal:MODAL_PAGE_INFO})
    }

    onCloseAdditionalInfo(){
        this.setState({activeModal:null})
    }

    onSwipeMove(position, event) {
        const minWidth = window.innerHeight / 8;
        if (window.innerHeight - event.touches[0].clientY > window.innerHeight / 4){
            return
        }

        if(Math.abs(position.y) > minWidth){
            this.onShowAdditionalInfo()
        }
    }

}

export default QuestInventory