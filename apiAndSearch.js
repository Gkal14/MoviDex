var searchBtn = $('#search-btn');


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
getMovieName()

function getDataOMDB()
{
    
}
