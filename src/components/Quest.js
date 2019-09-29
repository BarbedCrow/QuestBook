import React from "react"
import QuestPage from "./QuestPage"
import TextBox from "./TextBox";

class Quest extends React.Component {

    constructor(props) {
        super(props);
        let model = this.download();
        // type, varName, justifyName)
        let acc = "{";
        model.globals.forEach((value, index) => {
            if (index !== 0) acc += ",";
            let params = JSON.stringify({
                type: value.type,
                justifyName: value.justifyName,
                value: value.value
            });
            acc += `"${value.varName}" : ${params}`
        });
        acc += "}";
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

    download() {
        return JSON.parse(`{"globals":[{"type":2,"varName":"name","justifyName":"Имя","value":"Нет пока имени"},{"type":0,"varName":"age","justifyName":"Возраст","value":"Нет пока возраста"}],"startNode":0,"goodNodes":[4],"badNodes":[5],"nodes":[{"id":0,"text":"Какое твое имя, путник?","pic":null,"links":[{"transition":"Вася","to":2},{"transition":"Петр","to":1}]},{"id":1,"text":"Привет, Петр","pic":null,"links":[{"transition":"Продолжить","to":9}]},{"id":2,"text":"Привет, Вася","pic":null,"links":[{"transition":"Продолжить","to":8}]},{"id":3,"text":"Выбери возраст","pic":null,"links":[{"transition":"5","to":6},{"transition":"18","to":7}]},{"id":4,"text":"Молодец","pic":null,"links":[]},{"id":5,"text":"Ну ты и редиска, конечно","pic":null,"links":[]},{"id":6,"links":[{"transition":null,"to":10}],"code":"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.age.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, \\"8\\")\\n        }));","isBranching":false},{"id":7,"links":[{"transition":null,"to":10}],"code":"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.age.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, \\"18\\")\\n        }));","isBranching":false},{"id":8,"links":[{"transition":null,"to":3}],"code":"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.name.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, \\"Вася\\")\\n        }));","isBranching":false},{"id":9,"links":[{"transition":null,"to":3}],"code":"function changeVariable(prevState, newValue) {\\n        \\n                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\\n        \\n                        newGlobal.name.value = newValue;\\n                        return newGlobal;\\n                        }\\nthis.setState( prevState => ({\\n            globals: changeVariable(prevState, \\"Петр\\")\\n        }));","isBranching":false},{"id":10,"links":[{"transition":"false","to":4},{"transition":"true","to":5}],"code":"(( ( \\"Вася\\") == (this.state.globals.name.value)) && (( \\"18\\") == (this.state.globals.age.value))) ? \\"true\\" : \\"false\\"","isBranching":true}]}`)
    }

    isBaseNode(node) {
        return !(typeof node.text === "undefined")
    }

    getNode(index) {
        return this.state.model.nodes[index]
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let curNode = this.getNode(this.state.index);
        if (!this.isBaseNode(curNode)) {
            const evalAns = eval(curNode.code);
            if (curNode.links.length === 1) {

                this.setState({
                    index: curNode.links[0].to
                });

            } else {
                if (curNode.isBranching) {
                    console.log("we in Branch!");
                    const newNodeIndex = curNode.links.filter(edge => edge.transition === evalAns)[0].to;
                    // todo check newNodeIndex is int
                    this.setState({
                        index: newNodeIndex
                    });
                } else {
                    // todo check evalAns is int
                    this.setState({
                        index: evalAns
                    })
                }
            }
        }
    }

    render() {
        let curNode = this.getNode(this.state.index);
        let globalMap = this.state.globals;
        let globalsAsMap = new Array();
        for (const key in globalMap) {
            globalsAsMap.push(globalMap[key])
        }
        // console.log(this.state.globals.map((global)=> {global}));
        if (this.isBaseNode(curNode)) {
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
                actions: actions,
                input: curNode.input,
                globals: globalsAsMap
            };

            return (
                <div>
                    <QuestPage
                        node={questNode}
                    />
                </div>
            )
        } else {
            return <div>
                <TextBox/>
            </div>
        }
}

}

export default Quest