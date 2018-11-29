import React, {Component} from "react";
import {connect} from "react-redux";
import uuidv1 from "uuid";
import {DELETE_ToDo} from "../constants/action-types";
import  ItemsTodoComponent from "./ItemsTodoComponent"
const idv = uuidv1();

const mapStateToProps = state => {
    return {todos: state.todos};
};

const mapDispatchToProps = dispatch => {
    return {
        deleteToDo: _id => dispatch({type: DELETE_ToDo, payload: {_id}})
    }
}
const byTime =(p) => {
    p.sort((a,b)=>a.deadLine-b.deadLine)
}

class ConnectedItem extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 6,
            count: Number
        };
        this.handleClick = this.handleClick.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    goPrevPage() {
        let pageDegree=this.state.currentPage-1
        return  this.setState({currentPage: pageDegree})
    }

    goNextPage() {
        let pageAgree=this.state.currentPage+1
        this.setState({currentPage: pageAgree})
    }

    render() {
        let state=this.state
        let prop=this.props;
        state.todos=prop.todos
        state.count=Math.ceil(state.todos.length /state.todosPerPage)
        const { todos, currentPage, todosPerPage, count} = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos1 = currentTodos.map((todo, index) => {
            return  <ItemsTodoComponent delete={this.props.deleteToDo} key={idv+index} todo={todo} />;
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="page-item"
            key={number}
            id={number}
            onClick={this.handleClick}
             >
            {number}
        </li>
        );
        });

        const prevPage = currentPage === 1 ? null :
            <li
                id="page-numbers"
                className="page-numbers"
                onClick={this.goPrevPage}
            >Prev
            </li>;
        const nextpage = currentPage=== count ? null :
            <li
                id="page-numbers"
                className="page-item"
                onClick={this.goNextPage}
            >Next
            </li>;

        byTime(this.props.todos)
        const    renderTodos = () =>{
                return this.props.todos.map((todo, index) =>
                    <ItemsTodoComponent delete={this.props.deleteToDo} key={idv+index} todo={todo} />)
            }

        return (
            <div>
              {renderTodos1}
                <div id="page-numbers">
                    {prevPage}
            <ul className="pagination pagination-md" id="page-numbers">
                {renderPageNumbers}
            </ul>
                    {nextpage}
                </div>
            </div>

        );
    }
}

const Item = connect(mapStateToProps, mapDispatchToProps)(ConnectedItem);
export default Item

/*   <ul id="page-numbers">
                  {renderPageNumbers}
              </ul>*/