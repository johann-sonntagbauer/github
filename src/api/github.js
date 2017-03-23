export default class GithubAPI {
  constructor({ userToken }) {
    this.userToken = userToken;
    this.defaultHeaders = {
      Authorization: `token ${this.userToken}`
    };
  }

  currentUser = () => {
    return fetch("https://api.github.com/user", {
      headers: {
        ...this.defaultHeaders
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };

  userRepositories = ({ login }) => {
    return fetch(`https://api.github.com/users/${login}/repos`, {
      headers: {
        ...this.defaultHeaders
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };

  fetchIssues = ({ login, repo }) => {
    return fetch(`https://api.github.com/repos/${login}/${repo}/issues`, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };

  fetchIssue = ({ login, repo, issueId }) => {
    return fetch(
      `https://api.github.com/repos/${login}/${repo}/issues/${issueId}`,
      {
        method: "GET",
        headers: {
          ...this.defaultHeaders,
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };

  updateIssue = ({ login, repo, issueId, title, text }) => {
    return fetch(
      `https://api.github.com/repos/${login}/${repo}/issues/${issueId}`,
      {
        method: "PATCH",
        headers: {
          ...this.defaultHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: text
        })
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };

  postIssue = ({ login, repo, title, text }) => {
    return fetch(`https://api.github.com/repos/${login}/${repo}/issues`, {
      method: "POST",
      headers: {
        ...this.defaultHeaders,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        body: text
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  };
}
