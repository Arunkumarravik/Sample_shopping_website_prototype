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

    const data = {
        id    : parseInt(user_id),
        name  : user_name,
        milk  : milk,
        fat   :parseFloat(fat),
        weight:parseFloat(weight),
        rpl   : parseFloat(rpl),
        amount:parseFloat(amount),
        spend: 50
        
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
        const response = await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/get_data',{
            method: 'GET',
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
            cellliter.textContent=key["milk_pro"]
            cellmoney.textContent=key["money"];
            cellspend.textContent=key["spend"];
            console.log(key.milk_pro);
        }

        // Loop through the JSON data and create table rows
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Add an event listener to the button
document.getElementById('get_count').addEventListener('click', fetchData);



}