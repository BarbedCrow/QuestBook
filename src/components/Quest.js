import React from "react"
import QuestPage from "./QuestPage"

class Quest extends React.Component{

    Quest(){

    }

    render() {
        return(
            <div>
                <QuestPage text={"blabla"} image ={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}/>
            </div>
        )
    }

}

export default Quest