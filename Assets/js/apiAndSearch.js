var searchBtn = $('#searchBtn')
var searchInput = $('#seachInput')
var omdbAPIKey = '6cf7de9c'
var xAPIHost = "streaming-availability.p.rapidapi.com"
var xAPIKey = "c972ba000bmsh5c513d7f768fef5p1bf959jsn00888084c569"
var posterImg = $('#posterImg')
var movieTitle = $('#movieTitle')
var movieOverview = $('#movieOverview')
var trailer = $('#videoPlayer')
var streamPlatform = $('#streamPlatform')
var posterCard = $('#posterCard')
var pClass = "font-normal text-gray-700 mb-3 dark:text-gray-400"
var scoreList = $('#scoreList')
var movieList = $('#movieList')
var singleMovieInfo= $('#singleMovieInfo')
var currentPage = 1
var maxPage = 0
var nextBtn = $('#nextBtn')
var prevBtn = $('#previousBtn')
var movieName

// initialzation
async function init(){
    maxPage = 0
    currentPage = 1
    movieName = getMovieName()
    if (movieName === ''){
        hideMovieList()
        return
    }
    displayMovieList(movieName, currentPage)
}
init()

function resizeSvg(width, height) {
    var streamList = $('#streamPlatform img')
    for (var i = 0; i < streamList.length; i++) {
        $(streamList[i]).attr('width', width)
        $(streamList[i]).attr('height', height)
    }
}

function hideAllSvg(){
    var streamList = streamPlatform.children()
    for (var i = 0; i < streamList.length; i++) {
        $(streamList[i]).attr('style', 'display:none;')
    }
}



