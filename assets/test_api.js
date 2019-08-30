const key = "e68dd11c5f272a6460046d68e988be4d";
$.ajax({
  url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=16736014`,
  method: "GET",
  headers: {
    "user-key": key,
    Accept: "application/json"
  }
}).then(function(response) {
  console.log(response);
});
