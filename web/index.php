<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Public GitHub Repository Information</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/custom.css">
</head>
<body>
<div class="container">
    <div class="row margin-top-20">
        <div class="col-md-12">
            <form>
                <div class="input-group">
                    <div class="input-cont">
                        <input id="github_url" placeholder="Enter GitHub Public Repository Link..." class="form-control"
                               type="text">
                    </div>
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-primary" id="get_info">
                            Get Info &nbsp;
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-12 margin-top-20 rep_info" style="display:none;">
            <p>Total Open Issues: <span id="issues_count"></span></p>

            <p>Number of open issues that were opened in the last 24 hours: <span id="last_24"></span></p>

            <p>Number of open issues that were opened more than 24 hours ago but less than 7 days ago: <span
                    id="last_24_less_7"></span></p>

            <p>Number of open issues that were opened more than 7 days ago : <span id="more_7"></span></p>
        </div>
        <div class="col-md-12 alert alert-danger margin-top-20" style="display:none;">
            <span id="error_message"></span>
        </div>
    </div>
</div>
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/custom.js"></script>
</body>
</html>