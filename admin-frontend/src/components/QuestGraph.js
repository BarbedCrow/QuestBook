import { Graph } from "react-d3-graph";
import React from "react";
import {handleGraph} from "../GraphViewModel";
import './Main.css';

export class QuestGraph extends React.Component {
    render() {
        return <Graph
            id="graph"
            data={this.props.data}
            config={this.props.config}
            onClickNode={this.props.onClickNode}
        />;
    }
}
