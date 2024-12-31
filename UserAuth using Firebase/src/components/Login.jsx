import React, { useEffect, useState } from "react";
import { TextField, Button, FormControl, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo, signInWithPopup, signOut} from "firebase/auth";
import { db } from "../config/firebase.js";
import {
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { VolunteerActivism } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState("");
  const [updateHeading, setUpdateHeading] = useState()
  
  // console.log("current user : ",auth?.currentUser?.email);
  const todoCollectionRef = collection(db, "todos"); // todos is the name of the collection in firestore

  const deleteTodo = async (Tid) => {
    // console.log("Tid : ",Tid);
    const todoDoc = doc(db, "todos", Tid);
    await deleteDoc(todoDoc);
    getTodos();
  };

  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("filtered data : ", filteredData);
    setTodos(filteredData);
    console.log("Todos data : ", data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleTodoName = (e) => {
    setTodoName(e.target.value);
  };
  const handleTodoList = (e) => {
    setTodoList(e.target.value);
  };

  const handleSubmitTodos = async () => {
    // console.log("submit : ",todoName," ",todoList);
    await addDoc(todoCollectionRef, {
      todoName,
      todoList: [todoList], // In backend todoList is an array
    });
    getTodos();
  };

  // const handleSignIn = async () => {
  //   console.log(email, " ", password);
  //   const userSignIn = await createUserWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   )
  //     .then((res) => console.log("Signed in successfully ! ", res))
  //     .catch((err) => console.log("Error ", err));
  //   console.log("userSignIn : ", userSignIn);
  // };

  const handleSignIn = async () => {
    console.log(email, " ", password);
    const userSignIn = await signInWithEmailAndPassword(auth,email,password)
      .then((res) =>{ 
        console.log("Signed in successfully ! ", res);
        navigate('/home');
      })
      .catch((err) => {
        navigate('/')
        console.log("Error ", err)
      });
      console.log("userSignIn : ", userSignIn);
    
  };
  const handleSignInWithGoogle = async () => {
    const userSignIn = await signInWithPopup(auth, googleProvider);
    console.log("userSignInWithGoogle : ", userSignIn);
  };

 

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateTodoHeading = async(Tid) => {
    // const todoDoc = doc(db, "todos", Tid);
    // await updateDoc(todoDoc,{todoName: updateHeading});
    // getTodos();
    console.log(Tid);
  }
  return (
    <>
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div  className="col mx-2"  style={{ marginTop : "10rem", height: "29rem",  }}>
            {todos.map((item) => {
              {  console.log(item)  }
              return (
                <div key={item.todoName}>
                  <b>{ item.todoName}</b>
                  <button  style={{ marginLeft: "1rem" }} onClick={()=>updateTodoHeading(item.id)}>update</button>
                  <button
                    sx={{ width: "10px" }}
                    style={{ marginLeft: "1rem" }}
                    onClick={() => deleteTodo(item.id)}>
                    X
                  </button>
                  {item.todoList.map((list) => {
                    return <li key={list}>{list}</li>;
                  })}
                </div>
              );
            })}

            <TextField
              label="Todo Name"
              name="todoName"
              variant="standard"
              value={todoName}
              onChange={(e) => handleTodoName(e)}
            />
            <br />
            <TextField
              label="Todo List"
              name="todos"
              variant="standard"
              value={todoList}
              onChange={(e) => handleTodoList(e)}
            />
            <br />
            <Button
              variant="contained"
              color="success"
              style={{ margin: "2rem" }}
              onClick={handleSubmitTodos}
            >
              Add todos
            </Button>
          </div>
          <div className="col mx-2" style={{ backgroundColor: "", height: "29rem", padding: "10rem" }}>
            <div className="d-flex flex-column justify-content-center align-items-end w-100">
              <h2 className="">Welcome Back</h2>
              <FormControl sx={{ mt: 2, width: "25ch" }} variant="standard">
                <TextField
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => handleChangeEmail(e)}
                  fullWidth
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "25ch" }} variant="standard">
                <TextField
                  type="password"
                  label="Password"
                  variant="standard"
                  value={password}
                  onChange={(e) => handleChangePassword(e)}
                  fullWidth
                />
              </FormControl>
              <div style={{ display: "flexbox", flexDirection: "row" }}>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginTop: "2rem", marginRight: "1rem" }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginTop: "2rem" }}
                  onClick={handleSignInWithGoogle}
                >
                  Sign in with google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
