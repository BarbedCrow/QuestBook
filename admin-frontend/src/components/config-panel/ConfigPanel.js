import React from "react";
import "./ConfigPanel.css";
import {Select, MenuItem, Button, TextField}  from '@material-ui/core';

export class ConfigPanel extends React.Component {
    constructor(props) {
        super(props);
        const node = this.props.node;
        this.state = {
            text: node == null ? null : node.text,
            pic: node == null ? null : node.pic,
            code: node == null ? null : node.code,
            nodeType: node == null ? null : (node.code === null ? "base" : "logic"),
            links: node == null ? null : node.links,
            newLinkId: "",
            newLinkText: "",
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const node = nextProps.node;
        this.setState({
            text: node == null ? null : node.text,
            pic: node == null ? null : node.pic,
            code: node == null ? null : node.code,
            nodeType: node == null ? null : (node.code === undefined ? "base" : "logic"),
            links: node == null ? null : node.links
        });
    }

    handleChange(event) {
        this.setState({ nodeType: event.target.value });
    }

    save() {
        this.props.save(this.props.node.id, this.state.text, this.state.code, this.state.links, this.state.pic);
    }

    addLink() {
        let newLinks = [...this.state.links];
        newLinks.push({
            to: parseInt(this.state.newLinkId),
            transition: this.state.newLinkText
        });
        this.setState({
            links: newLinks,
            newLinkId: "",
            newLinkText: ""
        });
    }

    deleteLink(to) {
        this.setState({
            links: this.state.links.filter(link => link.to !== to)
        });
    }

    render() {
        const node = this.props.node;
        console.log(node);
        return (
            <div className="configpanel-wrapper">
                {this.props.node === null ?
                    <p>выбери ноду</p>
                :
                    <div>
                        <p>id: {node.id}</p>
                        <div className="configpanel-type-select-wrapper">
                            <p style={{ marginRight: "10px" }}>тип узла:</p>
                            <Select
                                value={this.state.nodeType}
                                onChange={e => this.handleChange(e)}>
                                <MenuItem value="base">базовый</MenuItem>
                                <MenuItem value="logic">логический</MenuItem>
                            </Select>
                        </div>
                        <div className="configpanel-content-wrapper">
                            {this.state.nodeType === 'logic' ?
                            <div>
                                <p>сюда писать логику -- надо придумать как </p>
                            </div>
                            :
                            <div>
                                <p>сюда писать текст:</p>
                                <TextField
                                    label="описание узла"
                                    multiline
                                    fullWidth
                                    margin="normal"
                                    value={this.state.text}
                                    onChange={e => this.setState({ text: e.target.value })}
                                />
                            </div>}
                        </div>
                        <p>Переходы:</p>
                        {this.state.links.map(link => {
                            return (
                                <div className="configpanel-links-item-wrapper">
                                    <div className="configpanel-links-item-data-wrapper">
                                        <p className="text-nomargin">куда: {link.to}</p>
                                        <p className="text-nomargin">текст перехода: {link.transition}</p>
                                    </div>
                                    <div className="configpanel-links-item-delete-button-wrapper">
                                        <Button variant='outlined'
                                                color='primary'
                                                size='small'
                                                onClick={() => this.deleteLink(link.to)}>
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="configpanel-link-add-wrapper">
                            <div className="configpanel-link-add-id-wrapper">
                                <TextField
                                    label="id конечного узла"
                                    margin="normal"
                                    value={this.state.newLinkId}
                                    onChange={e => this.setState({ newLinkId: e.target.value })}
                                />
                            </div>
                            <TextField
                                label="описание перехода"
                                multiline
                                fullWidth
                                margin="normal"
                                value={this.state.newLinkText}
                                onChange={e => this.setState({ newLinkText: e.target.value })}
                            />
                            <Button variant='outlined'
                                    color='primary'
                                    size='small'
                                    onClick={() => this.addLink()}>
                                Добавить переход
                            </Button>
                        </div>
                        <Button variant='outlined'
                                color='primary'
                                onClick={() => this.save()}>
                            Сохранить
                        </Button>
                    </div>}
            </div>
        );
    }
}
