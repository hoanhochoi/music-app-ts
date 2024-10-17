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

// like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click",()=>{
    const id = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active")
    const typeLike = isActive == false ? "like" : "dislike";
    const link = `/songs/like/${typeLike}/${id}`;
    const option = {
        method: "PATCH "
    }
    fetch(link,option) // cần gửi method path truyền 2 tham số còn get thì cần link thôi
        .then(res => res.json())
        .then(data =>{
            if(data.code == 200){
                const span = buttonLike.querySelector("span");
                span.innerHTML = `${data.like} thích`
                buttonLike.classList.toggle("active");
            }
            
        })
    })
}
// end like

// favorite
 const buttonFavorite = document.querySelector("[button-favorite]");
 if(buttonFavorite){
    buttonFavorite.addEventListener("click",()=>{
    console.log(buttonFavorite);

        const id = buttonFavorite.getAttribute("button-favorite");
        const isActive = buttonFavorite.classList.contains("active");
        const typeFavorite = isActive? "unfavorite" : "favorite";
        const link = `/songs/favorite/${typeFavorite}/${id}`;
        const option = {
            method : "PATCH"
        }
        fetch(link,option)
            .then(res => res.json())
            .then(data=>{
                if(data.code == 200){
                    buttonFavorite.classList.toggle("active");
                }
            })
    })
}
// end favorite