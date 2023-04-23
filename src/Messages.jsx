import React, { Fragment } from "react";
import {Button, Card, Badge } from 'react-bootstrap';


const Messages = (props) => {
  const { post } = props;

  return (
      <Card bg="light" border="dark" style={{ width: '100vh' }}>
          <Card.Body>
            <Card.Title>Messages - <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="danger" text="light">{post.messages.length} - Message(s)</Badge></Card.Title>         
            {post.messages.map((message) => {
              return (
                <Card.Body index={message._id}>
                  <Fragment>
                    <Card.Text>{message.content}</Card.Text>
                    <Button variant="primary" size="sm" className="float-end me-4 mt-1">Reply to Message</Button>
                  </Fragment>
                </Card.Body>
              )}
            )}
          </Card.Body>
      </Card>
  );
}; 


export default Messages;
