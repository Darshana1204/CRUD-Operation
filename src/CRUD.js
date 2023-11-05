import React, { useRef, useState } from "react";
import "./CRUD.css";
import { Add, Delete, Edit, Update } from "./assets/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CRUD() {
  const list = [
    {
      id: 1,
      name: "HP",
      price: "1200",
    },
    {
      id: 2,
      name: "DELL",
      price: "2000",
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);

  return (
    <div className="crud">
      <div>
        <AddList setList={setList} lists={lists} />
        <form onSubmit={handleSubmit}>
          {lists.length === 0 ? ( // Check if the list is empty
            <p className="empty">Add new task</p>
          ) : (
            <div className="table">
              {lists.map((current) =>
                updateState === current.id ? (
                  <EditList current={current} lists={lists} setList={setList} />
                ) : (
                  <div className="list_table">
                    {/* <td>{current.name}</td>
                                            <td>{current.price}</td>
                                            <td>
                                                <button className='edit btn' onClick={() => handleEdit(current.id)}>
                                                <img className="icon" src={Edit} alt="" /> <span>Edit</span>
                                                </button>
                                                <button className='delete btn' type='button' onClick={() => handleDelete(current.id)}>
                                                <img className="icon" src={Delete} alt="" /> <span>Delete</span>
                                                </button>
                                            </td> */}
                    <div className="table_list">
                      <div className="list_element">
                        <span className="elements">
                          {" "}
                          Name : <span className="element">{current.name}</span>
                        </span>
                        <span className="elements">
                          {" "}
                          Price :{" "}
                          <span className="element">{current.price}</span>
                        </span>
                      </div>
                      <div className="btns">
                        <button
                          className="edit btn icone"
                          onClick={() => handleEdit(current.id)}
                        >
                          <img className="icon icone" src={Edit} alt="Edit" />
                        </button>

                        <button
                          className="delete btn icond"
                          type="button"
                          onClick={() => handleDelete(current.id)}
                        >
                          <img
                            className="icon icond"
                            src={Delete}
                            alt="delete"
                          />
                        </button>
                        <ToastContainer
                          position="top-right"
                          autoClose={1000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss={false}
                          draggable
                          pauseOnHover={false}
                          theme="light"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  function handleEdit(id) {
    setUpdateState(id);
    toast.info("Item Selected for editing ");
  }
  const notifyWarning = () =>
    toast("Item Deleted !!", {
      type: "warning",
    });

  function handleDelete(id) {
    toast.warning("Item deleted successfully");
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );
    setList(newlist);
    setUpdateState(-1);
    toast.success("Item Updated Sucessfully");
  }
}

function EditList({ current, lists, setList }) {
  function handleInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );
    setList(newlist);
  }

  function handleInputprice(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, price: value } : li
    );
    setList(newlist);
  }

  return (
    <div className="table_list">
      {/* <td><input type="text" onChange={handleInputname} className='input' name='name' value={current.name} /></td>
            <td><input type="text" onChange={handleInputprice} className='input' name='price' value={current.price} /></td>
            <td>
                <button type='submit' className='btn'>
                    <img className="icon" src={Update} alt="" /> <span>Update</span>
                </button>
            </td> */}
      <div className="list_table">
        <div className="list_element">
          <span className="elements">
            {" "}
            Name :{" "}
            <input
              type="text"
              onChange={handleInputname}
              className="input"
              name="name"
              value={current.name}
            />
          </span>

          <span className="elements">
            {" "}
            Price :{" "}
            <input
              type="text"
              onChange={handleInputprice}
              className="input"
              name="price"
              value={current.price}
            />
          </span>
        </div>
        <div>
          <button type="submit" className="btn iconu">
            <img className="icon iconu" src={Update} alt="Update" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AddList({ setList, lists }) {
  const nameRef = useRef();
  const priceRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    toast.success("Item Added Sucessfully");

    // Check if either field is empty or zero
    if (!name || !price) {
      alert("Both name and price fields are required!");
      return;
    }

    // Check if the name is a string
    if (!isNaN(name)) {
      alert("Name must be a string.");
      return;
    }

    // Check if price is a number
    if (isNaN(price)) {
      alert("Price must be a number.");
      return;
    }

    const newId = generateUniqueID(lists); // Generate a unique ID
    const newItem = {
      id: newId,
      name,
      price,
    };
    setList((prevLists) => [...prevLists, newItem]);
    nameRef.current.value = "";
    priceRef.current.value = "";
  }

  // Function to generate a unique ID
  function generateUniqueID(existingList) {
    let newId = 1;
    while (existingList.some((item) => item.id === newId)) {
      newId++;
    }
    return newId;
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <div className="">
        <input
          type="text"
          name="name"
          className="input"
          placeholder="Enter Name"
          ref={nameRef}
        />
        <input
          type="text"
          name="price"
          className="input"
          placeholder="Enter Price"
          ref={priceRef}
        />
      </div>
      <div className="">
        <button type="submit" className="btn inonu">
          <img className="icon iconu" src={Add} alt="" /> <span>Add</span>
        </button>
      </div>
    </form>
  );
}

export default CRUD;
