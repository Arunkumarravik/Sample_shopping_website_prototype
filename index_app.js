

AWS.config.region = 'us-east-1'; // Your AWS region
const cognito = new AWS.CognitoIdentityServiceProvider();



async function storeTokenFromUrl() {

    //HASHING PART
     
    const hash = window.location.hash;

    console.log(hash)

    if (hash) {
        // Use URLSearchParams to parse the hash
        const params = new URLSearchParams(hash.substring(1)); // remove the '#' at the start

        // Check if 'access_token' exists in the hash
        const access_Token = params.get("access_token");

        console.log(access_Token);

        if (access_Token) {
        
            sessionStorage.setItem("accessToken", access_Token);
            console.log("Access token stored in sessionStorage:", access_Token);

        } else {
            console.log("No access token found in the URL.");
        }
    }
    else {
        console.log("No hash present in the URL.");
    }


    const params = new URLSearchParams(hash.substring(1));
    //getting the accesstoken
    const access_Token = params.get("access_token");
    const getUsername = (accessToken) => {
        return new Promise((resolve, reject) => {
          cognito.getUser({ AccessToken: accessToken }, (err, data) => {
            if (err) reject(err);
            else resolve(data.Username); // Get the username
          });
        });
      };
      getUsername(access_Token)
        .then(username => {
          console.log("Username:", username);
          sessionStorage.setItem("username", username);
          document.getElementById('username').textContent = username; // Display on webpage
        })
        .catch(err => console.log("Error:", err)); 
    //Getting the username with help of accessToken
    const accessToken = sessionStorage.getItem("accessToken");
    const username  = sessionStorage.getItem("username");
    
    dat={

        user_name:username
    };

      const response=await fetch('https://bvbfwuacy7.execute-api.us-east-1.amazonaws.com/Dev_env/check_farmer_id',{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(dat)
      });

      console.log(response.ok);

      const item=await response.json();

      console.log(item);

      const data=JSON.parse(item.body);

      console.log(data);

      if (data.farmer_id==0){

        let ele=document.getElementById('farmer_id');

        ele.innerHTML=`<div class="form-container">
                <label for="farmer_id">Enter the farmer id:</label>
                <input type="text" id="farmer" placeholder="Enter the farmer_id">
                
                
                <button onclick="submitForm()">Submit</button>
              </div>`;
              
        
        
      }


      if(data.farmer_id!=0){
        let ele=document.getElementById('farmer_id');

        ele.innerHTML=`<h2>Farmer_id : "${data.farmer_id}" </h2>`;
        sessionStorage.setItem("farmer_id", data.farmer_id);

      }

}
document.addEventListener("DOMContentLoaded", storeTokenFromUrl);

console.log("logging enabled")

function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const content=document.getElementById("content");
        sidebar.classList.toggle("active");
         
}