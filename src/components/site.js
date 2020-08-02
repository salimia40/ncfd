import React, { useState, useEffect } from "react";
import { Site, Alert } from "tabler-react";

function App({ children, loggedin = true, user = undefined, message = undefined }) {
  var [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   if(message)
  //     setTimeout(()=>{
  //       dispatch(setMessage(undefined))
  //     }, 5000)
  // }, [message, dispatch])

  return (
    <Site>
      <Site.Header
        alt="Puya Crypto"
        imageURL="./logo.svg"
        href="/"
        onMenuToggleClick={() => {
          setCollapsed(!collapsed);
        }}
        accountDropdown={
          loggedin
            ? {
                avatarURL: "./james.png",
                name: user ? user.payeer : "",
                description: "Investor",
              }
            : undefined
        }
      />

      {loggedin ? (
        <Site.Nav
          collapse={collapsed}
          itemsObjects={[
            {
              value: "Dashboard",
              to: "/dashboard",
              icon: "home",
              useExact: true,
            },
            {
              value: "Make Deposit",
              to: "/deposit",
              icon: "calendar",
              prefix: "fe",
              useExact: true,
            },
            {
              value: "My deposits",
              to: "/depositlist",
              icon: "shopping-bag",
              useExact: true,
            },
            {
              value: "Transactions",
              to: "/transactions",
              icon: "grid",
              useExact: true,
            },
            {
              value: "Referral",
              to: "/referral",
              icon: "git-merge",
              useExact: true,
            },
            {
              value: "Rules",
              to: "/rules",
              icon: "target",
              useExact: true,
            },
          ]}
        ></Site.Nav>
      ) : null}

      {message ? (
        <Alert type="primary" hasExtraSpace>
          {message}
        </Alert>
      ) : null}

      {children}

      <div style={{ height: "100px" }}></div>
      <footer className="card-footer bg-dark">
        Puya LTD - Copyrights ©2020 All Rights Reserved
      </footer>
    </Site>
  );
}

export default App;