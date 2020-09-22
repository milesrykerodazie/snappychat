/* import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useStateValue } from "./StateProvider";

const Message = forwardRef(({ username, message }, ref) => {
  const [{ user }] = useStateValue();
  return (
    <div ref={ref} className={`message__card ${user && "message__user"}`}>
      <Card className={user ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography
            className="message__text"
            color="white"
            variant="h5"
            component="h4"
          >
            {!user && `${message.username || "Unknown User"}: `}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});
export default Message; */
import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message__card ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography
            className="message__text"
            color="white"
            variant="h5"
            component="h4"
          >
            {!isUser && `${message.username || "Unknown User"}: `}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});
export default Message;
