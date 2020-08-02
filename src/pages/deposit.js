import Site from "../components/site";
import useSWR from "swr";

import { Page, Card, Form, Button, Text } from "tabler-react";
import { useFormik } from "formik";
import Latestdeposits from "../components/latestdeposits";

import axios from "axios";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

function Deosit() {
  const { data, error } = useSWR("/api/data/deposit", fetcher);

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // dispatch(deposit(values))
    },
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { latestdeposits = [], loggedin = false, user = undefined } = data;

  return (
    <Site user={user} loggedin={loggedin}>
      <Page.Content title="Make Deposit">
        <Card title="Make Your Profit After 48h">
          <Card.Body>
            <Form methode="POST" action="/api/deposit">
              <Form.Group label="Amount">
                <Form.Input
                  name="amount"
                  type="number"
                  onChange={formik.handleChange("amount")}
                  value={formik.values.amount}
                />
              </Form.Group>
              <Form.Group>
                <Button color="lime" onClick={formik.handleSubmit}>
                  {" "}
                  Pay{" "}
                </Button>
              </Form.Group>
            </Form>

            <Text color="red">Minimum Deposit Amount : 100 Rub</Text>
          </Card.Body>
        </Card>

        <Latestdeposits latestdeposits={latestdeposits} />
      </Page.Content>
    </Site>
  );
}

export default Deosit;
