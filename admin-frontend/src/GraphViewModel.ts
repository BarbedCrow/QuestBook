type NodeId = number
type EdgeId = number

interface GraphViewModel {
    addBaseNode(text: string, pic: string, nodeState: State): NodeId

    addActionNode(node: ActionNodeBlaBla): NodeId

    addEdge(from: NodeId, to: NodeId, message: string): void

    deleteNode(id: NodeId): void

    deleteEdge(from: NodeId, to: NodeId): void

    addGlobalVariable(type: GlobalVariableType, justifyName: string, varName: string, init: any): void

    pushTheModel(questName: string): string

    incNode(justifyName: string): IncNode | null

    createLogicNode(tree: LogicNode): BranchNode

    addEdgeLogicPositive(logicNode: NodeId, node: NodeId): void

    addEdgeLogicNegative(logicNode: NodeId, node: NodeId): void

    setValue(justifyName: string, newValue: string): SetNode | null

}

function handleToGlobalName(varName: string): string {
    return `this.state.globals.${varName}.value`
}

interface LogicTreeGenerator {
   //todo
}

abstract class LogicNode {
}

abstract class LogicBase extends LogicNode {
    abstract value: string
}

class LogicVariable extends LogicBase {
    value: string;

    constructor(varName: string) {
        super();
        this.value = handleToGlobalName(varName)
    }
}

class LogicConst extends LogicBase {
    value: string;

    constructor(constant: any) {
        super();
        this.value = `"${constant}"`
    }
}

const True = new LogicConst(true);

abstract class BinaryLogicPredicate extends LogicNode {
    abstract operator: string;

    first: LogicNode = True;
    second: LogicNode = True;

    addFirst(another: LogicNode) {
        this.first = another
    }

    addSecond(another: LogicNode) {
        this.second = another
    }
}

class And extends BinaryLogicPredicate {
    operator = "&&"
}

class Equal extends BinaryLogicPredicate {
    operator = "=="
}

class BiggerOrEqualThan extends BinaryLogicPredicate {
    operator = ">="
}

enum State {
    START,
    ORDINARY,
    FINISH_BAD,
    FINISH_GOOD
}

enum GlobalVariableType {
    Int,
    Percent,
    String,
    ListItems,
}

interface ActionNodeBlaBla {
    code: string
    isBranching: boolean
}

class AddItemToList implements ActionNodeBlaBla {
    code: string;
    isBranching = false;

    constructor(varName: string, newItem: string) {
        this.code = varName + " + \"" + newItem + "\""
    }
}

function updateValue(name: string): string {
    return `function changeVariable(prevState, newValue) {\n        
                        let newGlobal = JSON.parse(JSON.stringify(prevState)).globals;\n        
                        newGlobal.${name}.value = newValue;
                        return newGlobal;
                        }\n`;
}

class IncNode implements ActionNodeBlaBla {
    code: string;
    isBranching = false;

    constructor(varName: string) {
        this.code = updateValue(varName) + `this.setState( prevState => ({
            globals: changeVariable(prevState, prevState.globals.${varName}.value + 1)
        }));`;
    }
}

class SetNode implements ActionNodeBlaBla {
    code: string;
    isBranching = false;

    constructor(varName: string, newValue: any) {
        this.code = updateValue(varName) + `this.setState( prevState => ({
            globals: changeVariable(prevState, "${newValue}")
        }));`;
    }
}

class BranchNode implements ActionNodeBlaBla {
    code: string;
    isBranching = true;

    constructor(condition: string) {
        this.code = `(${condition}) ? "true" : "false"`
    }
}

abstract class PreNode {
    abstract isDeleted: boolean;

    abstract toNormalNode(id: NodeId): AbstractNode
}

class BasePreNode extends PreNode {
    text: string;
    pic: string | null;
    nodeState: State;

    constructor(text: string, pic: string | null, nodeState: State | null) {
        super();
        this.isDeleted = false;
        this.text = text;
        this.pic = pic;
        this.nodeState = (nodeState == null) ? State.ORDINARY : nodeState;
    }

    toNormalNode(id: NodeId): BaseNode {
        return new BaseNode(id, this.text, this.pic)
    }

    isDeleted: boolean;
}

class ActionPreNode extends PreNode {
    code: string;
    isBranching: boolean;

    constructor(code: string, isBranching: boolean) {
        super();
        this.isDeleted = false;
        this.code = code;
        this.isBranching = isBranching;
    }

