import { fromPromise } from "mobx-utils";
import { extendObservable, action } from "mobx";

export default class IssueStore {
  constructor({ githubAPI, sessionStore }) {
    extendObservable(this, {
      postIssue: action("postIssue", (repo, title, text) => {
        return githubAPI.postIssue({
          login: sessionStore.currentUser.login,
          repo,
          title,
          text
        });
      }),
      updateIssue: action("updateIssue", (repo,issueId, title, text) => {
        return githubAPI.updateIssue({
          login: sessionStore.currentUser.login,
          repo,
          issueId,
          title,
          text
        });
      }),
      fetchIssues: action("fetchIssues", repo => {
        this.issueListDeferred = fromPromise(
          githubAPI.fetchIssues({
            login: sessionStore.currentUser.login,
            repo
          })
        );
      }),
      issueListDeferred: null
    });
  }
}
