import React, { useState , useEffect } from "react";
import "./style.css";


//get the localStorage data back
const getLocalData=()=>{
    const lists=localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");

  // to store in the below empty array
  const [items, setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("");
  const [toggleButton, setToggleButton]=useState(false);

  // add the items functions
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } 
    else if(inputData && toggleButton){
       setItems(
        items.map((curElem)=>{
            if(curElem.id===isEditItem){
                return {...curElem,name:inputData};
            }
            return curElem;
        })
       ) ;
       setInputData("");
       setIsEditItem(null);
       setToggleButton(false);
       //false --> so that it goes to the second else part
       
    }
    else {
        const myNewInputData={
            id:new Date().getTime().toString(),
            name:inputData,
        }
      setItems([...items, myNewInputData]);
      setInputData();
    }
  };

  //edit the items
  const editItem=(index)=>{
    const item_todo_edited=items.find((curElem)=>{
        return curElem.id===index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //how  to delete items section
  const deleteItem=(index)=>{
    const updatedItem=items.filter((curElem)=>{
        return curElem.id!==index;
    });
    setItems(updatedItem);
  };

  //remove all the elements
  const removeAll=()=>{
    setItems([]);
  }


  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));
  },[items]);

  //adding localStorage
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌️ </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" ✍️ Add Items "
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ?( <i className="far fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)};
          </div>
          {/* <br /> */}

          {/* show our items. */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button. */}
          <div className="showItem">
            <button className="btn effect04" data-sm-link-text="Remove All" 
            onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
