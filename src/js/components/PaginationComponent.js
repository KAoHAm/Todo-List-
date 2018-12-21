import React, {Component} from "react";
import {connect} from "react-redux";
import {LOADING_ToDo } from "../constants/action-types";

const mapStateToProps = state => {

    return {todos: state.todos, count: state.count, links: state.links};
};
const mapDispatchToProps = dispatch=> {

    return{
        loadingToDo: page => dispatch({type: LOADING_ToDo, payload: {page, dispatch}})
    }
};

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 6,

        };
        this.handleClick = this.handleClick.bind(this);
        this.goFirstPage = this.goFirstPage.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.goLastPage = this.goLastPage.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
    }
    componentDidMount(){
        this.props.loadingToDo(this.state.currentPage)
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });

        this.props.loadingToDo(Number(event.target.id))
    }
    goFirstPage(){
        this.props.loadingToDo(1)
    }
    goPrevPage() {
        this.state.currentPage--
        this.props.loadingToDo(this.state.currentPage)
    }

    goNextPage() {
        this.state.currentPage++
        this.props.loadingToDo(this.state.currentPage)
    }
    goLastPage(){
        this.props.loadingToDo(this.state.count)
    }

    render() {
        this.state.count=Math.ceil(this.props.count/this.state.todosPerPage)
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= this.state.count; i++) {
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

        // Logic for displaying buttonst "first", "Prev", "next" and "last"

        const firstPage = this.state.currentPage < 3 ? null :
            <li
                id="page-numbers"
                className="page-numbers"
                onClick={this.goFirstPage}
            >First
            </li>;

        const prevPage = this.state.currentPage < 2 ? null :
            <li
                id="page-numbers"
                className="page-numbers"
                onClick={this.goPrevPage}
            >Prev
            </li>;
        const nextpage = this.state.count =this.state.currentPage  ? null :
            <li
                id="page-numbers"
                className="page-item"
                onClick={this.goNextPage}
            >Next
            </li>;
        const lastpage = this.state.count < 3 ? null :
            <li
                id="page-numbers"
                className="page-item"
                onClick={this.goLastPage}
            >Last
            </li>;

        return (
            <div id="page-numbers">
                {firstPage}
                {prevPage}
                <ul className="pagination pagination-md" id="page-numbers">
                    {renderPageNumbers}
                </ul>
                {nextpage}
                {lastpage}
            </div>
        )
    }
}

const Page = connect(mapStateToProps, mapDispatchToProps)(Pagination);
export default Page