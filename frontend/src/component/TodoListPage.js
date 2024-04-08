import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";


class TodoListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    const access = localStorage.getItem("access_token");

    if (!access) {
      // Chuyển hướng đến trang đăng nhập nếu không có token
      return 
    }

    axios
      .get("/api/todos", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    console.log("item in handleSubmit:", item);
    this.toggle();
  
    const access_token = localStorage.getItem("access_token");
  
    if (!access_token) {
      // Handle the case where the user is not authenticated
      return;
    }
  
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => this.refreshList());
      return;
    }
  
    axios
      .post("/api/todos/", item, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    const access_token = localStorage.getItem("access_token");
  
    if (!access_token) {
      // Handle the case where the user is not authenticated
      return;
    }
  
    axios
      .delete(`/api/todos/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => this.refreshList())
      .catch((err) => console.log(err));
  };

  createItem = () => {
    const item = { id: null, title: "", description: "", completed: false, user: 1};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default TodoListPage;
