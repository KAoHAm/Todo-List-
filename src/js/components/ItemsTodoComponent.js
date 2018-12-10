import React, { Component} from 'react'

function getDateTime(unixTime) {
    let d = new Date(unixTime);
    let h = (d.getHours().toString().length == 1) ? ('0' + d.getHours()) : d.getHours();
    let m = (d.getMinutes().toString().length == 1) ? ('0' + d.getMinutes()) : d.getMinutes();
    let s = (d.getSeconds().toString().length == 1) ? ('0' + d.getSeconds()) : d.getSeconds();
    let day = (d.getDate().toString().length == 1) ? ('0' + d.getDate()) : d.getDate();
    let mount=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Oug", "Sep", "Oct", "Nov", "Dec" ];
    let mi = d.getMonth()
    let time = h + ':' + m +":"+s+" "+day+" "+ mount[mi];
    return time;
}

const ItemsTodoComponent = props => {
    parseFloat(props.todo.deadLine)
    let myTime = getDateTime(props.todo.deadLine);

     return (
        <div>
            <table>
                <tbody>
                <tr >
                    <td width="50% ">{props.todo.title}</td>
                    <td width="40% "  >{myTime }</td>
                    <td>  <button className="btn-success btn-lg"
                        onClick={() => props.delete(props.todo._id)} >
                        -
                    </button></td>
                </tr>
                </tbody>
            </table>
        </div>
    )}

export default ItemsTodoComponent;
