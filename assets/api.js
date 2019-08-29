$(document).ready(function() {});
let bestRated = [];
$("#best-rated").hide();
$("#cuisine-search").hide();
function displayRestaurants() {
  let city = $("#city-input")
    .val()
    .trim();
  let max_results = 5;

  const key = "e68dd11c5f272a6460046d68e988be4d";
  queryURL = `https://developers.zomato.com/api/v2.1/locations?query=${city}&count=${max_results}`;
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": key,
      Accept: "application/json"
    }
  }).then(function(response) {
    let location_type = response.location_suggestions[0].entity_type;
    let city_id = response.location_suggestions[0].city_id;
    console.log(location_type);
    console.log(city_id);
    $.ajax({
      url: `https://developers.zomato.com/api/v2.1/location_details?entity_id=${city_id}&entity_type=${location_type}`,
      method: "GET",
      headers: {
        "user-key": key,
        Accept: "application/json"
      }
    }).then(function(response) {
      let best_rated = response.best_rated_restaurant;
      console.log(best_rated);
      for (let x = 0; x < best_rated.length; x++) {
        res_name = best_rated[x].restaurant.name;
        bestRated.push(res_name);
      }
    });
  });
}

$("#add-city").on("click", function(event) {
  $("#best-rated").show();
  $("#cuisine-search").show();
  event.preventDefault();

  displayRestaurants();
});
//displayRestaurants();

$("#best-rated").on("click", function(event) {
  $("#rate-display").html(bestRated);
});
