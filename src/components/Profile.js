import React from "react"
import {Panel, Group, InfoRow, Div} from "@vkontakte/vkui";
import App from "../App";

class Profile extends React.Component{

    render() {
        return(
            <div>
                <Group title={"Statistics"}>
                    <Div>
                        <InfoRow title ={"Quests Completed"}>
                            over nine thousands
                        </InfoRow>
                    </Div>
                </Group>
            </div>
        );
    }

}
export default Profile