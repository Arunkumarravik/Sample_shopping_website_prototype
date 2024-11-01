const path = window.location.pathname;
// Retrieve the token from sessionStorage
const accessToken = sessionStorage.getItem("accessToken");

if( path.includes('input.html')){
document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const user_id = document.getElementById('user_id').value;
    const user_name = document.getElementById('user_name').value;
    const purchased_products = document.getElementById('purchased_products').value;
    const purchased_total_value = document.getElementById('purchased_total_value').value;
    const tsp=Date.now();
    console.log(tsp)
    const date = new Date(tsp);
    const ds= date.toDateString();
    const data = {
        id: parseInt(user_id),
        ts: ds,
        name: user_name,
        ps: purchased_products,
        pv: parseFloat(purchased_total_value)
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

    document.getElementById('get_count').addEventListener('click', async function (event) {
    event.preventDefault()
    console.log('iguchi')

    const response=await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/get_data',{
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
    })

    const data=await response.json();

    const item=JSON.parse(data.body);

    document.getElementById('output').innerText = item["Count_users"]; 
});

document.getElementById('get_total').addEventListener('click', async function (event) {
    event.preventDefault()

    const response=await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/get_data',{
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
    })

    const data=await response.json();

    console.log(data);

    const item=JSON.parse(data.body);

    document.getElementById('output').innerText = item["Sum_vaule"]; 
});

}