var searchInput = $('#searchInput')
var searchBtn = $('#searchBtn')


// add event Listener
searchBtn.on('click', searchBtnClicked)
searchInput.on('keyup', handleEnter)

// handle search button click
function searchBtnClicked(){
    var input = searchInput.val().trim()
    // handle blank input
    if (input === ''){
        return
    }

    // configure url and redirect to searchPage with parameter
    var location = './searchPage.html?movie=' + input
    window.location.href = location
}

function handleEnter(event){
    if (event.keyCode === 13) {
        searchBtn.click()
    }
}