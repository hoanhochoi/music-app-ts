// aplayer
const aplayer = document.querySelector("#aplayer")
if(aplayer){
    let singer = aplayer.getAttribute("data-singer")
    singer = JSON.parse(singer); // chuyển từ json sang js
    let song = aplayer.getAttribute("data-song");
    song = JSON.parse(song);
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
        }],
        autoplay: true,
    });
    const Avatar = document.querySelector(".singer-detail .inner-avatar")
    // Avatar.style.animationPlayState = "paused"

    ap.on('play', function () {
        Avatar.style.animationPlayState = "running"
    });
    ap.on('pause', function () {
        Avatar.style.animationPlayState = "paused"
    });
}
// end aplayer

console.log("oke")
