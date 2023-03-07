
 let jobFound = null
 let jobList = []
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
        // var json_data = {"2013-01-21":1,"2013-01-22":7};
        jobList = [];

        for(var i in data)
        jobList.push([i, data [i]]);

        // console.log(result)
        // for(var i in result)
        // {
            console.log(jobList)

        // }
    } ) 




   }  

   function getjobByJobId(jobId){  
    console.log('getjobByJobId')
    console.log(jobList)
    // var loader = document.getElementById("loader");
    // setTimeout(() => {
    //     loader.style.display = "none"; 
    // }, 1500);
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
    document.getElementById("jobApplicationFrom").reset();
    closeModal()
    x.style.display = "block"; 
    setTimeout(() => {
        x.style.display = "none"; 
    }, 1500);
}