    toNormalNode(id: NodeId): ActionNode {
        return new ActionNode(id, this.code, this.isBranching)
    }

    isDeleted: boolean;
}

class PreEdge {
    from: NodeId;
    to: NodeId;
    transition: string | null;
    isDeleted: boolean;

    constructor(from: NodeId, to: NodeId, transition: string | null) {
        this.from = from;
        this.to = to;
        this.transition = transition;
        this.isDeleted = false;
    }
}

class Global {
    type: GlobalVariableType;
    varName: string;
    justifyName: string;
    value: any;

    constructor(varName: string, type: GlobalVariableType, justifyName: string, init: any) {
        this.type = type;
        this.varName = varName;
        this.justifyName = justifyName;
        this.value = init;
    }
}

class GraphViewModelImpl implements GraphViewModel {
    nodes = new Array<PreNode>();
    edges = new Array<PreEdge>();
    globals = new Map<string, Global>();

    addActionNode(node: ActionNodeBlaBla): NodeId {
        this.nodes.push(new ActionPreNode(node.code, node.isBranching));
        return this.nodes.length - 1
    }

    addBaseNode(text: string, pic: string | null, nodeState: State | null): NodeId {
        this.nodes.push(new BasePreNode(text, pic, nodeState));
        return this.nodes.length - 1
    }

    addEdge(from: NodeId, to: NodeId, message: string | null): EdgeId {
        this.edges.push(new PreEdge(from, to, message));
        return this.edges.length - 1
    }

    addGlobalVariable(type: GlobalVariableType, justifyName: string, varName: string, init: any) {
        this.globals.set(justifyName, new Global(varName, type, justifyName, init))
    }

    deleteNode(id: NodeId) {
        this.nodes[id].isDeleted = true
    }

    deleteEdge(edgeId: EdgeId) {
        this.edges[edgeId].isDeleted = true
    }

    pushTheModel(questName: String): string {
        return JSON.stringify(this.toModel())
    }

    private toModel(): Model {
        let model = new Model();
        model.globals = Array.from(this.globals.values());
        let curNodes = this.nodes.map((node, index) => {
            if (!node.isDeleted && (node instanceof BasePreNode)) {
                switch (node.nodeState) {
                    case State.START:
                        model.startNode = index;
                        break;
                    case State.FINISH_GOOD:
                        model.goodNodes.push(index);
                        break;
                    case State.FINISH_BAD:
                        model.badNodes.push(index);
                        break;
                }
            }
            return node.toNormalNode(index)
        });
        this.edges.forEach(edge => {
            if (!edge.isDeleted) curNodes[edge.from].links.push(new Edge(edge.transition, edge.to))
        });
        model.nodes = curNodes.filter(node => !this.nodes[node.id].isDeleted);
        return model
    }

    incNode(justifyName: string): IncNode | null {
        const value = this.globals.get(justifyName);
        if (value === undefined) return null; else return new IncNode(value.varName)
    }

    setValue(justifyName: string, newValue: any): SetNode | null {
        const value = this.globals.get(justifyName);
        if (value === undefined) return null; else return new SetNode(value.varName, newValue)
    }

    createLogicNode(tree: LogicNode): BranchNode {
        return new BranchNode(this.parseTree(tree))
    }

    parseTree(node: LogicNode): string {
        if (node instanceof LogicBase) {
            return node.value
        } else {
            if (node instanceof BinaryLogicPredicate)
            return `( ${this.parseTree(node.first)}) ${node.operator} (${this.parseTree(node.second)})`
        }
        return "true" //no value
    }

    addEdgeLogicNegative(logicNode: NodeId, node: NodeId): void {
        this.addEdge(logicNode, node, "true")
    }

    addEdgeLogicPositive(logicNode: NodeId, node: NodeId): void {
        this.addEdge(logicNode, node, "false")
    }
}


class Model {
    globals = new Array<Global>();
    startNode?: NodeId;
    goodNodes = new Array<NodeId>();
    badNodes = new Array<NodeId>();
    nodes = Array<AbstractNode>()
}

interface AbstractNode {
    id: NodeId
    links: Array<Edge>
}

class Edge {
    transition?: string | null;
    to: NodeId;

    constructor(description: string | null, to: NodeId) {
        this.transition = description;
        this.to = to
    }
}

class BaseNode implements AbstractNode {
    id: NodeId;
    text: string;
    pic: string | null;
    links = new Array<Edge>();

