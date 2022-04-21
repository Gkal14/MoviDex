var searchBtn = $('#searchBtn')
var searchInput = $('#seachInput')
var omdbAPIKey = '6cf7de9c'
var xAPIHost = "streaming-availability.p.rapidapi.com"
var xAPIKey = "48af6d5201msh053c835d802b65ep19886ajsnbee02c30d0f3"



// initialzation
async function init(){
    var omdbData = await getDataOMDB()
    var streamingData = await getDataStreamingAvailability(omdbData.imdbID)
}

init()

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

async function getDataOMDB(){
    var movieName = getMovieName()
    var url = getURLOMDB(movieName)
    var response = await fetch(url)
    var data = await response.json()
    return data
}



function getURLOMDB(movieName){
    var link = "https://www.omdbapi.com/?t=" + movieName +"&apikey=" + omdbAPIKey
    return link
}

async function getDataStreamingAvailability(movieID){
    var option = {
        method: "GET",
        headers:{
            'X-RapidAPI-Host': xAPIHost,
            'X-RapidAPI-Key': xAPIKey
        }
    }
    var url = getURLStream(movieID)
    var response = await fetch(url, option)
    var data = response.json()
    return data
}

function getURLStream(movieID){
    var link = 'https://streaming-availability.p.rapidapi.com/get/basic?country=au&output_language=en&imdb_id=' + movieID
    return link
}



// rendering function

function displayData(){

}

// event handlers

function searchBtnClicked(){
    var input = searchInput.val().trim()
    if (input === ''){
        return
    }
    var location = './searchPage.html?movie=' + input
    window.location.replace(location)
}


// add event handlers

searchBtn.on("click", searchBtnClicked)