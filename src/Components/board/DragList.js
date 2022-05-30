import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import axios from "axios";
import './board.css';
import {HiPlusCircle} from 'react-icons/hi';

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k,index) => {
    // const randomId = Math.floor(Math.random() * 100000);
    return {
      id: `${data[prefix][index]['id']}`,
      prefix,
      content: data[prefix][index]['description'],
      name: data[prefix][index]['name'],
      board_id: data[prefix][index]['board_id']
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];
let data={
    todo: JSON.parse(sessionStorage.getItem('todo')),
    inProgress: JSON.parse(sessionStorage.getItem('doing')),
    done: JSON.parse(sessionStorage.getItem('done'))
}

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(data[listKey].length, listKey) }),
    {}
  );

function DragList() {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    data={
      todo: JSON.parse(sessionStorage.getItem('todo')),
      inProgress: JSON.parse(sessionStorage.getItem('doing')),
      done: JSON.parse(sessionStorage.getItem('done'))
    }
    setElements(generateLists());
  },[]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
    
  };

  const save = async()=>{
      let temp = []

      elements['todo'].forEach(element => {
          element.prefix='Todo'
          temp.push(element)
        });
        elements['inProgress'].forEach(element => {
            element.prefix='Doing'
            temp.push(element)
        });
        elements['done'].forEach(element => {
            element.prefix='Done'
            temp.push(element)
        });

    let res = await axios.post('http://localhost:8000/api/save/'+user['id'],{temper:temp})

    let tasks = await axios.get(
        "http://localhost:8000/api/user_tasks/" + user["id"] + '/' + sessionStorage.getItem('board_id')
      );
  
      sessionStorage.setItem("todo", JSON.stringify(tasks.data.todo));
      sessionStorage.setItem("doing", JSON.stringify(tasks.data.doing));
      sessionStorage.setItem("done", JSON.stringify(tasks.data.done));
    console.log(res);
  }

  const addTask = async (e) => {
    e.preventDefault();
    save()
    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      user_id: user.id,
      board_id: sessionStorage.getItem('board_id')
    };
    let res = await axios.post("http://localhost:8000/api/add_task", data);
    
    console.log(res);

    let tasks = await axios.get(
      "http://localhost:8000/api/user_tasks/" + user["id"] + '/' + sessionStorage.getItem('board_id')
    );

    sessionStorage.setItem("todo", JSON.stringify(tasks.data.todo));
    window.location.reload()
    console.log(tasks);
  };

  return (
    <>
    {user ? (
        <>
          <div>
            <form onSubmit={addTask} className="add_task_form" id="create_form">
              <div>
                <label htmlFor="name">Name : </label>
                <input id="name" type="text" />
              </div>
              <div>
                <label htmlFor="description">Description : </label>
                <input id="description" type="text" />
              </div>
              <button type="submit"><HiPlusCircle/></button>
              <button onClick={save}>Save Board</button>
            </form>
          </div>
        </>
      ) : null}
      <hr className="blue_hr"/>
    {
      sessionStorage.getItem('todo') && <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
    }
    </>
  );
}

export default DragList;