    constructor(id: NodeId, text: string, pic: string | null) {
        this.id = id;
        this.text = text;
        this.pic = pic;
    }

}

class ActionNode implements AbstractNode {
    id: NodeId;
    links: Array<Edge> = new Array<Edge>();
    code: string;
    isBranching: boolean;

    constructor(id: NodeId, code: string, isBranching: boolean) {
        this.id = id;
        this.code = code;
        this.isBranching = isBranching;
    }
}
function tupoikvest() {
    let graph = new GraphViewModelImpl();
    let start = graph.addBaseNode("hello", null, State.START);
    graph.addGlobalVariable(GlobalVariableType.Int, "Количество", "i", 0);
    graph.addGlobalVariable(GlobalVariableType.ListItems, "Предметы", "vasya", ["Нож", "Бутылка"]);
    let b1 = graph.addBaseNode("1", null, null);
    let b2 = graph.addBaseNode("2", null, null);
    let bincNode1 = graph.incNode("Количество");
    let bincNode2 = graph.incNode("Количество");
    if (bincNode1 !== null && bincNode2 !== null) {
        let binc = graph.addActionNode(bincNode1);
        let bincAgain = graph.addActionNode(bincNode2);
        let b4 = graph.addBaseNode("4", null, State.FINISH_BAD);
        let bend = graph.addBaseNode("end", null, State.FINISH_GOOD);
        graph.addEdge(start, b1, "i want 1");
        graph.addEdge(start, b2, "i want 2");
        graph.addEdge(b2, binc, "i want inc");
        graph.addEdge(binc, bincAgain, null);
        graph.addEdge(bincAgain, b4, "i want 4 where end");
        graph.addEdge(b1, bend, "i want to end");
        let json = graph.pushTheModel("blabla");
        console.log(json);
        console.log(JSON.parse(json))
    }
}

function testBranch() {
    let graph = new GraphViewModelImpl();
    let start = graph.addBaseNode("Какое твое имя, путник?", null, State.START);
    graph.addGlobalVariable(GlobalVariableType.String, "Имя", "name", "Нет пока имени");
    graph.addGlobalVariable(GlobalVariableType.Int, "Возраст", "age", "Нет пока возраста");
    let choiseP = graph.addBaseNode("Привет, Петр", null, null);
    let choiseV = graph.addBaseNode("Привет, Вася", null, null);
    let choiseAge = graph.addBaseNode("Выбери возраст", null, null);
    let setPetr = graph.setValue("Имя", "Петр");
    let setVasya = graph.setValue("Имя", "Вася");
    let set5 = graph.setValue("Возраст", 8);
    let set18 = graph.setValue("Возраст", 18);
    let good = graph.addBaseNode("Молодец", null, State.FINISH_GOOD);
    let bad = graph.addBaseNode("Ну ты и редиска, конечно", null, State.FINISH_BAD);
    let and = new And();
    let m18 = new LogicConst(18);
    let mVasya = new LogicConst("Вася");
    let varV = new LogicVariable("age");
    let varN = new LogicVariable("name");
    let eqV = new Equal();
    let eqN = new Equal();
    eqV.addFirst(mVasya);
    eqV.addSecond(varN);
    eqN.addFirst(m18);
    eqN.addSecond(varV);
    and.addFirst(eqV);
    and.addSecond(eqN);
    let logic = graph.createLogicNode(and);
    if (setPetr !== null && setVasya !== null && set5 !== null && set18 !== null) {
        let set5r = graph.addActionNode(set5);
        let set18r = graph.addActionNode(set18);
        let setv = graph.addActionNode(setVasya);
        let setp = graph.addActionNode(setPetr);
        let logicr = graph.addActionNode(logic);
        graph.addEdge(start, choiseV, "Вася");
        graph.addEdge(start, choiseP, "Петр");
        graph.addEdge(choiseP, setp, "Продолжить");
        graph.addEdge(choiseV, setv, "Продолжить");
        graph.addEdge(setv, choiseAge, null);
        graph.addEdge(setp, choiseAge, null);
        graph.addEdge(choiseAge, set5r, "5");
        graph.addEdge(choiseAge, set18r, "18");
        graph.addEdge(set5r, logicr, null);
        graph.addEdge(set18r, logicr, null);
        graph.addEdgeLogicPositive(logicr, good);
        graph.addEdgeLogicNegative(logicr, bad);
        let json = graph.pushTheModel("blabla");
        console.log(json);
        console.log(JSON.parse(json))
    }
}


export function handleGraph() {
    testBranch()
}