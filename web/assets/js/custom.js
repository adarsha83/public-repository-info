$(document).ready(function () {
    var accessToken = 'e41855c0a7b795734624089e78c6db54176b9788';
    var issuesPerPage = 30;

    // Get the total number of pages for pagination
    function getTotalPages(totalCount, issuesPerPage) {
        var totalPages = Math.floor(totalCount / issuesPerPage);
        if (totalCount % issuesPerPage > 0) {
            totalPages++;
        }
        return totalPages;
    }

    // Check whether the issue is still open
    function isIssueOpen(issue) {
        if (issue.closed_at == undefined || issue.closed_at != null || issue.closed_at != '') {
            return true;
        }
        return false;
    }

    // Get the Difference between two datetime objects in hours
    function getDateDifferenceInHours(date1, date2) {
        var diffSeconds = (date1 - date2) / 1000;
        return Math.floor(diffSeconds / 3600);
    }

    // Get the Difference between two datetime objects in days
    function getDateDifferenceInDays(date1, date2) {
        return Math.floor(getDateDifferenceInHours(date1, date2) / 24);
    }

    // Check whether the created_at is set and valid for the issue
    function isValidCreatedAt(issue) {
        if (issue.created_at != undefined && issue.created_at != null && issue.created_at != '') {
            return true;
        }
        return false;
    }

    function showResults() {
        $(".rep_info").css("display", "block");
        $(".alert").css("display", "none");
    }

    function showErrorMessage() {
        $(".rep_info").css("display", "none");
        $(".alert").css("display", "block");
    }

    // Get Repository Info Handler
    $("#get_info").on('click', function (event) {
        event.preventDefault();
        var message = 'Please Enter a valid Link';
        var githubUrl = $("#github_url").val();
        if (githubUrl != '') {
            var githubUrlParts = githubUrl.split('github.com');
            if (githubUrlParts.length > 1) {

                // Get the Information about a public repository using GitHub Repository API
                var url = 'https://api.github.com/repos' + githubUrlParts[1] + '?accessToken=' + accessToken;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: "json",
                    success: function (result) {
                        // Total number of open issues
                        var count1 = result.open_issues_count;

                        // Number of open issues that were opened in the last 24 hours
                        var count2 = 0;

                        // Number of open issues that were opened more than 24 hours ago but less than 7 days ago
                        var count3 = 0;

                        // Number of open issues that were opened more than 7 days ago
                        var count4 = 0;
                        var issuesUrl = result.issues_url;
                        if (issuesUrl != '') {
                            var totalPages = getTotalPages(count1, issuesPerPage);
                            for (var page = 1; page <= totalPages; page++) {
                                // Get Issues for the public repository using GitHub List Issues API
                                url = issuesUrl.replace('{/number}', '') + '?accessToken=' + accessToken + "&page=" + page;
                                $.ajax({
                                    url: url,
                                    type: 'GET',
                                    dataType: "json",
                                    success: function (issues) {
                                        var today = new Date($.now());
                                        for (var i = 0; i < issues.length; i++) {

                                            // Proceed only if the created_at key is set
                                            if (isValidCreatedAt(issues[i])) {
                                                if (isIssueOpen(issues[i]) && getDateDifferenceInHours(today, new Date(issues[i].created_at)) <= 24) {
                                                    count2++;
                                                }
                                                if (isIssueOpen(issues[i]) && getDateDifferenceInHours(today, new Date(issues[i].created_at)) >= 24 && getDateDifferenceInDays(today, new Date(issues[i].created_at)) <= 7) {
                                                    count3++;
                                                }
                                                if (isIssueOpen(issues[i]) && getDateDifferenceInDays(today, new Date(issues[i].created_at)) > 7) {
                                                    count4++;
                                                }
                                            }
                                        }
                                        $("#issues_count").text(count1);
                                        $("#last_24").text(count2);
                                        $("#last_24_less_7").text(count3);
                                        $("#more_7").text(count4);
                                        showResults();
                                    },
                                    error: function (jqXHR, error_type) {
                                        message = jqXHR.statusText;
                                        showErrorMessage();
                                    }
                                });
                            }
                        }
                    },
                    error: function (jqXHR, error_type) {
                        message = jqXHR.statusText;
                        showErrorMessage();
                    }
                });
            } else {
                showErrorMessage();
            }
        } else {
            showErrorMessage();
        }
        $("#error_message").html(message);
    });
});