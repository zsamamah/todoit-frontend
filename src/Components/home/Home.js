import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Hero from "./hero/Hero";
import Why from './why/Why'

function Home() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const addTask = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      user_id: user.id,
    };
    let res = await axios.post("http://localhost:8000/api/add_task", data);
    
    console.log(res);

    let tasks = await axios.get(
      "http://localhost:8000/api/user_tasks/" + user["id"]
    );

    sessionStorage.setItem("todo", JSON.stringify(tasks.data.todo));

    console.log(tasks);
  };

  return (
    <>
      {/* <h1>This is home page</h1> */}
      <Hero/>
      <Why/>
      <Footer/>
      {/* {user ? (
        <>
          <div>
            <button onClick={logout}>logout</button>
            <a href={"/board"}>Board</a>
          </div>
          <hr />
          <div>
            <form onSubmit={addTask}>
              <div>
                <label htmlFor="name">Name : </label>
                <input id="name" type="text" />
              </div>
              <div>
                <label htmlFor="description">Description : </label>
                <input id="description" type="text" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      ) : null} */}
    </>
  );
}

export default Home;
