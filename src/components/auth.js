
import { Card, Form, Button } from "tabler-react";

import { useFormik } from 'formik';
import axios from 'axios';


function Widget() {

  const formik = useFormik({
    initialValues: {
      payeer: '',
    },
    
  });

  return (
    <Card title="Join Project">
      <Card.Body>
      <Form method="POST" action="/api/join">
        <Form.Group label="Payeer Adress">
          <Form.Input name="payeer" onChange={formik.handleChange('payeer')} value={formik.values.payeer}></Form.Input>
        </Form.Group>
        <Button type="submit">Enter</Button>
      </Form>
      </Card.Body>
    </Card>
  );
}

export default Widget;
