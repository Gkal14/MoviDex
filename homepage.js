var searchInput = $('#searchInput')
var searchBtn = $('#searchBtn')


// add event Listener
searchBtn.on('click', searchBtnClicked)

// handle search button click
function searchBtnClicked(){
    var input = searchInput.val().trim()
    // handle blank input
    if (input === ''){
        return
    }
    var location = './searchPage.html?movie=' + input
    window.location.replace(location)
}