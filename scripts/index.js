import { navbar } from "../components/navbar.js";

let nav_div = document.getElementById('nav');

nav_div.innerHTML = navbar();


let api_key = "AIzaSyBY4F_onzK2Nm0oSEnMzNayFeq9HGhwQLA";

let container = document.getElementById("container");

let getData = document.getElementById('getData')
getData.addEventListener('click', function(){
     getYTData();
})

const getYTData = async () => {
  try {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    under4()
    under4to20()
    under20()
    viewCount()
    viewTitle()
    viewPopularity()
    appendVideos(arr_of_videos);
  } catch (err) {
    console.log(err);
  }
};
const viewCount = async () => {
  let view = document.getElementById('view')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20&order=viewCount`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};

const viewTitle = async () => {
  let view = document.getElementById('title')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20&order=title`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};

const viewPopularity = async () => {
  let view = document.getElementById('popularity')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20&order=rating`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};

const under4 = async () => {
  let view = document.getElementById('video')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&type=video&part=snippet&maxResults=20`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};

const under4to20 = async () => {
  let view = document.getElementById('playlist')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20&type=playlist`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};

const under20 = async () => {
  let view = document.getElementById('channel')
  view.onclick = async () => {
    let query = document.getElementById("query").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${api_key}&part=snippet&maxResults=20&type=channel`
    );

    let data = await res.json();

    let arr_of_videos = data.items;

    appendVideos(arr_of_videos);
  }
};
const appendVideos = (data) => {
  container.innerHTML = null;
  data.forEach((el) => {
    let div = document.createElement("div");

    const name = document.createElement("p");
    name.innerText = el.snippet.title;

    const thumbnail = document.createElement("img");
    thumbnail.src = el.snippet.thumbnails.high.url;

    const channel_name = document.createElement("h5");
    channel_name.innerText = el.snippet.channelTitle;

    let id = el.id.videoId;

    let video_data = {
      videoId: el.id.videoId,
      snippet: el.snippet,
    };

    div.onclick = () => {
      //43 & 44 are same ==> div.addEventListener('click',myFun)
      storeDetails(video_data);
    };

    div.append(thumbnail, name, channel_name);
    container.append(div);
  });
};

function storeDetails(video_data) {
  localStorage.setItem("video-obj", JSON.stringify(video_data));
  window.location.href = "video.html";
}

