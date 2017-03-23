import React from "react";
import { observer, inject } from "mobx-react";
import authenticated from "./authenticated";

export default authenticated(
  inject("sessionStore")(
    observer(function({ sessionStore }) {
      const currentUser = (window.currentUser = sessionStore.currentUser);

      return (
        <div>
          <h3>User {currentUser.login}</h3>
          <p>Followers: {currentUser.followers}</p>
        </div>
      );
    })
  )
);
