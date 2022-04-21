var searchBtn = $('#searchBtn')
var searchInput = $('#seachInput')
var omdbAPIKey = '6cf7de9c'
var xAPIHost = "streaming-availability.p.rapidapi.com"
var xAPIKey = "48af6d5201msh053c835d802b65ep19886ajsnbee02c30d0f3"
var posterImg = $('#posterImg')
var movieTitle = $('#movieTitle')
var movieOverview = $('#movieOverview')

// initialzation
async function init(){
    var movieName = getMovieName()
    if (movieName === ''){
        // show modal
        return
    }
    var omdbData = await getDataOMDB(movieName)
    var streamingData = await getDataStreamingAvailability(omdbData.imdbID)
    console.log(omdbData,streamingData)
    displayData(omdbData, streamingData)
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

// return data get from OMDB API
async function getDataOMDB(movieName){
    var url = getURLOMDB(movieName)
    var response = await fetch(url)
    if (response.status != 200){
        // TODO redirect to error page with status and statusText param
    }
    var data = await response.json()
    return data
}


// return url for OMDB API call
function getURLOMDB(movieName){
    var link = "https://www.omdbapi.com/?t=" + movieName +"&apikey=" + omdbAPIKey
    return link
}

// return data get from StreamingAvailability API
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

// return url for StreamingAvailability API cal;
function getURLStream(movieID){
    var link = 'https://streaming-availability.p.rapidapi.com/get/basic?country=au&imdb_id=' + movieID + '&output_language=en'
    return link
}



// rendering function

function displayData(omdbData, streamingData){
    posterImg.attr('src', omdbData.Poster).attr('alt', streamingData.tagline)
    movieTitle.text(omdbData.Title)
    movieOverview.text(omdbData.Plot)
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