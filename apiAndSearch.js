var searchBtn = $('#search-btn');
var omdbAPIKey = '6cf7de9c'
var xAPIHost = "streaming-availability.p.rapidapi.com"
var xAPIKey = "48af6d5201msh053c835d802b65ep19886ajsnbee02c30d0f3"

// api call
function getMovieName(){
    var query = document.location.search
    if (query.includes('=')){
        var movieName = query.split('=')[1]
        if (movieName.length > 0){
            return movieName
        }
        else{
            // if movie name field is empty
            return ""
        }
    }
    else{
        // if query part is empty
        return ""
    }
}

function getDataOMDB(movieID)
{
    
}

function getDataStreamingAvailability(movieName){

}



// rendering function

function displayData(){

}
