import React from "react";

import moment from "moment";

import { Card, Table } from "tabler-react";
import TimeoutString from "./timeout";

function Widget({ latestdeposits }) {
  return (
    <Card title="latest deposits">
      <Card.Body>
        <Table>
          <Table.Header>
            <Table.ColHeader>Invest Date</Table.ColHeader>
            <Table.ColHeader>Amount</Table.ColHeader>
            <Table.ColHeader>Return Amount</Table.ColHeader>
            <Table.ColHeader>Time Left</Table.ColHeader>
          </Table.Header>
          <Table.Body>
            {latestdeposits.map((deposit) => (
              <Table.Row>
                <Table.Col>
                  {moment(deposit.created).format("dd MMM,DD,YY hh:mm")}
                </Table.Col>
                <Table.Col>{deposit.amount}</Table.Col>
                <Table.Col>{deposit.profit}</Table.Col>
                <Table.Col>
                  {moment(deposit.created).add(1, "day").isAfter(moment())
                    ? <TimeoutString start={deposit.created}/>
                    : "00:00"}
                </Table.Col>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Widget;