// api call
function getMovieName(){
    var query = document.location.search
    if (query.includes('=')){
        var movie = query.split('=')[1]
        if (movie.length > 0){
            return movie
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

// return list of movie found from OMBD API
async function getMovieList(movieName, pageNum){
    var url = getMovieListURLOMDB(movieName, pageNum);
    var response

    // mostly used for catching offline requests
    try {
        response = await fetch(url)
    }
    catch (error) {
        throw error
    }

    checkResponseHeader(response)
    
    var data = await response.json()

    // check if response is ok but couldn't find any movie
    if (data.Response =="True"){
        return data
    }
    else{
        var errorParam = "status=404&statusText=" + data.Error
        var location = "./404.html?" + errorParam
        window.location.href = location
    }
}

// return url for movie list OMDB API  
function getMovieListURLOMDB(movieName, pageNum){
    var link = "https://www.omdbapi.com/?s=" + movieName + "&page=" + pageNum + "&apikey=" + omdbAPIKey
    return link
}

// return single movie data get from OMDB API
async function getSingleMovieDataOMDB(movieID){
    var url = getSingleMovieURLOMDB(movieID)
    try{
        var response = await fetch(url)
    }
    catch(e){
        throw e
    }

    var data = await response.json()
    return data
}


// return url for OMDB API call for single movie
function getSingleMovieURLOMDB(movieID){
    var link = "https://www.omdbapi.com/?i=" + movieID +"&apikey=" + omdbAPIKey
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
    try{
        var response = await fetch(url, option)
    }
    catch(e){
        throw e
    }
    if (!response.ok){
        return false
    }
    var data = response.json()
    return data
}

// return url for StreamingAvailability API call
function getURLStream(movieID){
    var link = 'https://streaming-availability.p.rapidapi.com/get/basic?country=au&imdb_id=' + movieID + '&output_language=en'
    return link
}

// check response header
function checkResponseHeader(response){
    if (!response.ok){
        // redirect to error page with status and statusText param
        var errorParam = "status="+ response.status + "&statusText=" + response.statusText
        var location = "./404.html?" + errorParam
        window.location.href = location
    }
    
}

// get youtube video url for displaying trailer
function getYouTubeLink(videoID){
    var link = "https://www.youtube.com/embed/" + videoID
    return link
}

// display data for list of movies
async function displayMovieList(movieName, pageNum){
    // clear board
    clearMovieList()
    // get data
    var data = await getMovieList(movieName, pageNum)
    if (maxPage == 0){
        maxPage = Math.ceil(data.totalResults/10)
    }

    if (pageNum == 1){
        prevBtn.attr('style','display:none;')
        nextBtn.attr('style','display:block;')
    }
    else if (pageNum == maxPage){
        nextBtn.attr('style','display:none;')
        prevBtn.attr('style','display:block;')
    }
    else{
        prevBtn.attr('style','display:block;')
        nextBtn.attr('style','display:block;')
    }

    var movieListData = data.Search

    // creating elements
    for (var i = 0; i < movieListData.length; i++){
        var childContainer = $('<div>').addClass('child mb-10 m-2 shadow-lg border-gray-800 relative hover:cursor-pointer').attr('data-id', movieListData[i].imdbID)
        var poster = $('<img>').addClass('w-full hover:cursor-pointer dark:text-gray-400').attr('src',movieListData[i].Poster).attr('alt', "Poster not found, Data might not be available").attr('data-id', movieListData[i].imdbID)
        var infoContainer = $('<div>').addClass('p-4 text-gray-700 dark:text-gray-400 hover:cursor-pointer').attr('data-id', movieListData[i].imdbID)
        var title = $('<div>').addClass('title font-bold block hover:underline dark:text-white').text(movieListData[i].Title).attr('data-id', movieListData[i].imdbID)
        var year = $('<p>').addClass('year text-md inline py-2 border-gray-400 my-2 mr-2').text(movieListData[i].Year).attr('data-id', movieListData[i].imdbID)
        var type = $('<p>').addClass('type text-md inline py-2 border-gray-400 my-2 ml-2').text(movieListData[i].Type).attr('data-id', movieListData[i].imdbID)
        infoContainer.append(title).append(year).append(type)
        childContainer.append(poster).append(infoContainer)
        movieList.append(childContainer)
    }
    

}

// clear movie to populate new data
function clearMovieList(){
    movieList.children().remove()
}

// hide movie list
function hideMovieList(){
    $('#movieListContainer').attr('style', 'display:none;')
}

// display data for single Movie
async function displaySingleMovieData(movieID){
    // get data from api
    try{
        var streamingData = await getDataStreamingAvailability(movieID)
        
    }
    catch(e){
        console.log(e)
    }

    try {
        var omdbData = await getSingleMovieDataOMDB(movieID)
    }        
    catch(e){
        console.log(e)
    }

    
    // hide movie List
    hideMovieList()
    

    // display container 
    singleMovieInfo.attr('style', 'display:flex')
    resizeSvg(100,100)
    hideAllSvg()
    
    // edit poster info
    posterImg.attr('src', omdbData.Poster).attr('alt', "Couldn't find poster image")
    movieTitle.text(omdbData.Title)
    movieOverview.text(omdbData.Plot)
    $('#pgRated span').text(omdbData.Rated)
    $('#type span').text(omdbData.Type)
    $('#release span').text(omdbData.Released)
    $('#runtime span').text(omdbData.Runtime)
    $('#director span').text(omdbData.Director)
    $('#boxOffice span').text(omdbData.BoxOffice)

    // display poster
    posterCard.attr('style', 'display:block;')

    // trailer video
    if (streamingData != false){
        var youtube = getYouTubeLink(streamingData.video)
        trailer.attr('src', youtube)
        $('#videoArea').attr('style', 'display:block;')
    }
    else{
        $('#videoArea').attr('style', 'display:none;')
    }
    

    // display score rated, if no score rated, display alt text
    var rating = omdbData.Ratings
    if (rating.length > 0 && rating !== undefined) {
        $('#noInfoRating').attr('style', 'display: none;')
        for (var i = 0; i < rating.length; i++) {
            var liEl = $('<li>')
            var p=$('<p>').addClass(pClass).text(rating[i].Source + ": " + rating[i].Value)
            liEl.append(p)
            scoreList.append(liEl)
        }
    }
    else{
        $('#noInfoRating').attr('style', 'display: block;')
    }

    // streaming platform links
    if(streamingData != false){
        var streamAvail = streamingData.streamingInfo
        var keys = Object.keys(streamAvail)
        // check if any streaming platform available, if not display alt text, if yes display the logo with link to the movie on that platform
        if (keys.length > 0){
            $('#na').attr('style', 'display: none;')
            for (var i = 0; i < keys.length; i++){
                var selectorString = '#' + keys[i]
                $(selectorString).attr('style', 'display: inline-block;')
                $(selectorString + " a").attr('href', streamAvail[keys[i]].au.link)
            }
        }
        else{
            $('#na').attr('style', 'display: inline-block;')
        }
    }
    else{
        $('#na').attr('style', 'display: inline-block;')
    }
    
    
    
}

// event handlers

function handleEnter(event){
    if (event.keyCode === 13) {
        searchBtn.click()
    }
}

function searchBtnClicked(){
    var input = searchInput.val().trim()
    if (input === ''){
        return
    }
    var location = './searchPage.html?movie=' + input
    window.location.href = location
}

function nextBtnClicked(){
    currentPage++
    displayMovieList(movieName, currentPage)
}

function prevBtnClicked(){
    currentPage--
    displayMovieList(movieName, currentPage)
}

function movieListClicked(event){
    var target = $(event.target)
    var movieID = target.attr('data-id')
    hideMovieList()
    displaySingleMovieData(movieID)
}

// add event handlers
searchInput.on('keyup', handleEnter)
searchBtn.on("click", searchBtnClicked)
nextBtn.on("click", nextBtnClicked)
prevBtn.on("click", prevBtnClicked)
movieList.on("click", ".child", movieListClicked)