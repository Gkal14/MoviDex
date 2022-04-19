const ApiKey ="5552ed791afd8968c2385d0dab7c508d"
const city = ""
async function makeRequest() {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${ApiKey}`)
        console.log('response.status: ', response.status); 
        if (!response.ok){
          console.log("response not ok", response);
        }
    } catch (err) {
        console.log(err);
    }
}
makeRequest();
function displayError()
{
    // $('#id'.) 
    // redraw movie container of the html
}