import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./ItemsComponent";
import {addToDo, loadingToDo, deleteToDo} from "../actions";
import Page from "./PaginationComponent"
const mapDispatchToProps = dispatch => {
    return {
        loadingToDo: () => dispatch(loadingToDo(dispatch))
    };
};
const mapStateToProps = state => {
    //console.log(state)
    return {todos: state.todos, count: state.count};
};
class ProductList extends Component {
    componentDidMount () {
    //   console.log(this.props,"asd")

    }
    render(){
       let page=Math.ceil(this.props.count/6)
        return(
            <div >
                <ul className="list-group list-group-flush"  onLoad={this.handleSubmit}>
                <Item />
                    <Page/>
                </ul>

            </div>
        )
    }
};

const ListComponent=connect(mapStateToProps, mapDispatchToProps)(ProductList)
export default ListComponent



