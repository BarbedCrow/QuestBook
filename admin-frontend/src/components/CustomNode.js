import React from "react";
import "./CusomNode.css";

export class CustomNode extends React.Component {


    render() {
        const data = this.props.node.data;
        const nodeClass = data.code === undefined ? 'graph-node-base' : 'graph-node-logic';
        return <div className={`${this.props.isSelected ? "graph-node-selected" : "graph-node"} ${nodeClass}`}>
            <div className="graph-node-id-wrapper">
                <p className="small-text">{data.id}</p>
            </div>
            <div className="graph-node-content-wrapper">
                {data.code !== undefined &&
                <p className="small-text">{data.code}</p>}
                {data.text !== undefined &&
                <p className="small-text">{data.text}</p>}
            </div>
        </div>;
    }
}