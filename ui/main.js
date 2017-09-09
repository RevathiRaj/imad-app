//Counter code
var button = document.getElementById('counter');

button.onclick = function ()
{
    //Create a request object
    var request = new XMLHTTPRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function ()
    {
        if (request.readyState === XMLHTTPRequest.DONE)
        {
            //Take some action
            if (request.status === 200)
            {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    //Make the request
    request.open('GET', 'http://revathitechwriter.imad.hasura-app.io', true);
    request.send(null);
};