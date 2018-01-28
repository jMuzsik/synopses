//in HTML:
/*
<script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script>
*/

google.books.load();

function initialize() {
  var viewer = new google.books.DefaultViewer(
    document.getElementById("viewerCanvas")
  );
  viewer.load("ISBN:0738531367");
}
//or viewer.load('ISBN:0738531367', null, alertInitialized);
//second callback is for an error, third is when it loads

google.books.setOnLoadCallback(initialize);
