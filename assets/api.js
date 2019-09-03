$(document).ready(function() {
  let bestRated = [];
  let bestId = [];
  let best_rated;
  let reviews = [];
  const key = "e68dd11c5f272a6460046d68e988be4d";
  $("#add-second").hide();
  //$("#recently-viewed").hide();
  $("#best-rated").hide();
  $("#res-output").hide();
  $("#read-reviews").hide();
  $("#hide-reviews").hide();
  //$("#cuisine-search").hide();
  function displayRestaurants() {
    $("#res-output").hide();
    //$("#rate-display").html("");
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
        $("#best-rated-section").replaceWith(
          `<input id="best-rated" type="submit" class="m-2 btn btn-info" value="Search by best rated" />`
        );
        $("#best-rated").on("click", function(event) {
          event.preventDefault();
          //$("#add-city").hide();

          $("#best-rated").show();
          $("#rate-display").show();

          for (
            let optionIndex = 0;
            optionIndex < bestRated.length;
            optionIndex++
          ) {
            let res_button = $(
              `<button id = res_button${optionIndex} class= "restaurant m-2 btn btn-dark">${bestRated[optionIndex]}</button>`
            );

            // let res_name = res_button.text();
            // let res_id = bestId[optionIndex];
            res_button.attr("name", res_button.text());
            res_button.attr("res-id", bestId[optionIndex]);
            $("#rate-display").append(res_button);
            // console.log(res_button.attr("name"));
            // console.log(res_button.attr("res-id"));
          }

          $(".restaurant").on("click", function(event) {
            reviews = [];
            $("#best-rated").hide();
            $("#add-second").show();
            $("#main-section").show();
            $("#review-section").show();
            $("#menu-section").show();
            $("#image-section").show();

            $("#image-section").html("");
            $("#review-section").html("");
            //$("#rate-display").hide();
            //$("#recently-viewed").show();
            $("#recently-viewed").append($(this));

            //event.preventDefault();
            //$("#rate-display").text($(this).attr("name"));
            let res_name = $(this).attr("name");
            let res_id = $(this).attr("res-id");

            $.ajax({
              url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`,
              method: "GET",
              headers: {
                "user-key": key,
                Accept: "application/json"
              }
            }).then(function(restaurant_data) {
              console.log(restaurant_data);

              let menu_url = restaurant_data.menu_url;
              // let photo_url = restaurant_data.photos[0].photo.url;
              let photo_url0 = restaurant_data.photos[0].photo.url;
              let photo_url1 = restaurant_data.photos[1].photo.url;
              let photo_url2 = restaurant_data.photos[2].photo.url;
              let address = restaurant_data.location.address;
              let lat = restaurant_data.location.latitude;
              let lon = restaurant_data.location.longitude;
              let phone = restaurant_data.phone_numbers;
              $("#address-section").html(
                `<p class = "font-weight-bold m-2">Address: ${address}</p>`
              );
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
              //$("#review-section").text("Restaurant Reviews");
              // $("#review-body").append(
              //   `<button id = "read-reviews" class = col-md-2>Show Reviews</button></br>`
              // );
              // $("#review-body").append(
              //   `<button id = "hide-reviews" class = col-md-2>Hide Reviews</button></br>`
              // );

              $("#read-reviews").show();
              $("#read-reviews").on("click", function(event) {
                $("#review-section").html("");
                $("#review-section").show();
                //$("#read-reviews").show();
                $("#hide-reviews").show();
                reviews = restaurant_data.all_reviews.reviews;

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

                $("#hide-reviews").on("click", function(event) {
                  $("#review-section").hide();
                });
              });

              let image_sec0 = `<img class="img-thumbnail col-md-3" src = "${photo_url0}">`;
              let image_sec1 = `<img class="img-thumbnail col-md-3" src = "${photo_url1}">`;
              let image_sec2 = `<img class="img-thumbnail col-md-3" src = "${photo_url2}">`;
              $("#image-section").append(image_sec0);
              $("#image-section").append(image_sec1);
              $("#image-section").append(image_sec2);
              // for (let imgIndex = 0; imgIndex < 3; imgIndex++) {
              //   let image_sec = `<img class="img-thumbnail" src = "${"photo_url" +
              //     imgIndex}">`;

              //   $("#image-section").append(image_sec);
              // }
              let menu_sec = `<a class = "font-weight-bold" href = "${menu_url}" target="_blank">Take a look at the menu!</a>`;
              $("#menu-section").html(menu_sec);
            });
          });
        });
      });
    });
  }

  $("#add-city").on("click", function(event) {
    event.preventDefault();
    // $("#add-second").hide();
    $("#recently-viewed").show();
    $("#main-section").hide();
    $("#review-section").hide();
    $("#menu-section").hide();
    $("#image-section").hide();
    $("#best-rated").show();
    //$("#cuisine-search").show();

    displayRestaurants();
  });

  $("#add-second").on("click", function(event) {
    //event.preventDefault();
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

  //displayRestaurants();
});
