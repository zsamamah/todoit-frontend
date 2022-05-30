import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import useAxiosGet from '../../customHooks/useAxiosGet';
import './dnd.css';

const finalSpaceCharacters = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      thumb: '/images/gary.png'
    },
    {
      id: 'cato',
      name: 'Little Cato',
      thumb: '/images/cato.png'
    },
    {
      id: 'kvn',
      name: 'KVN',
      thumb: '/images/kvn.png'
    },
    {
      id: 'mooncake',
      name: 'Mooncake',
      thumb: '/images/mooncake.png'
    },
    {
      id: 'quinn',
      name: 'Quinn Ergon',
      thumb: '/images/quinn.png'
    }
  ]
let todo=[]
let doing=[]
let done=[]

function Dnd() {
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  
  useEffect(() => {
    if(!sessionStorage.getItem('user'))
      navigate('/')
    else{
      const get_data = async()=>{
        let res =await fetch('http://localhost:8000/api/user_tasks/'+user.id)
        let data = await res.json()
        updateCharacters(data)
        console.log(data)
      }
      get_data()
    }
  },[])

  const [characters, updateCharacters] = useState(null);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    console.log(result)
  }
  let test_arr=[{id:"1",name:"test","status":"doing"},{id:"2",name:"test","status":"doing"}]
  return (
    <>
        <h1>Final Space Characters</h1>
    <header className="App-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className='border'>
          <Droppable isDropDisabled={false} droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters && characters.map(({id, name, status}, index) => {
                  return (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {/* <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div> */}
                          <p>
                            { name } | {status}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          </div>
        </DragDropContext>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className='border'>
          <Droppable droppableId="test2">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {test_arr && test_arr.map(({id, name, status}, index) => {
                  return (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {/* <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div> */}
                          <p>
                            { name } | {status}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          </div>
        </DragDropContext>
      </header>
      </>
  )
}

export default Dnd