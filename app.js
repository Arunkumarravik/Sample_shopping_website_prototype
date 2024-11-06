const path = window.location.pathname;
// Retrieve the token from sessionStorage
const accessToken = sessionStorage.getItem("accessToken");

if( path.includes('input.html')){
document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const user_id = document.getElementById('user_id').value;
    const user_name = document.getElementById('user_name').value;
    const milk= document.getElementById('Milk').value;
    const fat= document.getElementById('Fat').value;
    const weight= document.getElementById('weight').value;
    const rpl= document.getElementById('num').value;
    const amount= document.getElementById('Amnt').value;
    const spend= document.getElementById('spend').value;
    const shift= document.getElementById('shift').value;
    const date= document.getElementById('date').value;

    console.log(shift);
    console.log(date);
    console.log(milk);

    const data = {
        id    : parseInt(user_id),
        name  : user_name,
        milk  : milk,
        fat   :parseFloat(fat),
        weight:parseFloat(weight),
        rpl   : parseFloat(rpl),
        amount:parseFloat(amount),
        spend: parseFloat(spend),
        date : date,
        shift : shift
        
    };

    try {
        const response = await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/post_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Data submitted successfully!");
        } else {
            alert("Error submitting data!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit data.");
    }
});
}

if (path.includes('output.html')){

async function fetchData() {
    try {
        let fromdate=document.getElementById('from-date').value;
        let todate=document.getElementById('to-date').value;

        const today = new Date().toISOString().split("T")[0];
        const startdate=new Date('2024-09-11').toISOString().split("T")[0];

        if(!fromdate){
            fromdate=startdate;
        }
        if(!todate){

            todate=today;
        }

        console.log(fromdate);
        console.log(todate);

        const response = await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/get_data',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        }); // Replace with your API URL
        const data = await response.json(); // This parses the JSON data

        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        // Clear existing data in the table
        tableBody.innerHTML = '';

        const daty=JSON.parse(data.body);

        console.log(daty);

        for (const [key, value] of Object.entries(daty)) {

            const row = tableBody.insertRow();
            const cellName = row.insertCell(0);
            const cellliter = row.insertCell(1);
            const cellmoney = row.insertCell(2);
            const cellspend = row.insertCell(3);

            cellName.textContent=key;
            cellliter.textContent=daty[key]["milk_pro"]
            cellmoney.textContent=daty[key]["money"];
            cellspend.textContent=daty[key]["spend"];
            console.log(daty[key]["spend"]);
        }

        // Loop through the JSON data and create table rows
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Add an event listener to the button
document.getElementById('get_count').addEventListener('click', fetchData);



}