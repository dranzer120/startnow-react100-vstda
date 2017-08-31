import React, { Component } from "react";
import Todo from "./todo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      task: "",
      dtask: "",
      priority: "1",
      items: [],
      enableEdit: false,
      duedate: ""
    };
    this.addtask = this.addtask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.saveTask = this.saveTask.bind(this);
    // this.editMode = this.editMode.bind(this);
  }

  // editMode(index) {
  //   let items = [...this.state.items];

  //   items[index].enableEdit = true;

  //   this.setState({
  //     items: items
  //   });
  // }
  
  saveTask(payload, index) {
    let items = [...this.state.items];
    console.log(payload)

    if (payload.dtask===""){
      items[index].task = this.state.task
    }
    else{
      items[index].task = payload.dtask;
    }
    if(payload.priority===""){ var temp = this.state.priority}
    else{temp = payload.priority;} 
    
    if (temp==="1"){
      var priorityvalue = "danger";
    }
    else if(temp==="2"){
      priorityvalue = "warning";
    }
    else if(temp==="3"){
      priorityvalue = "success";
    }
    
    items[index].priority = priorityvalue;
    
    this.setState({
      items: items
    });
  }

  handleDate(event) {
    this.setState({
      duedate: event.targe.value
    });
  }
  handlePriority(event) {
    this.setState({ priority: event.target.value });
  }

  deleteInfo(index) {
    let items = [...this.state.items];

    items.splice(index, 1);

    this.setState({
      items: items
    });
  }

  descriptionChange(event, index) {
    let items = [...this.state.items];

    items[index].task = event.target.value;
    let dtask = items[index].task;

    this.setState({
      items: items
    });

    console.log(this.state);
  }

  handleChange(event) {
    this.setState({ task: event.target.value });
  }
  addtask() {
    var itemArray = this.state.items;
    const taskvalue = this.state.task;
    var priorityvalue = this.state.priority;
    const enableEditvalue = this.state.enableEdit;
    if (priorityvalue==="1"){
      priorityvalue = "danger";
    }
    else if(priorityvalue==="2"){
      priorityvalue = "warning";
    }
    else if(priorityvalue==="3"){
      priorityvalue = "success";
    }
    itemArray.push({
      task: taskvalue,
      priority: priorityvalue,
      enableEdit: enableEditvalue
    });

    this.setState({
      items: itemArray
    });
  }
  renderTodos() {
    return this.state.items.map((item, index) => (
      <Todo
        key={item.task + index}
        priority={item.priority}
        index={index}
        task={item.task}
        onClick={() => this.deleteInfo(index)}
        saveTask={this.saveTask}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="titleheader">
          <h1>Very Simple Todo App</h1>
          <p>Track all of the things</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-defaut">
              <div className="panel-heading">Add New Todo</div>
              <div className="panel-body">
                <label htmlFor="inputbox">I want to..</label>
                <textarea
                  className="form-control create-todo-text"
                  id="inputbox"
                  rows="3"
                  value={this.state.task}
                  onChange={this.handleChange}
                />
                <label htmlFor="priority">
                  How much of a priority is this?
                </label>
                <select
                  className="form-control create-todo-priority"
                  id="priority"
                  onChange={this.handlePriority}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="panel-footer">
                <button
                  className="btn btn-success btn-block create-todo"
                  onClick={this.addtask}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">View Todos</div>
              <div className="panel-body">
                <ul className="no-padding list-item-group">
                  {this.renderTodos()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
