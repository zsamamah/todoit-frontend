import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useFetch from '../../customHooks/useFetch';
import './boards.css';

function Boards() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

  useEffect(() => {
    if(!user)
      navigate('/login')
  },[])
  
  const [board, setBoard] = useState({
    board_name:"",
    board_description:"",
    owner:(user?user['id']:0)
  })

  let data = useFetch('http://localhost:8000/api/user_boards/'+(user?user['id']:0))


  const handleBoard = (e)=>{
    setBoard({...board,[e.target.id]:e.target.value})
  }

  const createBoard = async(e)=>{
    e.preventDefault()
    const res = await axios.post('http://localhost:8000/api/create_board',board);
    console.log(res)
    if(res && res.status==200){
      Swal.fire({
        icon: "success",
        title: res.data
      }).then(function(){
        window.location.reload()
      })
    }
  }

  const to_board=async(e)=>{
    sessionStorage.setItem("board_id",e.target.id)
    const res = await axios.get('http://localhost:8000/api/user_tasks/' + (user?user['id']:0) + '/' + e.target.id)
    await sessionStorage.setItem('todo',JSON.stringify(res.data.todo));
    await sessionStorage.setItem('doing',JSON.stringify(res.data.doing));
    await sessionStorage.setItem('done',JSON.stringify(res.data.done));
    navigate('/board');
  }

  if(user){
    return (
      <>
      <form onSubmit={createBoard} id="create_form">
        <div>
          <label htmlFor='board_name'>Board Name : </label>
          <input type='text' id='board_name' onChange={handleBoard} />
        </div>
        <div>
          <label htmlFor='board_description'>Board Description : </label>
          <input type='text' id='board_description' onChange={handleBoard} />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
      <hr className='blue_hr'/>
      <div id='boards_container'>
      {
      data && data.length>0 && data.map((item,index)=>{
        return <div key={index}>
          <Avatar name={item['board_name']} round={true} />
          <p className='b_name'>{item['board_name']}</p>
          <p className='b_des'>{item['board_description']}</p>
          <button id={item['id']} onClick={to_board}>Open Board</button>
        </div>
      })
      }
      </div>
      </>
    )
  }
  else{
    return (
      <p>No User</p>
    );
  }

  
}

export default Boards