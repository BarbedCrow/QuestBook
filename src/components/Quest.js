import React from "react"
import QuestPage from "./QuestPage"

class Quest extends React.Component {

    constructor(props) {
        super(props);
        let model = this.download();
        // type, varName, justifyName)
        let acc = "{";
        model.globals.forEach( (value, index) => {
            if (index !== 0) acc += ",";
            let params = JSON.stringify({
                type: value.type,
                justifyName: value.justifyName,
                value: value.value
            });
            acc += `"${value.varName}" : ${params}`
        });
        acc += "}";
        console.log(acc);
        console.log(JSON.parse(acc));
        this.state = {
            model: model,
            globals: JSON.parse(acc),
            index: model.startNode
        };
        const varName = "i";
        // eval(`function changeVariable(prevState, newValue) {\n        let newGlobal = JSON.parse(JSON.stringify(prevState));\n        newGlobal.${varName}.value = newValue}` +
        //     `this.setState( prevState => ({
        //     globals: changeVariable(prevState, prevState.globals.${varName}.value + 1)
        // }));`);
                    console.log("before");

}

    download() { return JSON.parse("{\"globals\":[{\"type\":0,\"varName\":\"i\",\"justifyName\":\"Количество\",\"value\":0}],\"startNode\":0,\"finishNodes\":[5,6],\"nodes\":[{\"id\":0,\"text\":\"hello\",\"pic\":null,\"links\":[{\"transition\":\"i want 1\",\"to\":1},{\"transition\":\"i want 2\",\"to\":2}]},{\"id\":1,\"text\":\"1\",\"pic\":null,\"links\":[{\"transition\":\"i want to end\",\"to\":6}]},{\"id\":2,\"text\":\"2\",\"pic\":null,\"links\":[{\"transition\":\"i want inc\",\"to\":3}]},{\"id\":3,\"links\":[{\"transition\":null,\"to\":4}],\"code\":\"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.i.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, prevState.globals.i.value + 1)\\n        }));\",\"isBranching\":false},{\"id\":4,\"links\":[{\"transition\":\"i want 4 where end\",\"to\":5}],\"code\":\"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.i.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, prevState.globals.i.value + 1)\\n        }));\",\"isBranching\":false},{\"id\":5,\"text\":\"4\",\"pic\":null,\"links\":[]},{\"id\":6,\"text\":\"end\",\"pic\":null,\"links\":[]}]}"); }

    execUntilBaseNode(index) {
        const node = this.getNode(index);
        if (!this.isBaseNode(node)) {
            const evalAns = eval(node.code);
            if (node.links.length === 1) {
                return this.execUntilBaseNode(node.links[0].to)
            }
            if (node.isBranching) {
                const newNodeIndex = node.links.filter(edge => edge.transition === evalAns)[0].to;
                // todo check newNodeIndex is int
                return this.execUntilBaseNode(newNodeIndex)
            } else {
                function changeVariable(prevState, newValue) {
                    let newGlobal = JSON.parse(JSON.stringify(prevState));
                    newGlobal.k = newValue
                }

                this.setState( prevState => ({
                    globals: changeVariable(prevState, prevState.globals.k + 1)
                }));

                // todo check evalAns is int
                return this.execUntilBaseNode(evalAns)
            }
        } else {
            return node
        }
    }

    isBaseNode(node) {
        return !(typeof node.text === "undefined")
    }

    getNode(index) {
        return this.state.model.nodes[index]
    }

    render() {
        let curNode = this.getNode(this.state.index);
        console.log(this.state);
        const actions = curNode.links.map(edge => {
                let text = edge.transition;
                let to = edge.to;
                let action = () => {
                    let nextBaseNode = this.execUntilBaseNode(to);
                    this.setState({
                        index: nextBaseNode.id
                    })
                };

                return {
                    text: text,
                    action: action
                }
            }
        );

        const questNode = {
            text: curNode.text,
            image: curNode.pic,
            actions: actions
        };

        return (
            <div>
                <QuestPage
                    node={questNode}
                />
            </div>
        )
    }

}

export default Quest