import React, { Fragment } from "react";
import {Button, Card, Badge } from 'react-bootstrap';


const Messages = (props) => {
  const { post } = props;

  return (
    <Fragment>
      <br />
      <Card bg="light" border="dark" style={{ width: '100vh' }}>
          <Card.Body>
            <Card.Title>Messages - <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="danger" text="light">{post.messages.length} - Message(s)</Badge></Card.Title>  

            {post.messages.map((message, index) => {
              return (
                <Card.Body key={message._id}>
                  <Fragment>
                    <Card.Text className="mb-3">
                      <Badge style={{fontSize: 12}} id="username-badge" pill="true" bg="dark" text="light">Message # {index + 1}</Badge>
                        &nbsp;&nbsp;&nbsp;&nbsp;{message.content}
                      <span>
                        <Button variant="primary" size="sm" className="float-end me-4 mt-1">Reply to Message</Button>
                      </span>
                    </Card.Text> 
                  </Fragment>
                </Card.Body>
              )}
            )}
            
          </Card.Body>
      </Card>
    </Fragment> 
  );
}; 

export default Messages;
