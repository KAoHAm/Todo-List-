// src/js/components/FormComponent.jsponent.js
import React, {Component} from "react";
import {connect} from "react-redux";
import uuidv1 from "uuid";
import {ADDING_ToDo} from "../constants/action-types";
import "./AppComoponentDis.css"
import { ValidatorComponent } from 'react-form-validator-core';
import TextValidator from "./ValidatorComponent"
import { ValidatorForm } from 'react-form-validator-core';

const mapDispatchToProps = dispatch => {
    return {
        addingToDo: (todo ) => dispatch({type: ADDING_ToDo, payload: {todo, dispatch }})
    };
};
const mapStateToProps = state => {
    return {todos: state.todos, count: state.count};
};

function addTime(time) {
    let d = time.split("")
    d.map(el => {
        if (el.charCodeAt(0) < 47 && el.charCodeAt(0) > 58) time = 0
    })
    if (time > 0) {
        const date = new Date()
        let v = new Date()
        let s= parseFloat(time)*60
        return v.setSeconds(date.getSeconds()+s)
    }
}

class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            deadLine: "30",
        };
        this.handleChangeDeadLine = this.handleChangeDeadLine.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleChangeDeadLine(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props)
        this.state.deadLine = addTime(this.state.deadLine)
        this.props.addingToDo(this.state);
        this.setState({title: "", deadLine: "30"});
        let count=this.props.count
        count ++
    }

    render() {
        const {title, deadLine } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <table width="350" >
                    < tbody >
                    < tr >
                        < td width="50%"> < p > Title </p> </td >
                        < td >< p > Complate minute </p></td >
                    </tr>
                    <tr>
                        <TextValidator
                            name="title"
                            type = "text"
                            className = "form-control"
                            id = "title"
                            value = {title}
                            onChange = {this.handleChangeTitle}
                            autoComplete="off"
                            validators={['required', 'isString']}
                            errorMessages={['Title is required.', 'Title is not valid.']}
                        />
                        <TextValidator
                            step="0.01"
                            name="time"
                            type = "number"
                            className = "form-control"
                            id = "deadLine"
                            value = {deadLine}
                            onChange = {this.handleChangeDeadLine}
                            autoComplete="off"
                            validators={['required', 'isFloat']}
                            errorMessages={['Time is required.', 'Time is not valid.']}
                        />
                    </tr>
                    </tbody >
                </table >
                <button
                    type = "submit"
                    className = "btn btn-success btn-lg" >
                    SAVE
                </button>
            </ValidatorForm>
        );
    }
}

const FormComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default FormComponent;