import Site from "../components/site";
import useSWR from "swr";

import { Page, Card, Table, Grid, StampCard, Button, Form } from "tabler-react";

import axios from "axios";

import moment from "moment";
const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

function Item({ deposit }) {
  return (
    <Table.Row>
      <Table.Col>
        {moment(deposit.created).format("dd MMM,DD,YY hh:mm")}
      </Table.Col>
      <Table.Col>
        {moment(deposit.created).add(1, "day").format("dd MMM,DD,YY hh:mm")}
      </Table.Col>
      <Table.Col>{deposit.amount} RUB</Table.Col>
      <Table.Col>{deposit.profit} RUB</Table.Col>
      <Table.Col>
        {moment(deposit.created).add(1, "day").isAfter(moment())
          ? moment(Date.now())
              .subtract(moment(deposit.created).add(1, "day"))
              .format("hh:mm")
          : "00:00:00"}
      </Table.Col>
      <Table.Col>
        {moment(deposit.created).add(1, "day").isAfter(moment()) ? (
          "YES"
        ) : (
          <Form
            style={{ display: "inline" }}
            method="POST"
            action="/api/withdraw"
          >
            <input style={{ display: "none" }} name="id" value={deposit._id} />
            <Button size="sm" outline color="info" type="submit">
              withdraw
            </Button>
          </Form>
        )}
      </Table.Col>
    </Table.Row>
  );
}

function MyDeposits() {
  const { data, error } = useSWR("/api/data/depositlist", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const {
    activedeposits = [],
    closeddeposits = [],
    active_deposit_sum = 0,
    deposit_sum = 0,
    loggedin = false,
    user = undefined,
  } = data;

  return (
    <Site user={user} loggedin={loggedin}>
      <Page.Content title="My Deposits">
        <Grid.Row>
          <Grid.Col>
            <StampCard
              color="green"
              icon="shopping-cart"
              header={deposit_sum + " RUB"}
              footer="TOTAL DEPOSIT"
            />
          </Grid.Col>

          <Grid.Col>
            <StampCard
              color="blue"
              icon="package"
              header={active_deposit_sum + " RUB"}
              footer="ACTIVE DEPOSIT"
            />
          </Grid.Col>
        </Grid.Row>

        <Card title="Deposits">
          <Card.Body>
            <Table>
              <Table.Header>
                <Table.ColHeader>Invested At</Table.ColHeader>
                <Table.ColHeader>Release Date</Table.ColHeader>
                <Table.ColHeader>Invested Amount</Table.ColHeader>
                <Table.ColHeader>Profit Amount</Table.ColHeader>
                <Table.ColHeader>Time Left</Table.ColHeader>
                <Table.ColHeader>Active</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {activedeposits.map((deposit) => (
                  <Item deposit={deposit} />
                ))}
              </Table.Body>
            </Table>
          </Card.Body>
        </Card>

        <Card title="Deposit History">
          <Card.Body>
            <Table>
              <Table.Header>
                <Table.ColHeader>Invested At</Table.ColHeader>
                <Table.ColHeader>Release Date</Table.ColHeader>
                <Table.ColHeader>Invested Amount</Table.ColHeader>
                <Table.ColHeader>Profit Amount</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {closeddeposits.map((deposit) => (
                  <Table.Row>
                    <Table.Col>
                      {moment(deposit.created).format("dd MMM,DD,YY hh:mm")}
                    </Table.Col>
                    <Table.Col>
                      {moment(deposit.created)
                        .add(1, "day")
                        .format("dd MMM,DD,YY hh:mm")}
                    </Table.Col>
                    <Table.Col>{deposit.amount} RUB</Table.Col>
                    <Table.Col>{deposit.profit} RUB</Table.Col>
                    <Table.Col>
                      {moment(deposit.created).add(1, "day").isAfter(moment())
                        ? moment(Date.now())
                            .subtract(moment(deposit.created).add(1, "day"))
                            .format("hh:mm")
                        : "00:00:00"}
                    </Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card.Body>
        </Card>
      </Page.Content>
    </Site>
  );
}

export default MyDeposits;
