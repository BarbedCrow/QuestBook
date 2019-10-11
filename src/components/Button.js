import React from "react"
import {Group, CellButton} from "@vkontakte/vkui";

class Button extends React.Component{

    render(){
        return(
            <Group title={this.props.name}>
                <CellButton
                    before={this.props.icon}
                    onClick={() => {
                        if (this.props.onClick !== undefined){
                            this.props.onClick(this.props.id)
                        }else{
                            console.warn("click event handler is " + this.props.onClick)
                        }
                    }
                    }
                >
                    {this.props.text}
                </CellButton>
            </Group>
        )
    }

}

export default Button