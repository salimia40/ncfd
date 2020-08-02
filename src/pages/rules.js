import Site from "../components/site";

import { Page, Text, Header } from "tabler-react";
import useSWR from "swr";

import axios from "axios";
const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.data);

const text = `
General provisions:
1.1.1 Commission project withdrawal is 0% of output by the user amount.

1.2 by Registering with us You agree to these rules in full.

1.3 the Administration is not responsible for any damages suffered by You as a result of using this System.

1.4 At the time of registration, the user must be at least 18 years of age on the day of its birth.

The user has the right:
2.1 cash deposits on its balance sheet.

2.2 Produce information and attract new members in various advertising methods sites, threads on forums, social networks, etc.

2.3 to Send in your suggestions and comments to improve the service System.

The user agrees to:
2.4 to Comply with these rules in full.

2.5 Carefully read the terms of enrollment and payments.

2.6 does Not enter the System Administration misled by inaccurate information.

2.7 at least once per month to once again meet with these rules.

2.8 Upon detection of faults or some errors in the script site to report to support.

2.9 Not to conduct the attempts of breaking of site and not utillize possible errors in the scripts.

When you try to break, the administration has the full right to remove, block or fine a user.
2.10 Not to publish offensive messages, defamation and other types of messages spoiling the reputation of the System or its users.

2.11 Not to register more than one account. Each participant has the right to have only one account. In case of detection of multi-accounts, administration has full right to remove, block or fine a user.

Rights and responsibilities of the administration:
3.1 In the case of ignoring the users of these rules, the administration reserves the right to remove, block or fine an account user without warning and without explanation.

3.2 the Administration may amend these rules change without warning the user.

3.3 Letter sent by the administration with obscene content, carrying offensive or threats - will be ignored, and users are removed.

3.4 When you try to enter the administration misled cheating, measures will be taken to remove, block or fine an account.

3.5 the company agrees to maintain the confidentiality of the information of the authorized user, got from him during registration.

3.6 In the event of refusal to accept the new rules, the administration reserves the right to refuse to further participation in our service.

Payments
4.1 Users can make contributions to the Deposit in the amount of $ 1 using the following payment systems: Bitcoin, LiteCoin,Ethereum, DogeCoin, PerfectMoney, Payeer.

4.2 the Minimum amount of withdrawal from the system is: 0.02 US dollar. For some of the payment areas can be set separate terms for the minimum amount be withdrawn from the System and order of service.

4.3 the List of the payment systems by which you can make the Deposit and withdrawal of funds may be corrected by the administration.

4.4 Removal takes place automatically. If the client provides inaccurate, incomplete data on the withdrawal of the system, the withdrawal of funds does not occur, and the withdrawal request is rejected to correct or clarify all inaccuracies in the data

4.5 Requests for withdrawal are accepted around the clock.
`;

function Widget() {
  const {
    data,
    error,
  } = useSWR("/api/data/index", fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const { loggedin = false, user = undefined } = data

  return (
    <Site user={user} loggedin={loggedin}>
      <Page.Content title="Rules">
        <Header.H4>
          Please read the following rules carefully before registration:
        </Header.H4>
        {text.split("\n").map((line) => {
          return isNaN(line[0]) ? (
            <Text>{line}</Text>
          ) : (
            <Text.Small>{line}</Text.Small>
          );
        })}
      </Page.Content>
    </Site>
  );
}

export default Widget;
