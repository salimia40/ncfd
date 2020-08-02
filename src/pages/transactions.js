import Site from "../components/site";

import { Page, Card, Table, Grid, StampCard } from "tabler-react";

import axios from "axios";
import useSWR from "swr";

import moment from "moment";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

function Widget() {
  const {
    data,
    error,
  } = useSWR("/api/data/transactions", fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {
    payout_sum = 0,
    deposit_sum = 0,
    transactions = [],
    loggedin = false,
    user = undefined,
    message
  } = data

  return (
    <Site user={user} loggedin={loggedin} title="Transaction history" message={message}>
      <Page.Content title="Transaction history">
        <Grid.Row cards deck>
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
              color="orange"
              icon="book"
              header={payout_sum + " RUB"}
              footer={"TOTAL PAYOUT"}
            />
          </Grid.Col>
        </Grid.Row>

        <Card title="Latest transactions">
          <Card.Body>
            <Table>
              <Table.Header>
                <Table.ColHeader>Type</Table.ColHeader>
                <Table.ColHeader>Date</Table.ColHeader>
                <Table.ColHeader>Amount</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Wallet</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {transactions.map((transaction) => (
                  <Table.Row>
                    <Table.Col>{transaction.type}</Table.Col>
                    <Table.Col>
                      {moment(transaction.created).format("dd MMM,DD,YY hh:mm")}
                    </Table.Col>
                    <Table.Col>{transaction.amount + " RUB"}</Table.Col>
                    <Table.Col>{transaction.status}</Table.Col>
                    <Table.Col>{transaction.payeer}</Table.Col>
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


export default Widget;
