import logo from "./logo.svg"
import "./App.css"
import { Component } from "react"

class App extends Component {
  state = {
    items: [],
    loading: true,
    todoItem: "",
  }

  componentDidMount() {
    fetch("http://localhost:4567/item.json")
      .then((res) => res.json())
      .then((items) => this.setState({ items, loading: false }))
  }
  addItem = (e) => {
    e.preventDefault()
    fetch("http://localhost:4567/item.json", {
      method: "POST",
      body: JSON.stringify({ item: this.state.todoItem }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        this.setState({ items })
      })
  }
  deleteItem = (itemId) => {
    fetch("http://localhost:4567/item.json", {
      method: "DELETE",
      body: JSON.stringify({ id: itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        this.setState({ items })
      })
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} className="App-logo" alt="logo" />
            Todo List
          </span>
        </nav>
        <div className="px-3 py-2">
          <form className="form-inline my-3" onSubmit={this.addItem}>
            <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
              <input
                className="form-control col-12"
                placeholder="what do you need to do "
                value={this.state.todoItem}
                onChange={(e) =>
                  this.setState({
                    todoItem: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="btn btn-primary mb-2 col-3 col-sm-2"
              type="submit"
            >
              Add
            </button>
          </form>
          {this.state.loading && <p>loading ...</p>}
          {!this.state.loading && this.state.items.length === 0 && (
            <div className="alert alert-secondary">No Items - all done!</div>
          )}
          {!this.state.loading && this.state.items && (
            <table className="table table-striped">
              <tbody>
                {this.state.items.map((item, i) => {
                  return (
                    <tr key={i} className="row">
                      <td className="col-1">{i + 1}</td>
                      <td className="col-10">{item.item}</td>
                      <td className="col-1">
                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }
}
export default App
