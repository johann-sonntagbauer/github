import createHistory from "history/createBrowserHistory";
import { extendObservable, computed } from "mobx";
import React from "react";
import Issue from "../ui/issue";
import IssueList from '../ui/issueList';
import RepositoryList from "../ui/repositoryList";
import RouteNotFound from "../ui/routeNotFound";
import About from '../ui/about';
import myro from "myro";

const history = createHistory();

const routeDefinitions = {
  "/": "home",
  "/repos": "repos",
  "/about": "about",
  "/issue/:repo/:issueId": "issue",
  "/issuelist/:repo": "issueList"
};

const routes = myro(routeDefinitions);

export default class ViewStore {
  constructor() {
    history.listen(location => {
      this.location = location.pathname;
    });

    this.routes = routes;

    extendObservable(this, {
      location: window.location.pathname,
      push: url => history.push(url),
      currentView: computed(() => {
        const route = routes(this.location) || {};
        switch (route.name) {
          case "about": {
            return {
              ...route,
              component: About
            };
          }
          case "repos": {
            return {
              ...route,
              component: RepositoryList
            };
          }
          case "issueList": {
            return {
              ...route,
              component: IssueList
            };
          }
          case "issue": {
            return {
              ...route,
              component: Issue
            };
          }
          default: {
            if (this.location === "/") {
              return {
                name: 'home',
                component: () => <div>HOME</div>
              };
            }

            return {
              name: "notfound",
              component: RouteNotFound
            };
          }
        }
      })
    });
  }
}
