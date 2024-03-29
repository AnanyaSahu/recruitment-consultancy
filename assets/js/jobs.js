let jobFound = null
let jobFeeds = []
let jobFeedsCopy = []
let jobIndex = 0
let selectedFilter = { 'jobCategory': "null", 'jobType': "null" }

// show job application modal
$(document).ready(function () {
    $("#apply-modal-btn").click(function () {
        $("#apply-modal-container").show();
    });
});

// get job list from JSON
function getjobVacancies() {
    fetch('../assets/json/job-vacancy-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {
            for (var i in data)
                jobFeeds.push(data[i]);
            // create deep copy of job feed list
            jobFeedsCopy = JSON.parse(JSON.stringify(jobFeeds))
            createContentOfJobFeed(jobFeeds)
        })
}

// method to navigate to Job Details page
function navigateToDetailPage(id) {
    localStorage.setItem('id', id);
    window.location.href = "./html/job-details.html";
}

// filter job feed based on criteria
function filterJobFeeds() {
    // create deep copy of job feed copy list and reassign to filtered list in case if the filter parameter is empty
    var filteredList = JSON.parse(JSON.stringify(jobFeedsCopy))

    if (selectedFilter.jobCategory != "null") {
        filteredList = filteredList.filter((jobfeed) => jobfeed.jobCategory.indexOf(selectedFilter.jobCategory) > -1)
    }
    if (selectedFilter.jobType != "null") {
        filteredList = filteredList.filter((jobfeed) => jobfeed.jobType.indexOf(selectedFilter.jobType) > -1)
    }
    createContentOfJobFeed(filteredList)

}

// set selected filter to selectedFilter disctionary
function selectFilterType(filterType, filterValue) {
    if (filterType == "jobCategory") {
        selectedFilter.jobCategory = filterValue
    } else {
        selectedFilter.jobType = filterValue
    }
}

// create dynamic job feed
function createContentOfJobFeed(list) {
    var jobPosting = document.getElementById("jobs-postings");
    var ele = ""
    jobPosting.innerHTML = ""
    // if job list is empty show no content msg to user
    if (list.length == 0) {
        ele = " <div class='job-feed-header'><h3> <b> No Job matching your filter selection found </b> </h3></div>"
    }
    else {
        for (jobdata in list) {
            job = list[jobdata]
            ele += "<div class='card'><div class='card-content display-content'><h4 class='cursor-pointer' onclick='navigateToDetailPage(" + job.jobId + ")'>" + job.jobPosition + "</h4>" +
                "<div class='display-flex'><h6> " + job.companyName + "</h6> &nbsp;&nbsp;<h6>" + job.rating + "</h6> <i class='fa-solid fa-star'></i></div>" +
                "<div class='display-flex'><i class='fa-solid fa-calendar'></i>&nbsp;&nbsp;<h6></h6>" + job.experience + "</div>" +
                "<div class='display-flex'><i class='fa-sharp fa-solid fa-location-dot'></i>&nbsp;&nbsp;  <span>" + job.location + "</span> </div>" +
                "<div class='display-flex'><i class='fa-solid fa-calendar'></i>&nbsp;&nbsp; <span>Employment type:</span><span class='job-type'>&nbsp;" +
                job.jobType + ",</span>  &nbsp;<span id='job-category'>" + job.jobCategory + "</span></div>" +
                "<hr>" +
                "<div class='display-flex'>  <span>Posted &nbsp;</span><span id='posted-date'>" + calculateDays(job.postingDate) + " &nbsp;</span><span></span> days ago</span></div>"
                + "</div></div>"

        }
        ele += "<div class='last-card'></div>"
    }
    jobPosting.innerHTML = ele
}

// find job by job id for job detail page
function getjobByJobId(jobId) {
    fetch('../assets/json/job-vacancy-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {
            var result = [];
            for (var i in data)
                result.push(data[i]);

            for (var i in result) {
                if (result[i].jobId == jobId) {
                    jobFound = result[i]
                    showJobDetails(jobFound);
                }
            }
        })
}

// close modal method to hide job application modal
function closeModal() {
    var modal = document.getElementById("apply-modal-container");
    modal.style.display = "none";
}

