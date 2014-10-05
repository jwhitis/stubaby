$(document).on("ready", function() {

  // Flickr account ID
  var flickr_id = "75673948@N07";

  // Fetch public photos from Flickr
  var flickr_url = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON(flickr_url, {
    id: flickr_id,
    format: "json"
  }).done(function(data) {
    console.log(data);

    // Create an image tag for each returned photo
    $.each(data.items, function(index, item) {
      var image_url = item.media.m;
      var flickr_regexp = /(http:\/\/farm\d+.staticflickr.com\/\d+\/\d+_[0-9A-z]+_)[\w-](\.\w+)/;
      var matches = flickr_regexp.exec(image_url);
      image_url = matches[1] + "n" + matches[2];
      var image_tag = "<img src=\"" + image_url + "\" />"
      $("div#main").append(image_tag);
    });
  });
});

// Flickr Photo URL Format:
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
