import React from "react"
import {Group, Progress, List, Header} from "@vkontakte/vkui";

const MODAL_PAGE_INFO = "info";

class QuestInventory extends React.Component{

    constructor(props){
        super(props);

        this.onShowAdditionalInfo = this.onShowAdditionalInfo.bind(this);
        this.onCloseAdditionalInfo = this.onCloseAdditionalInfo.bind(this);

        this.state={
            activeModal:null
        }
    }

    render() {
        return (
            this.props.globals.map((global) => {
                switch (global.type) {
                    default:
                        console.warn("Unknown global %s type %i", global.name, global.type);
                        return <Group key={global.name}>Placeholder text</Group>;
                    case 0:
                        return(
                            <Group key={global.name}>
                                <Header>{global.name}:</Header>
                                <Header  level={"secondary"}>{global.value}</Header>
                            </Group>
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
                            <Group key ={global.name}>
                                <Header>{global.name}:</Header>
                                <Progress value={num}/>
                            </Group>
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
                            <Group key = {global.name}>
                                <Header>{global.name}:</Header>
                                <List>
                                    {values}
                                </List>
                            </Group>
                        );
                }
            })
        );
    }

    onShowAdditionalInfo(){
        this.setState({activeModal:MODAL_PAGE_INFO})
    }

    onCloseAdditionalInfo(){
        this.setState({activeModal:null})
    }

}

export default QuestInventory