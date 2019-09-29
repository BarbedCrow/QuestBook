import React from "react";
import './Main.css';
import {CustomNode} from "./CustomNode";
import {QuestGraph} from "./QuestGraph";
import {ConfigPanel} from "./config-panel/ConfigPanel";
import axios from 'axios';
import {Button} from "@material-ui/core";

const graphConfig = {
    directed: true,
    height: 700,
    width: 700,
    nodeHighlightBehavior: true,
    link: {
        highlightColor: "lightblue",
    },
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: null,
            dataLoaded: false,
            nodes: null,
            selectedNodeId: 1, // TODO
            globals: null,
            finishNodes: null,
            startNode: null,
            isPublished: false
        }
    }

    componentDidMount() {
        this.loadGraph();
    }

    questToJson() {
        return JSON.stringify({
            nodes: this.state.nodes,
            globals: this.state.globals,
            goodNodes: this.state.goodNodes,
            badNodes: this.state.badNodes,
            startNode: this.state.startNode
        })
    }

    saveToServer() {
        axios.post(`/api/quest/${this.state.questId}/`, {
            data: this.questToJson(),
            vk_id: 1 // TODO
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    loadGraph() {
        axios.get("/api/quests?vk_id=1") // TODO vk id
            .then(res => {
                const data = JSON.parse(res.data[0].data);
                console.log(data);
                this.setState({
                    questId: res.data[0].id,
                    dataLoaded: true,
                    nodes: data.nodes,
                    globals: data.globals,
                    goodNodes: data.goodNodes,
                    badNodes: data.badNodes,
                    startNode: data.startNode,
                    isPublished: data.isPublished
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    getSelectedNode() {
        if (!this.state.dataLoaded) {
            return null;
        }
        return this.state.nodes.filter(node => node.id === this.state.selectedNodeId)[0];
    }

    isStart(node) {
        // console.log(this.state.startNode);
        // console.log(node.id);
        // console.log(parseInt(this.state.startNode) === parseInt(node.id));
        return parseInt(this.state.startNode) === parseInt(node.id)
    }

    formattedData() {
        console.log(this.state.nodes);
        let nodes = this.state.nodes.map(node => {
            return {
                id: node.id,
                viewGenerator: node => (
                    <CustomNode
                        node={node}
                        isSelected={parseInt(node.id) === parseInt(this.state.selectedNodeId)}
                        isStart={this.isStart(node)}
                        isGoodFinish={this.state.goodNodes.includes(parseInt(node.id))}
                        isBadFinish={this.state.badNodes.includes(parseInt(node.id))}
                    />
                ),
                svg: '',
                size: 700,
                fontColor: "none",
                data: {
                    id: node.id,
                    text: node.text,
                    pic: node.pic,
                    code: node.code,
                    isBranching: node.isBranching,
                    links: node.links
                }
            }
        });
        let links = [];
        this.state.nodes.forEach(node => {
            node.links.forEach(link => {
                links.push({
                    source: node.id,
                    target: link.to
                });
            })
        });
        return {
            nodes: nodes,
            links: links
        };
    }

    save(id, text, code, links, pic) {
        let newNodes = [...this.state.nodes].filter(node => node.id !== id);
        console.log(id);
        newNodes.push({
            id: id,
            text: text,
            code: code,
            pic: pic,
            links: links
        });
        this.setState({ nodes: newNodes }, () => this.saveToServer());
    }

    addNode() {
        const newNodeId = Math.max(...this.state.nodes.map(node => node.id)) + 1;
        const newNode = {
            id: newNodeId,
            text: "",
            code: "",
            pic: "",
            links: []
        };
        this.setState({
            nodes: [...this.state.nodes, newNode]
        }, () => this.saveToServer());
    }

    onClickNode(nodeId) {
        this.setState({ selectedNodeId: parseInt(nodeId) });
    };

    render() {
        return (
            <div className="main-wrapper">
                <div className="main-graph-block-wrapper">
                    <div className="main-graph-wrapper">
                        {this.state.dataLoaded &&
                        <QuestGraph
                            onClickNode={nodeId => this.onClickNode(nodeId)}
                            data={this.formattedData()}
                            config={graphConfig}
                            // onClickNode={handleGraph()}
                        />}
                    </div>
                    <div className="main-graph-edit-panel">
                        <Button variant='contained'
                                color='primary'
                                onClick={() => this.addNode()}>
                            Добавить узел
                        </Button>
                    </div>
                </div>
                <div className="main-configpanel-wrapper">
                    <ConfigPanel node={this.getSelectedNode()}
                                 save={(id, text, code, links, pic) => this.save(id, text, code, links, pic)}/>
                </div>
            </div>
        );
    }
}

export default Main