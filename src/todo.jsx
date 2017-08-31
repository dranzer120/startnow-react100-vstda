import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dtask: "",
      date: "",
      priority: "",
      enableEdit: false
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
  }

  handleEditMode() {
    this.setState({
      enableEdit: true
    });
  }
  updateDescription(event) {
    this.setState({ dtask: event.target.value });
  }

  updateDate(event) {
    this.setState({ date: event.target.value });
  }

  updatePriority(event) {
    this.setState({ priority: event.target.value });
  }

  save() {
    // const {dtask,date,priority} = this.state;
    // const payload = {dtask,date,priority};

    const payload = {
      dtask: this.state.dtask,
      date: this.state.date,
      priority: this.state.priority
    };
    this.setState({
      enableEdit: false
    });
    this.props.saveTask(payload, this.props.index);
  }

  render() {
    return (
      <li className={`list-group-item list-group-item-${this.props.priority}`}>
        <div style={{ display: this.state.enableEdit ? "none" : "block" }}>
          <input type="checkbox" value="" />
          <a
            href="#"
            className="close delete-todo"
            onClick={() => this.props.onClick()}
          >
            <span className="glyphicon glyphicon-trash" />
          </a>
          <a
            href="#"
            className="close edit-todo"
            onClick={() => this.handleEditMode()}
          >
            <span className="glyphicon glyphicon-edit" />
          </a>

          <strong>{this.props.task}</strong>
        </div>
        <div
          style={{ display: this.state.enableEdit ? "block" : "none" }}
        >
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control update-todo-text"
            id="description"
            rows="3"
            placeholder={this.props.task}
            onChange={this.updateDescription}
          />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                className="form-control update-todo-date"
                placeholder="mm/dd/yyyy"
                onChange={this.updateDate}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="priority">Priority</label>
              <select
                className="form-control update-todo-priority"
                id="priority"
                onChange={this.updatePriority}
              >
                <option value="1">High Priority</option>
                <option value="2">Medium Priority</option>
                <option value="3">Low Priority</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-md-offset-10">
              <button
                className="btn btn-success btn-block update-todo"
                onClick={() => this.save()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
export default Todo;
