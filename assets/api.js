$(document).ready(function() {
  //arrays that will store name and ID of restaurants from API
  let bestRated = [];
  let bestId = [];
  let best_rated;
  let reviews = [];
  const key = "e68dd11c5f272a6460046d68e988be4d"; //key for Zomato API
  //hide sections for API output when page initially loads
  $("#add-second").hide();
  $("#review-body").hide();
  $("#best-rated").hide();
  $("#res-output").hide();
  //declare function that will display output from API, every time user searches a city
  function displayRestaurants() {
    //$("#res-output").hide();
    //variable that stores city inputted by user
    let city = $("#city-input")
      .val()
      .trim();
    let max_results = 5;
    queryURL = `https://developers.zomato.com/api/v2.1/locations?query=${city}&count=${max_results}`;
    //use ajax method to pull data from Zomato API
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": key,
        Accept: "application/json"
      }
    }).then(function(response) {
      //parse through response object and declare variables for entity type and entity ID
      let location_type = response.location_suggestions[0].entity_type;
      let city_id = response.location_suggestions[0].city_id;
      // console.log(location_type);
      // console.log(city_id);
      //nested ajax call to pull restaurant list from entity ID outputted by previous API
      $.ajax({
        url: `https://developers.zomato.com/api/v2.1/location_details?entity_id=${city_id}&entity_type=${location_type}`,
        method: "GET",
        headers: {
          "user-key": key,
          Accept: "application/json"
        }
      }).then(function(response) {
        best_rated = response.best_rated_restaurant;
        //console.log(best_rated);
        //iterate through best rated array and store values in array
        for (let x = 0; x < best_rated.length; x++) {
          res_name = best_rated[x].restaurant.name;
          res_id = best_rated[x].restaurant.id;
          //console.log(res_id);
          bestRated.push(res_name);
          bestId.push(res_id);
          //console.log(bestId);
        }
        $("#best-rated-section").replaceWith(
          `<input id="best-rated" type="submit" class="m-2 btn btn-info" value="Search by best rated" />`
        );
        $("#loading").hide(); //hide loading gif once API calls stop running
        //on click event for user to choose output from restaurant button options
        $("#best-rated").on("click", function(event) {
          event.preventDefault();

          $("#best-rated").show();
          $("#rate-display").show();
          //iterate through best rated restaurants array and dynamically create a button for each
          for (
            let optionIndex = 0;
            optionIndex < bestRated.length;
            optionIndex++
          ) {
            let res_button = $(
              `<button id = res_button${optionIndex} class= "restaurant m-2 btn btn-dark">${bestRated[optionIndex]}</button>`
            );
            //create name and id attributes that store name and Id's of restaurants
            res_button.attr("name", res_button.text());
            res_button.attr("res-id", bestId[optionIndex]);
            $("#rate-display").append(res_button);
          }
          //on click function that allows users to see restaurant output from Zomato API
          $(".restaurant").on("click", function(event) {
            //reviews = [];
            $("#best-rated").hide();

            $("#add-second").show(); //show button that allows user to reset output and search for a different city
            $("#main-section").show();
            $("#review-body").show();
            $("#menu-section").show();
            $("#image-section").show();
            //reset image and reviews section for every restaurant search
            $("#image-section").html("");
            $("#review-section").html("");
            //append clicked restaurant buttons to recently viewed section
            $("#recently-viewed").append($(this));

            //event.preventDefault();
            //store restaurant names and id's of clicked buttons
            let res_name = $(this).attr("name");
            let res_id = $(this).attr("res-id");
            //ajax method that runs query using restaurant ID to output restaurant data when clicked
            $.ajax({
              url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`,
              method: "GET",
              headers: {
                "user-key": key,
                Accept: "application/json"
              }
            }).then(function(restaurant_data) {
              //console.log(restaurant_data);
              //declare variables to store restaurant data
              let menu_url = restaurant_data.menu_url;
              let photo_url0 = restaurant_data.photos[0].photo.url;
              let photo_url1 = restaurant_data.photos[1].photo.url;
              let photo_url2 = restaurant_data.photos[2].photo.url;
              let address = restaurant_data.location.address;
              let lat = restaurant_data.location.latitude;
              let lon = restaurant_data.location.longitude;
              let phone = restaurant_data.phone_numbers;
              //create section to store address and phone number
              $("#address-section").html(
                `<p class = "font-weight-bold m-2">Address: ${address}</p>`
              );
              //dynamically create iframe html element using Google Maps API
              //use address, latitude and longitude data onbtained from Zomato API output
              let map_url = `<iframe
              class = "m-2"
              width="200"
              height="200"
              frameborder="0"
              style="border:0"
              src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDjg64go4oQf2EIm7jy98i8NIIh2sB6rTE
              &q=${address}&center=${lat},${lon}" allowfullscreen></iframe>`;
              $("#map").html(map_url);

              $("#telephone-section").html(
                `<p class = "font-weight-bold m-2">Phone Number: ${phone}</p>`
              );

              reviews = restaurant_data.all_reviews.reviews;
              //iterate through reviews array and create a div for each
              for (
                let reviewIndex = 0;
                reviewIndex < reviews.length;
                reviewIndex++
              ) {
                let review_sec = `<div>Review ${reviewIndex + 1}: ${
                  reviews[reviewIndex].review.review_text
                }</div></br>`;
                $("#review-section").append(review_sec);
              }
              //create img elements
              let image_sec0 = `<img class="img-thumbnail col-md-3" src = "${photo_url0}">`;
              let image_sec1 = `<img class="img-thumbnail col-md-3" src = "${photo_url1}">`;
              let image_sec2 = `<img class="img-thumbnail col-md-3" src = "${photo_url2}">`;
              $("#image-section").append(image_sec0);
              $("#image-section").append(image_sec1);
              $("#image-section").append(image_sec2);
              //create a tag for menu link
              let menu_sec = `<a class = "font-weight-bold" href = "${menu_url}" target="_blank">Take a look at the menu!</a>`;
              $("#menu-section").html(menu_sec);
            });
          });
        });
      });
    });
  }
  //on click event that allows user to search for restaurants in a city
  $("#add-city").on("click", function(event) {
    event.preventDefault();
    $("#loading-section").replaceWith(
      `<img class = "col-md-2 ml-2" id= "loading" src = "assets/gifloader.gif">`
    );
    $("#recently-viewed").show();
    $("#main-section").hide();
    $("#menu-section").hide();
    $("#image-section").hide();
    $("#best-rated").show();
    //call function that runs API's and display output in html
    displayRestaurants();
  });
  //on click event that allows user to search for a different city
  $("#add-second").on("click", function(event) {
    //event.preventDefault();
    //reset page
    $("#recently-viewed").show();
    $("#city-input").val("");
    $("#rate-display").replaceWith("");
    $("#main-section").hide();
    $("#review-section").hide();
    $("#menu-section").hide();
    $("#image-section").hide();
    $("#best-rated").hide();
    $("#add-second").hide();
  });
});
