async function getUser() {


     const displayData = document.getElementById("userDetails")

     try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/6")
        const userData = await response.json()

        const userList = document.createElement("p")
        userList.innerHTML = JSON.stringify(userData)
        document.body.appendChild(userList)  

       
     }  catch(err) {
        userList.textContent = "error"
         console.log(err.message)

     }
}
      
getUser()