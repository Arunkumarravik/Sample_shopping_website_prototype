

AWS.config.region = 'us-east-1'; // Your AWS region
const cognito = new AWS.CognitoIdentityServiceProvider();



function storeTokenFromUrl() {

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
          document.getElementById('username').textContent = username; // Display on webpage
        })
        .catch(err => console.log("Error:", err));
      

}

document.addEventListener("DOMContentLoaded", storeTokenFromUrl);

console.log("logging enabled")

function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const content=document.getElementById("content");
        sidebar.classList.toggle("active");
         
}