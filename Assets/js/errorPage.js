var errorStatus = $('#errorArea h1')
var errorText = $('#errorArea p')
var homeBtn = $('#errorArea button')

function init(){
    var status = getstatus()
    errorStatus.text(status.status)
    errorText.text(status.text)
}

init()

function getstatus(){
    var query = document.location.search
    if (query.includes('=')){
        var param = query.split('&')
        var status = param[0].split('=')[1]
        var statusText = param[1].split('=')[1]
        statusText= statusText.replaceAll("%20"," ")
        var statusReturn = {
            status: status,
            text: statusText
        }
        return statusReturn
    }
    else{
        throw new Error("no parameter")
    }
}

function homeBtnClicked(){
    window.location.replace('./index.html')
}

homeBtn.on('click', homeBtnClicked)