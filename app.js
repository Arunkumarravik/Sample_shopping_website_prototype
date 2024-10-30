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
        const response = await fetch('https://t4n7euvfyc.execute-api.us-east-1.amazonaws.com/practice_stage/pro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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


document.getElementById('get_count').addEventListener('onclick', async function (event) {
    event.preventDefault()

    const data=await fetch('https://t4n7euvfyc.execute-api.us-east-1.amazonaws.com/practice_stage/get-data',{
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    })
});

document.getElementById('get_total').addEventListener('onclick', async function (event) {
    
});