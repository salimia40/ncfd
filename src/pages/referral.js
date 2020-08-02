import Site from "../components/site";
import useSWR from "swr";

import * as R from "ramda";

import { Page, Card, Form, Table, Text, Grid, StampCard } from "tabler-react";

import axios from "axios";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

function Widget() {

  const { data , error } = useSWR('/api/data/referal', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {
    loggedin = false,
    user = undefined,
    referals = {},
    host,
    total_commition = 0,
    total_referal = 0,
  } = data

  
  var link = host + "/" + user.referid;

  return (
    <Site user={user} loggedin={loggedin}>
      <Page.Content title="Referral System">
        <Grid.Row cards deck>
          <Grid.Col>
            <StampCard
              color="green"
              icon="check"
              header={total_commition + " RUB"}
              footer="TOTAL COMISSION"
            />
          </Grid.Col>
          <Grid.Col>
            <StampCard
              color="blue"
              icon="users"
              header={total_referal + " PEOPLE"}
              footer="TOTAL REFERRAL"
            />
          </Grid.Col>
        </Grid.Row>

        <Card title="Referral Link">
          <Card.Body>
            <Form>
              <Form.Group label="Referral Link">
                <Form.Input disabled value={link} />
              </Form.Group>
              {/* <Form.Group>
                <Button color="lime"> Pay </Button>
              </Form.Group> */}
            </Form>

            <Text.Small color="red">
              15% affiliate commision on every deposit made from your referral.
            </Text.Small>

            <Text color="red">Minimum Referral Payout : 10 Rub</Text>
          </Card.Body>
        </Card>

        <Card title="My Referrals">
          <Card.Body>
            <Table>
              <Table.Header>
                <Table.ColHeader>Login</Table.ColHeader>
                <Table.ColHeader>Invested</Table.ColHeader>
                <Table.ColHeader>Profit</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {R.keys(referals).map((key) => {
                  var referal = referals[key];
                  return (
                    <Table.Row>
                      <Table.Col>{key}</Table.Col>
                      <Table.Col>{referal.amount} RUB</Table.Col>
                      <Table.Col>{referal.profit} RUB</Table.Col>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Card.Body>
        </Card>
      </Page.Content>
    </Site>
  );
}

export default Widget;
