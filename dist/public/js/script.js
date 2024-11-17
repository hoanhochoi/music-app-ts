// aplayer
const aplayer = document.querySelector("#aplayer")
if (aplayer) {
    let singer = aplayer.getAttribute("data-singer")
    singer = JSON.parse(singer); // chuyển từ json sang js
    let song = aplayer.getAttribute("data-song");
    song = JSON.parse(song);
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        lrcType: 1,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
            lrc: song.lyrics

        }],
        autoplay: true,
    });
    const Avatar = document.querySelector(".singer-detail .inner-avatar")
    // Avatar.style.animationPlayState = "paused"

    ap.on('play', function () {
        Avatar.style.animationPlayState = "running"
        console.log("oke")
    });
    ap.on('pause', function () {
        Avatar.style.animationPlayState = "paused"
    });
    // console.log(song)
    ap.on("ended", function () {
        console.log("kết thúc bài hát")
        const link = `/songs/listen/${song._id}`
        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const newListen = document.querySelector(".singer-detail .inner-listen span");
                newListen.innerHTML = `${data.listen} lượt nghe`
            })
    })
}
// end aplayer

// like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const id = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active")
        const typeLike = isActive == false ? "like" : "dislike";
        const link = `/songs/like/${typeLike}/${id}`;
        const option = {
            method: "PATCH" // lưu ý không được thêm khoảng cách ở đây
        }
        fetch(link, option) // cần gửi method path truyền 2 tham số còn get thì cần link thôi
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} thích`
                    buttonLike.classList.toggle("active");
                }

            })
    })
}
// end like

// favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
    listButtonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            console.log(buttonFavorite);

            const id = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");
            const typeFavorite = isActive ? "unfavorite" : "favorite";
            const link = `/songs/favorite/${typeFavorite}/${id}`;
            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        buttonFavorite.classList.toggle("active");
                    }
                })
        })
    });

}
// end favorite

// box suggest search 
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest")
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        const link = `/search/suggest?keyword=${keyword}`
        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs;
                if (songs.length > 0) {
                    boxSuggest.classList.add("show")
                    const list = boxSuggest.querySelector(".inner-list")
                    const html = songs.map(song => {
                        return `
               <a class="inner-item" href="/songs/detail/${song.slug}">
                    <div class="inner-image"><img src="${song.avatar}" /></div>
                    <div class="inner-info">
                        <div class="inner-title">${song.title}</div>
                        <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                    </div>
                </a>

               
                `
                    })
                    list.innerHTML = html.join("")
                } else {
                    boxSuggest.classList.remove("show")
                }
            })
    })
}

// end box suggest search