import React, { Component } from 'react'
import axios from 'axios'

export default class List extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             error: null,
             loading: false,
             items: [],
        }
        this.clickDelete = this.clickDelete.bind(this);
    }
    
    componentDidMount(){
        fetch("/get/tasks")
        .then(response => response.json())
        .then(
            (result)=>{
                this.setState({
                    items: result.tasks,
                    loading: true
                });
            },
            (error)=>{
                this.setState({
                    loading: true,
                    error 
                });
            }
        );
    }

    clickDelete(event){
        var request = {id: event.currentTarget.id}
        axios.post("/delete/task", request)
            .then(response => {
                this.setState({
                    items: response.data.tasks
                });
            });
    }
    

    render() {
        const{error, loading, items} = this.state;
        if(error){
            return (
                <p> ERROR {error.message} </p>
            )
        }else if(!loading){
            return (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )
        }else if(this.props.newTasks == 0){
            return (
                <div>
                    <ul>
                        {items.map(item =>
                            <div key={item.id} id={item.id} className="w-100 mt-2">
                                <div className="alert alert-secondary w-75 mx-auto d-inline-block me-3" role="alert">{item.text}</div>
                                <button id={item.id} type="" onClick={this.clickDelete} className="btn-close d-inline-block ms-4" aria-label="Close"></button>
                            </div>
                            
                        )}
                    </ul>
                </div>
            )
        }else{
            return (
                <ul>
                    {this.props.newTasks.tasks.map(task =>
                    <div key={task.id} className="w-100 mt-2">
                        <div className="alert alert-secondary w-75 mx-auto d-inline-block me-3" role="alert">{task.text}</div>
                        <button id={task.id} type="" onClick={this.clickDelete} className="btn-close d-inline-block ms-4" aria-label="Close"></button>
                    </div>
                    )}
                </ul>
            )
        }
    }
}
