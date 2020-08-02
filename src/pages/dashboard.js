import Site from "../components/site";
import useSWR from "swr";

import { Grid, StampCard, Page } from "tabler-react";

import AccountDetails from "../components/accountdetails";
import Latestdeposits from "../components/latestdeposits";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);


function Dashboard() {
  const {
    data,
    error,
  } = useSWR("/api/data/dashboard", fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {
    latestdeposits = [],
    total_referal = 0,
    total_commition = 0,
    payout_sum = 0,
    deposit_sum = 0,
    loggedin = false,
    user,
    message
  } = data

  return (
    <Site user={user} loggedin={loggedin} title="Dashboard" message={message}>
      <Page.Content title="Dashboard">
        <Grid.Row cards deck>
          <Grid.Col>
            <StampCard
              color="blue"
              icon="users"
              header={total_referal + " PEOPLE"}
              footer="TOTAL REFERRAL"
            />
          </Grid.Col>
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
              color="red"
              icon="book"
              header={total_commition + " RUB"}
              footer={"TOTAL COMMISION"}
            />
          </Grid.Col>
          <Grid.Col>
            <StampCard
              color="orange"
              icon="check"
              header={payout_sum + " RUB"}
              footer={"TOTAL WITHDRAWL"}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col width={7}>
            <Latestdeposits latestdeposits={latestdeposits} />
          </Grid.Col>

          <AccountDetails user={user} />
        </Grid.Row>
      </Page.Content>
    </Site>
  );
}

export default Dashboard;
