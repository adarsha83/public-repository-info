# public-repository-info
Get Information about any public github  repository

Application URL
------------------------------

Live Application URL: https://limitless-bastion-4754.herokuapp.com/

Repository Link Format: http://github.com/{user}/{repository}

How Does It Work?
------------------------------

1) Uses a personal access token

2) Extracts the arguments from the repository url and appends it to the github API

3) Uses OAUTH to fetch results

4) Using the issues_url key retrieves all the issues by using pagination

Suggestions to Improve
--------------------------------

1) GitHub API by default considers an issue open even if it is a pull request. Hence we could check if the "pull_request"
key is set to selectively choose only pure open issues. Since the requirement did not demand such things, ignored this case.

2) In the above application the user has to enter the correct url (except the http or https protocol). If not it will fail
to fetch the required results. This could be improved by providing a predictive search or by suggesting possible repository
links by using the GitHub Repository Search API.

3) Could use a deferred object to handle asynchronous requests. By this we could get rid of many if else conditions to hide or show a div.

4) Could use pure javascript to intead of jquery to make it run faster.

