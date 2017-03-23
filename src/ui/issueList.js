import React from "react";
import { observer, inject } from "mobx-react";
import { PENDING, REJECTED, FULFILLED } from "mobx-utils";
import { Spinner, Button } from "@blueprintjs/core";
import authenticated from "./authenticated";

export default authenticated(
  inject("issueStore", "sessionStore", "viewStore")(
    observer(
      class IssueList extends React.Component {
        constructor({ issueStore, sessionStore, route }) {
          super();
          console.log("fetch issues for", route.params.repo);
          issueStore.fetchIssues(route.params.repo);
        }
        renderIssueList() {
          const { sessionStore, issueStore, viewStore } = this.props;

          const issueListDeferred = issueStore.issueListDeferred;
          const state = issueListDeferred.state;
          switch (state) {
            case PENDING: {
              return <Spinner />;
            }
            case REJECTED: {
              return (
                <div className="pt-non-ideal-state">
                  <div
                    className="pt-non-ideal-state-visual pt-non-ideal-state-icon"
                  >
                    <span className="pt-icon pt-icon-error" />
                  </div>
                  <h4 className="pt-non-ideal-state-title">Error occured</h4>
                  <div className="pt-non-ideal-state-description">
                    <Button
                      onClick={issueStore.fetchIssues(
                        this.props.route.params.repo
                      )}
                      text="retry"
                    />
                  </div>
                </div>
              );
            }
            case FULFILLED: {
              const issueList = issueListDeferred.value;

              if (issueList.length === 0) {
                return <h3>no issues</h3>;
              } else {
                return issueList.map(issue => {
                  console.log(issue);
                  return (
                    <div key={issue.id}>
                      <h2>{issue.title}</h2>
                      <Button
                        className="pt-button pt-minimal pt-icon-document"
                        onClick={() =>
                          viewStore.push(
                            viewStore.routes.issue({
                              repo: this.props.route.params.repo,
                              issueId: issue.number
                            })
                          )}
                        text="issue"
                      />
                    </div>
                  );
                });
              }

              break;
            }
            default: {
              console.error("deferred state not supported", state);
            }
          }
        }
        render() {
          const { viewStore } = this.props;
          return (
            <div>
              <h1>Issues for Repo {this.props.route.params.repo}</h1>
              <Button
                className="pt-button pt-minimal pt-icon-document"
                onClick={() =>
                  viewStore.push(
                    viewStore.routes.issue({
                      repo: this.props.route.params.repo,
                      issueId: "new"
                    })
                  )}
                text="new issue"
              />
              {this.renderIssueList()}
            </div>
          );
        }
      }
    )
  )
);
