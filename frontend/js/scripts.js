button1.onclick = function () {

    fetch('/users')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
        }).catch(function (error) {
            console.log(error)
        })

    // output.innerHTML += "You clicked the button @ " + theHr + ":" + theMin + ":" + theSec + "<br />";

}


button2.onclick = function () {

    var user = { username: username.value, email: email.value }
    var options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    fetch( '/addusers', options )
    .then( res => res.text() )
    .then( data => console.log('Success:', data) )
    .catch( error => console.error('Error:', error) );

}


button3.onclick = function () {
    
    var user = { username: username.value }
    var options = {
        method: 'DELETE',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    fetch('/users', options)
    .then( res => res.text() )
    .then( response => console.log('Success:', response) )
    .catch( error => console.error('Error:', error) );

}


// button4.onclick = function () {

// }


