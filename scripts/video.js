import { navbar } from "../components/navbar.js";

let nav_div = document.getElementById('nav');

nav_div.innerHTML = navbar();

const video_details = document.getElementById('video_details');

var body = document.getElementsByTagName("body")[0];

body.addEventListener("load", playVideo(), false);

function playVideo() {
    let data = JSON.parse(localStorage.getItem('video-obj'))

    let iframe = document.createElement('iframe')

    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1`

    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = 'fullscreen'

    video_details.append(iframe);
}
