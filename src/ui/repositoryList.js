import React from "react";
import { observer, inject } from "mobx-react";
import { PENDING, REJECTED, FULFILLED } from "mobx-utils";
import { Spinner, Button } from "@blueprintjs/core";
export default inject("repoStore", "sessionStore", "viewStore")(
  observer(
    class RepositoryList extends React.Component {
      constructor({ repoStore, sessionStore }) {
        super();
        repoStore.fetchRepos();
      }
      renderRepoList() {
        const { sessionStore, repoStore, viewStore } = this.props;

        if (sessionStore.authenticated) {
          const repoDeferred = repoStore.repoDeferred;
          const state = repoDeferred.state;
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
                    <Button onClick={repoStore.fetchRepos} text="retry" />
                  </div>
                </div>
              );
            }
            case FULFILLED: {
              const repos = (window.repos = repoDeferred.value);
              // TODO: implement list of repos
              return repos.map(repo => {
                return (
                  <div key={repo.id}>
                    <h2>{repo.name}</h2>
                    <Button
                      className="pt-button pt-minimal pt-icon-document"
                      onClick={() => viewStore.push(viewStore.routes.issueList({ repo: repo.name }))}
                      text="issue"
                    />
                  </div>
                );
              });
              break;
            }
            default: {
              console.error("deferred state not supported", state);
            }
          }
        } else {
          return <h1>NOT AUTHENTICATED </h1>;
        }
      }
      render() {
        return (
          <div>
            <h1>Repos</h1>
            {this.renderRepoList()}
          </div>
        );
      }
    }
  )
);
