$(document).on("ready", function() {

  // Fetch public photos from Flickr
  var flickr_url = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var flickr_id = "75673948@N07"; // Change this to your Flickr account ID

  $.getJSON(flickr_url, {
    id: flickr_id,
    format: "json"
  }).done(function(data) {
    var photos = data.items;

    // Add an image element for each returned photo
    $.each(photos, function(index, photo) {

      // Modify image URL to fetch correct image size
      var image_url = photo.media.m;
      var flickr_regexp = /(http:\/\/farm\d+.staticflickr.com\/\d+\/\d+_[0-9A-z]+_)[\w-](\.\w+)/;
      var url_pieces = flickr_regexp.exec(image_url);
      // The "z" refers to an image resolution of 640px on the longest side; see
      // https://www.flickr.com/services/api/misc.urls.html for additional options
      image_url = url_pieces[1] + "z" + url_pieces[2];

      var image_tag = "<img src=\"" + image_url + "\" />"
      var image_container = "<div class=\"photo\">" + image_tag + "</div>"
      $("div#photos").append(image_container);

      // Once all image elements have been added to page
      if (index == (photos.length - 1)) {

        // Initialize Masonry after all images have loaded
        $("div#photos").imagesLoaded(function() {
          $("div#photos").masonry({
            itemSelector: "div.photo",
            gutter: 15
          });
        });
      }
    });
  });
});
