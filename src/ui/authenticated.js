import React from "react";
import { observer, inject } from "mobx-react";

export default function (Component) {
  return inject("sessionStore")(
    observer(function({ sessionStore, ...params}) {
      if (sessionStore.authenticated) {
        return <Component {...params}/>;
      } else {
        return null;
      }
    })
  );
}