import React, { Component } from 'react'
import axios from 'axios'
import List from './List'


export default class Input extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            text: '',
            submit: ''
        }

        this.formChange = this.formChange.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
    }

formChange(event){
    this.setState({
        text: event.target.value
    });
}
    
clickSubmit(event){
    event.preventDefault();
    axios.post("/create/task", this.state)
        .then(response => {
            this.setState({
                submit: response.data,
                text: ""
            });
        });
}

    render() {
        return (

            <div>
                <form onSubmit={this.clickSubmit} className="mb-5">
                    <input value={this.state.text} onChange={this.formChange} className="form-control form-control-lg d-inline-block w-75 me-1 my-auto" type="text" placeholder="Введите заметку/задачу" aria-label=".form-control-lg example" />
                    <button type="submit" className="btn btn-dark btn-lg d-inline-block my-auto">Создать</button>
                </form>

                <List newTasks={this.state.submit} />

            </div>
        );
    }
}
