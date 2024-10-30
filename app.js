async function sendData() {
    const user_id = document.getElementById('user_id').value;
    const user_name = document.getElementById('user_name').value;
    const purchased_products = document.getElementById('purchased_products').value;
    const purchased_total_value = document.getElementById('purchased_total_value').value;

    const data = {
        user_id: user_id,
        user_name: user_name,
        purchased_products: purchased_products,
        purchased_total_value: parseFloat(purchased_total_value)
    };

    try {
        const response = await fetch('https://your-api-gateway-endpoint.amazonaws.com/prod', {
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
}
