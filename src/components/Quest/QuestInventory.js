import React from "react"
import {ModalPage, ModalPageHeader, ModalRoot, Div, Group, Progress, List, Header, Separator} from "@vkontakte/vkui";

const MODAL_PAGE_INFO = "info";

class QuestInventory extends React.Component{

    constructor(props){
        super(props);

        this.onShowAdditionalInfo = this.onShowAdditionalInfo.bind(this);
        this.onCloseAdditionalInfo = this.onCloseAdditionalInfo.bind(this);

        this.onSwipeMove = this.onSwipeMove.bind(this);

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
        const vals = this.props.globals.map((global, idx) => {
            const separator = idx < this.props.globals.length - 1 ? <Separator style={{ margin: '0' }} /> : null;
            switch (global.type) {
               case 0:
                   return(
                       <div key={global.name}>
                           <Div>
                               <Header>{global.name}:</Header>
                               <Header  level={"secondary"}>{global.value}</Header>
                           </Div>
                           {separator}
                       </div>
                   );
               case 1:
                   let num = Number(global.value);
                   if (isNaN(num)){
                       console.warn("wrong global type %i value format %s", global.type, global.value);
                       return null;
                   }
                   if(num < 0 || num > 100){
                       console.warn("wrong global type %i value %s", global.type, global.value);
                       num = num < 0 ? 0 : 100;
                   }
                   return (
                       <div key ={global.name}>
                           <Div>
                               <Header>{global.name}:</Header>
                               <Progress value={num}/>
                           </Div>
                           {separator}
                       </div>
                   );
               case 2:
                   if(!Array.isArray(global.value)){
                       console.warn("global type %i value is not an array: %s", global.type, global.value);
                       return null;
                   }

                   const values = global.value.map((val) => {
                       return <Header key={val} level="secondary">{val}</Header>;
                   });

                   return(
                     <div key ={global.name}>
                         <Div>
                             <Header>{global.name}:</Header>
                             <List>
                                 {values}
                             </List>
                         </Div>
                         {separator}
                     </div>
                   );
            }
        });
        return(
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id={MODAL_PAGE_INFO}
                    header={<ModalPageHeader>INFO</ModalPageHeader>}
                    onClose={this.onCloseAdditionalInfo}
                >
                    {vals}
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
        if (window.innerHeight - event.touches[0].clientY > window.innerHeight / 3){
            return
        }

        if(Math.abs(position.y) > minWidth){
            this.onShowAdditionalInfo()
        }
    }

}

export default QuestInventory