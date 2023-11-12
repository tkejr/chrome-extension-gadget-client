import React, { useEffect, useState } from "react";
import "./App.css";
import { Provider } from "@gadgetinc/react";
import { api } from "./api/api";
import gadget_bg from "./assets/gadget_bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Load todos on component mount
    api.todo
      .findMany()
      .then(setTodos)
      .catch((error) => {
        showErrorWithMessage("Failed to load todos");
      });
  }, []);

  const showErrorWithMessage = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
  };

  const handleCreateOrUpdateTodo = async () => {
    if (editingId) {
      try {
        await api.todo.update(4, { title: title });
        setTitle(""); // Clear input after create/update
        setEditingId(null); // Clear editing ID
      } catch (error) {
        showErrorWithMessage("Failed to update todo");
      }
    } else {
      try {
        await api.todo.create({ todo: { title } });
        setTitle(""); // Clear input after create/update
      } catch (error) {
        showErrorWithMessage("Failed to create todo");
      }
    }
    // Refresh todos
    api.todo
      .findMany()
      .then(setTodos)
      .catch((error) => {
        showErrorWithMessage("Failed to refresh todos list");
      });
  };

  const handleDeleteTodo = async (id) => {
    try {
      await api.todo.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id)); // Update local state immediately
    } catch (error) {
      showErrorWithMessage("Failed to delete todo");
    }
  };

  return (
    <Provider api={api}>
      <div className="App container shadow-lg flex flex-col items-center space-y-4 bg-white text-gray-800">
        <h1 className="text-2xl text-gray-800 leading-tight font-bold">
          ToDo List
        </h1>
        <div className="h-64  overflow-y-scroll w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center w-full p-2 hover:bg-gray-100"
            >
              <p className="flex-1 truncate">{todo.title}</p>
              <button
                onClick={() => {
                  setTitle(todo.title);
                  setEditingId(todo.id);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateOrUpdateTodo();
            }
          }}
        />
        {showError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}{" "}
        <footer className="flex items-center">
          <h1 className="text-l font-bold mr-1">Made with Gadget</h1>
          <img src={gadget_bg} alt="Gadget logo" className="w-12" />
        </footer>
      </div>
    </Provider>
  );
}

export default App;
