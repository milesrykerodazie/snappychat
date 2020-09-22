import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { FormControl, Input, IconButton, Button } from "@material-ui/core";
import Message from "./Message";
import { db, auth } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import "./Header.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Info from "./Info";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    width: 280,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  //reset all inputs to default
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  //authentication listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser();
        clearInputs();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  // registeration
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
    clearInputs();
  };

  // Login
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
    clearInputs();
  };

  //setting the messages
  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  //sending message function
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput !== "") {
      db.collection("messages").add({
        message: messageInput,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessageInput("");
    }
  };

  return (
    <div className="main">
      {/* signup modal */}
      <div className="app__modal">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
                  alt=""
                />
              </center>

              <Input
                className="app__signupInput"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="app__signupInput"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="app__signupInput"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>

        {/* sign in modal */}

        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signin">
              <center>
                <img
                  className="app__headerImage"
                  src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
                  alt=""
                />
              </center>
              <Input
                className="app__signinInput"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="app__signinInput"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </form>
          </div>
        </Modal>
      </div>

      <div className="header">
        {user ? (
          <div className="header__logo">
            <img
              src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
              alt=""
            />
            <h2>
              Hello <strong>{user.displayName}</strong>, Welcome To Snappy Chat
            </h2>
          </div>
        ) : (
          <></>
        )}
        {user ? (
          <Button id="logout__button" onClick={() => auth.signOut()}>
            Logout
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      {/* footer for sending messages */}
      <div className="app">
        {user ? (
          <form className="app__form">
            <FormControl className="app__formControl">
              <Input
                className="app__input"
                placeholder="Enter a message...."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                type="text"
              />
              <IconButton
                className="app__iconButton"
                disabled={!messageInput}
                type="submit"
                onClick={sendMessage}
                variant="contained"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>
        ) : (
          <></>
        )}
        {user ? (
          <FlipMove>
            {messages.map(({ id, message }) => (
              <Message key={id} username={user.displayName} message={message} />
            ))}
          </FlipMove>
        ) : (
          <Info />
        )}
      </div>
    </div>
  );
}
export default App;