// validate job application form values and show toast notification on successfull application
function showToast() {
    var error = document.getElementById("error-msg");
    error.innerHTML = "";
    phonePattern = /^[0-9]{10}$/;
    emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Validation paatern taken from https://regexr.com/3e48o

    let fullName = document.forms["jobApplicationFrom"]["name"].value;
    let phone = document.forms["jobApplicationFrom"]["phone"].value;
    let email = document.forms["jobApplicationFrom"]["email"].value;

    if (fullName.trim() == "" || phone.trim() == "" || email.trim() == "") {
        error.innerHTML = "<span>Please fill all the required details</span>";
    } else if (phone.trim() != "" && !phonePattern.test(phone.trim())) {
        console.log(phonePattern.test(phone.trim()))
        error.innerHTML = "<span>Please enter correct phone</span>";
    } else if (email.trim() != "" && !emailPattern.test(email.trim())) {
        console.log(emailPattern.test(email.trim()))
        console.log(email.trim() != "")
        error.innerHTML = "<span>Please enter correct email</span>";
    }
    else {
        // all form values pass validation
        error.innerHTML = ""
        var x = document.getElementById("toastNotification");
        document.getElementById("jobApplicationFrom").reset();
        closeModal()
        // show toast notification for successful application
        x.style.display = "block";
        // hide toast notification for successful application after 1500ms
        setTimeout(() => {
            x.style.display = "none";
        }, 1500);
    }
}

// create content for job details page
function showJobDetails() {
    var jobposition = document.getElementById("job-position");
    jobposition.innerHTML = jobFound.jobPosition

    var company = document.getElementById("job-company");
    company.innerHTML = jobFound.companyName

    var location = document.getElementById("job-location");
    location.innerHTML = jobFound.location

    var category = document.getElementById("job-category");
    category.innerHTML = jobFound.jobCategory

    var salary = document.getElementById("job-salary");
    salary.innerHTML = jobFound.salary

    var jobtype = document.getElementById("job-type");
    jobtype.innerHTML = jobFound.jobType

    var description = document.getElementById("job-description");
    description.innerHTML = jobFound.jobDescription

    var jobroles = document.getElementById("job-roles");
    jobroles.innerHTML = jobFound.jobResponsibilities

    var requirements = document.getElementById("job-requirements");
    requirements.innerHTML = jobFound.jobRequirements

    var hiringinsight = document.getElementById("hiring-insight");
    hiringinsight.innerHTML = jobFound.hiring

    var skills = document.getElementById("job-skills");
    skills.innerHTML = jobFound.skills.join(', ');

    var experience = document.getElementById("job-experience");
    experience.innerHTML = jobFound.experience;

    rating = document.getElementById("job-rating");
    rating.innerHTML = jobFound.rating;

    var postdate = document.getElementById("post-date");
    postdate.innerHTML = calculateDays(jobFound.postingDate);

    generatePerksandBenefits()
}

// create dynamic content perks and benifits cards 
// Created using refernce from https://www.naukri.com/job-listings-android-developer-2-4-years-jayam-solutions-hyderabad-secunderabad-0-to-1-years-180323003954?src=homepage_personalized
function generatePerksandBenefits() {
    var eleToAdd = ""
    for (perk in jobFound.jobPerksAndBenifits) {
        if (jobFound.jobPerksAndBenifits[perk] == "Team Outings") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/TeamOuting.jpg' alt='benefit-img'><div class='benefit-label'>Team Outings</div></div></div>"
        }
        if (jobFound.jobPerksAndBenifits[perk] == "Work From Home") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/WFH.jpg' alt='benefit-img'><div class='benefit-label'>Work From Home</div></div></div>"
        }
        if (jobFound.jobPerksAndBenifits[perk] == "Soft Skill Training") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/SoftSkillsTraining.jpg' alt='benefit-img'><div class='benefit-label'>Soft Skill Training</div></div></div>"
        }
        if (jobFound.jobPerksAndBenifits[perk] == "International Relocation") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Education.jpg' alt='benefit-img'><div class='benefit-label'>International Relocation</div></div></div>"
        }
        if (jobFound.jobPerksAndBenifits[perk] == "Health Insurance") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Transportation.jpg' alt='benefit-img'><div class='benefit-label'>Health Insurance</div></div></div></div>"
        }
        if (jobFound.jobPerksAndBenifits[perk] == "Cafateria") {
            console.log(perk)
            eleToAdd += "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Transportation.jpg' alt='benefit-img'><div class='benefit-label'>Cafateria</div></div></div></div>"
        }
    }

    var per = document.getElementById("perks");
    per.innerHTML = eleToAdd
}

// calculate how many days ago the job was posted from today
function calculateDays(postingDate) {
    const today = new Date();
    const posteddate = new Date(postingDate);
    var timeDifference = today.getTime() - posteddate.getTime();
    var days = timeDifference / (1000 * 3600 * 24);
    return Math.abs(Math.round(days))
}