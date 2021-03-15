var key = "AIzaSyCtf4zywhqL6rivOv-agoo-HTQlQzf8GpE";

var videoList = document.querySelector(".video-list");
var search = document.querySelector(".search input");
var searchButton = document.querySelector(".search button");
var videoPreview = document.querySelector("iframe");

var videoRelatedID;
var container;

function getData() {
  var url =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=" +
    search.value +
    "&key=" +
    key;

  var req = new XMLHttpRequest();

  search.value = "";

  req.open("GET", url);

  req.onload = function () {
    listVideos(JSON.parse(req.responseText));
  };

  req.send();
}

function getDataRelated(id) {
  var url =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&relatedToVideoId=" +
    id +
    "&key=" +
    key;

  var req = new XMLHttpRequest();

  req.open("GET", url);

  req.onload = function () {
    listVideos(JSON.parse(req.responseText));
  };

  req.send();
}

function listVideos(data) {
  videoList.innerHTML = "";
  data.items.forEach((element) => {
    createVideo(element);
  });
}

function createVideo(video) {
  container = document.createElement("div");
  var textWrapper = document.createElement("div");

  if (video.snippet) {
    var image = document.createElement("img");
    image.setAttribute("src", video.snippet.thumbnails.default.url);
    container.appendChild(image);

    textWrapper.appendChild(createElemet(video, "h3", "title"));
    textWrapper.appendChild(createElemet(video, "p", "description"));

    container.appendChild(textWrapper);
    container.addEventListener("click", function () {
      videoPreview.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + video.id.videoId
      );
      videoRelatedID = video.id.videoId;

      videoPreview.classList.add("visible");
    });

    container.addEventListener("click", function () {
      getDataRelated(videoRelatedID);
    });

    videoList.appendChild(container);
  }
}

function createElemet(video, type, property) {
  var element = document.createElement(type);

  element.textContent = video.snippet[property];

  return element;
}

searchButton.addEventListener("click", getData);
