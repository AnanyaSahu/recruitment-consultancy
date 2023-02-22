function getjobVacancies(){  
    fetch('./JSON/job-vacancy-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then((data) =>
    {
        console.log(JSON.stringify(data))
    } ) 
   }  