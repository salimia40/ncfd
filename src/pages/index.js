import Site from "../components/site";

import Auth from "../components/auth";
import Faq from "../components/faq";
import { Page, Grid, StampCard, Card, Table } from "tabler-react";
import moment from "moment";
import useSWR from "swr";


import AccountDetails from "../components/accountdetails";
const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

const Widget = () => {
  const { data, error } = useSWR("/api/data/index", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const {
    loggedin = false,
    user = undefined,
    operations = [],
    total_deposit = 0,
    total_user = 0,
    total_paid = 0,
  } = data;

  return (
    <Site user={user} loggedin={loggedin}>
      <Page.Content title="welcome">
        <Grid.Row>
          <Grid.Col>{loggedin ? <AccountDetails user={user} /> : <Auth />}</Grid.Col>
          <Grid.Col>
            <Grid.Row>
              <Grid.Col>
                <StampCard
                  color="info"
                  icon="users"
                  header={"+32%"}
                  className="bg-info text-white"
                >
                  <h5>after 24 Hours</h5>
                </StampCard>
              </Grid.Col>

              <Grid.Col>
                <StampCard
                  color="purple"
                  icon="users"
                  header={total_user}
                  className="bg-purple text-white"
                >
                  <h5>Total Investors</h5>
                </StampCard>
              </Grid.Col>

              <Grid.Col>
                <StampCard
                  color="warning"
                  icon="users"
                  header={total_deposit + " RUB"}
                  className="bg-warning text-white"
                >
                  <h5>Total Deposited</h5>
                </StampCard>
              </Grid.Col>

              <Grid.Col>
                <StampCard
                  color="success"
                  icon="users"
                  header={total_paid + " RUB"}
                  className="bg-success text-white"
                >
                  <h5>Total Paid</h5>
                </StampCard>
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>

        <Card title="Last Operations">
          <Card.Body>
            <Table className="table table-sm table-striped">
              <Table.Header>
                <Table.ColHeader>Type</Table.ColHeader>
                <Table.ColHeader>Date</Table.ColHeader>
                <Table.ColHeader>Amount</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Wallet</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {operations.map((transaction) => (
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

        <Card>
          <Card.Body>
            <Faq />
          </Card.Body>
        </Card>
      </Page.Content>
    </Site>
  );
};

export default Widget;
