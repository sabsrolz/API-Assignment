$(document).ready(function() {});
const key = "e68dd11c5f272a6460046d68e988be4d";
queryURL = "https://developers.zomato.com/api/v2.1/locations?query=Chicago";

$.ajax({
  url: queryURL,
  method: "GET",
  // crossDomain: true,
  // dataType: "json",
  headers: {
    "user-key": key,
    Accept: "application/json"
  }
}).then(function(response) {
  console.log(response);
});

// const queryURL =
//   "https://webcamstravel.p.rapidapi.com/webcams/list/country=GT&show=webcams:image,location,url";

// $.ajax({
//   url: queryURL,
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
//     "x-rapidapi-key": "c04ea25392msh10e8fa8f87c46a4p1e4622jsnf4d70b746bed"
//   }
// }).then(function(response) {
//   console.log(response);
//   web_url = JSON.stringify(response.result.webcams[0].url.edit);
//   console.log(web_url);

//   $("#image_div").replaceWith(`<img src =${web_url}/>`);
// });
