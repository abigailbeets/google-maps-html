function getGoogleMapsAPI() {
  let url = 'https://maps.googleapis.com/maps/api/js?'
  let MY_KEY = 'AIzaSyCR0ckE2CRoe_NxDcm-efZWlEWq1lfJ0zU&v'
  let callback = 'initMap'
  $.ajax({
    type: 'GET',
    async: true,
    url: url,
    headers: {
      'key': MY_KEY
    },
    success: function (result) {
      callback
    },
    error: function (error) {
      console.error()
    }
  })
}
