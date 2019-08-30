$(document).ready(function() {
  let bestRated = [];
  let bestId = [];

  //let res_name;
  // let res_id;
  let best_rated;
  const key = "e68dd11c5f272a6460046d68e988be4d";
  $("#best-rated").hide();
  $("#cuisine-search").hide();
  function displayRestaurants() {
    let city = $("#city-input")
      .val()
      .trim();
    let max_results = 5;

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
        best_rated = response.best_rated_restaurant;
        console.log(best_rated);
        for (let x = 0; x < best_rated.length; x++) {
          res_name = best_rated[x].restaurant.name;
          res_id = best_rated[x].restaurant.id;
          console.log(res_id);
          bestRated.push(res_name);
          bestId.push(res_id);
          console.log(bestId);
        }
      });
      $("#best-rated").on("click", function(event) {
        $("#best-rated").show();
        event.preventDefault();
        for (
          let optionIndex = 0;
          optionIndex < bestRated.length;
          optionIndex++
        ) {
          let res_button = $(
            `<button id = res_button${optionIndex} class= "restaurant">${bestRated[optionIndex]}</button></br>`
          );

          let res_name = res_button.text();
          let res_id = bestId[optionIndex];
          res_button.attr("name", res_name);
          res_button.attr("res-id", res_id);
          $("#rate-display").append(res_button);
          // console.log(res_button.attr("name"));
          // console.log(res_button.attr("res-id"));
        }

        $(".restaurant").on("click", function(event) {
          //event.preventDefault();
          //$("#rate-display").text($(this).attr("name"));
          console.log($(this).attr("name"));
          console.log($(this).attr("res-id"));
          $("#rate-display").replaceWith("this restaurant was selected");
        });
      });
    });
  }

  $("#add-city").on("click", function(event) {
    event.preventDefault();
    $("#best-rated").show();
    //$("#cuisine-search").show();

    displayRestaurants();
  });

  //displayRestaurants();
});
