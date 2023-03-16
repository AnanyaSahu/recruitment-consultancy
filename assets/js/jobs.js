var jobFeeds = []
var jobIndex = 0

function getjobVacancies(){  
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
                var jobFound = result[i][1]

                // console.log(result[i][1])
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
    var x = document.getElementById("toastNotification");
    closeModal()
    x.style.display = "block"; 
    setTimeout(() => {
        x.style.display = "none"; 
    }, 1500);
}

