import React from "react";

import { Form, Card, Grid, Button } from "tabler-react";

import moment from "moment";

function Widget({ user }) {
  return (
    <Grid.Col>
      <Card title="Account Details">
        <Card.Body>
          <Form.Group label="Registerd With :">
            <Form.Input value={user ? user.payeer : ""} disabled />
          </Form.Group>
          <Form.Group label="Registerd Date :">
            <Form.Input
              value={
                user ? moment(user.joined).format("dddd MMM,DD,YY hh:mm") : ""
              }
              disabled
            />
          </Form.Group>
          <a href="/api/logout">
            <Button color="danger">Log out</Button>
          </a>
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export default Widget;
