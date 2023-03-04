

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
        // var json_data = {"2013-01-21":1,"2013-01-22":7};
        var result = [];

        for(var i in data)
        result.push([i, data [i]]);

        // console.log(result)
        // for(var i in result)
        // {
        //     console.log(result[i][1])
        // }
    } ) 




   }  

   function getjobByJobId(jobId){  
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

        console.log(result)
        for(var i in result)
        {

            if(result[i][1].jobId == jobId) {
                var jobFound = result[i][1]

                console.log(result[i][1])
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

