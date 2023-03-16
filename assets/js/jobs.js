

function getjobVacancies(){  
    console.log('getjobVacancies')
    fetch('../assets/json/job-vacancy-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then((data) =>
    {
        for(var i in data) 
        jobFeeds.push( data [i]);

        createContentOfJobFeed(jobFeeds)
        // filterJobFeeds('jobType','Part-time')
    } ) 




   }  
   function navigateToDetailPage(ind) {
    window.location.href = "./html/job-details.html";
    jobIndex = 1

}
   function filterJobFeeds(filterType, filterValue) {
    var filteredList = []

    if(filterType == "jobCategory")
    filteredList = jobFeeds.filter((jobfeed) => jobfeed.jobCategory.indexOf(filterValue) >-1)
    
    if(filterType == "jobType")
    filteredList = jobFeeds.filter((jobfeed) => jobfeed.jobType.indexOf(filterValue) > -1)

    console.log(filteredList)
    createContentOfJobFeed(filteredList)

   }


   function createContentOfJobFeed(list) {
    var jobPosting = document.getElementById("jobs-postings"); 
    var ele = ""
    jobPosting.innerHTML = ""
    for(jobdata in list) {
        job = list[jobdata]
        ele += "<div class='card'><div class='card-content display-content'><h4 class=''>"+job.jobPosition +"</h4>"+
        "<div class='display-flex'><h6> "+ job.companyName+"</h6> &nbsp;&nbsp;<h6>"+job.rating+"</h6> <i class='fa-solid fa-star'></i></div>" +
        "<div class='display-flex'><i class='fa-solid fa-calendar'></i>&nbsp;<h6></h6>"+ job.experience+"</div>"+
        "<div class='display-flex'><i class='fa-sharp fa-solid fa-location-dot'></i>  <span>"+job.location+"</span> </div>"+
        "<div class='display-flex'><i class='fa-solid fa-calendar'></i> <span>Employment type:</span><span class='job-type'>"+
        job.jobType+"</span>  &nbsp;<span id='job-category'>"+ job.jobCategory+"</span></div>"+     
        "<hr>"+
        "<div class='display-flex'>  <span>Posted </span><span id='posted-date'>"+job.postingDate+"</span><span></span> days ago</span></div>"
        +"</div></div>"
    }
    jobPosting.innerHTML = ele
   }


   function getjobByJobId(){  
    var jobId = jobIndex
    console.log(jobId)
    fetch('../assets/json/job-vacancy-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then((data) =>
    {
        var result = [];

        for(var i in data)
        result.push([i, data [i]]);

        // console.log(result)
        for(var i in result)
        {

            if(result[i][1].jobId == jobId) {
                jobFound = result[i][1]

                console.log(jobFound)
                showJobDetails();
            }


        }
    } ) 




   }  


function applyJob() {
    var modal = document.getElementById("apply-modal-container");
    modal.style.display = "block";
}

  

function closeModal() {
    var modal = document.getElementById("apply-modal-container");
    modal.style.display = "none";
}

function showToast() {
  var error = document.getElementById("error-msg");
  error.innerHTML = "";
  phonePattern = /^[0-9]{10}$/;
  emailPattern =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Validation paatern taken from https://regexr.com/3e48o
  let fullName = document.forms["jobApplicationFrom"]["name"].value;
  let phone = document.forms["jobApplicationFrom"]["phone"].value;
  let email = document.forms["jobApplicationFrom"]["email"].value;
  if (fullName.trim() == "" || phone.trim() == "" || email.trim() == "" ) {
    error.innerHTML = "Please fill all the required details";
  }
  else if (phone.trim() != "" && !phonePattern.test(phone.trim()) ) {
    console.log(phonePattern.test(phone.trim()))
    error.innerHTML = "Please enter correct phone";
  }

   else if (email.trim() != "" && !emailPattern.test(email.trim()) ) {
    console.log(emailPattern.test(email.trim()))
    console.log(email.trim() != "")
    error.innerHTML = "Please enter correct email";
  }
  else {
    error.innerHTML = ""
    var x = document.getElementById("toastNotification");
    document.getElementById("jobApplicationFrom").reset();
    closeModal()
    x.style.display = "block"; 
    setTimeout(() => {
        x.style.display = "none"; 
    }, 1500);
  }




}

function showJobDetails() {
    
    console.log("showJobDetails")
    // console.log(jobFound.jobPosition)
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
    const today = new Date();
    const posteddate = new Date(jobFound.postingDate);
    var timeDifference = today.getTime() - posteddate.getTime();
    var days =  timeDifference / (1000 * 3600 * 24);
    postdate.innerHTML = Math.abs(Math.round(days))
    generatePErksandBenefits() 
    
  
}

function generatePErksandBenefits() {
    
   var eleToAdd = ""
    for (perk  in  jobFound.jobPerksAndBenifits) {
        if(jobFound.jobPerksAndBenifits[perk] == "Team Outings") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/TeamOuting.jpg' alt='benefit-img'><div class='benefit-label'>Team Outings</div></div></div>"
        }
        if(jobFound.jobPerksAndBenifits[perk] == "Work From Home") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/WFH.jpg' alt='benefit-img'><div class='benefit-label'>Work From Home</div></div></div>"
        }
        if(jobFound.jobPerksAndBenifits[perk] == "Soft Skill Training") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/SoftSkillsTraining.jpg' alt='benefit-img'><div class='benefit-label'>Soft Skill Training</div></div></div>"
        }
        if(jobFound.jobPerksAndBenifits[perk] == "International Relocation") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Education.jpg' alt='benefit-img'><div class='benefit-label'>International Relocation</div></div></div>"
        }
        if(jobFound.jobPerksAndBenifits[perk] == "Health Insurance") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Transportation.jpg' alt='benefit-img'><div class='benefit-label'>Health Insurance</div></div></div></div>"
        }
        if(jobFound.jobPerksAndBenifits[perk] == "Cafateria") {
            console.log(perk)
            eleToAdd +=   "<div class='benefit'><div class='benefit-inside'> <img class='benefit-img' src='https://static.ambitionbox.com/img/emailers/Transportation.jpg' alt='benefit-img'><div class='benefit-label'>Cafateria</div></div></div></div>"
        }
      }

    var per = document.getElementById("perks");
    per.innerHTML = eleToAdd

    
  
}