const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");

function post(id, crPImgUrl, crPName, pBody, pImg, date, like, activeMenu) {
  let imgs = "";
  console.log(pImg);
  let allImg = JSON.parse(pImg);
  console.log(allImg);
  for (let ims in allImg) {
    imgs += `<img src="${allImg[ims]}" alt="post imag"/>`;
  }

  return `<main class="post" id=${id}>
  <div class="post-container">
    <header class="post-header">
      <div class="poster-box">
        <div class="img-box">
          <img src="${crPImgUrl}" alt="poster img" />
        </div>
        <h3>${crPName}</h3>
      </div>
      <div class="post-menu ${activeMenu}">
        <i class="menu-icon" id="menu-icon">...</i>
        <ul>
          <li class="edit-post" >edit</li>
          <li class="delete-post" >delete</li>
        <ul>
      </div>
    </header>
    <div class="post-imgs">
    ${imgs}
    </div>
    <div class="post-content">${pBody}</div>
    <ul class="post-footer">
      <li class="post-info likes ${like.color}">Like <span class="like-num">${like.num}</span></li>
      <li class="post-info comment-btn">Comments </li>
      <li class="post-info date">date: ${date}</li>
    </ul>
  </div>
  <div class="commentes" id="commentes">
    <div class="comment add-comment">
      <div class="user-box">
        <div class="img-box">
          <img src="${user_img}" alt="poster img" />
        </div>
        <span>${user_name}</span>
      </div>
      <textarea name="comment-body" id="comment-body"></textarea>
      <button id="send-comment">Send</button>
    </div>
    <div id="all-comment-box"></div>
  </div>
</main>`;
}

function setAllComment(comments, commentC) {
  comments.forEach((el) => {
    commentC.innerHTML =
      `<div class="comment">
    <div class="user-box">
      <div class="img-box">
        <img src="${el.photo}" alt="poster img" />
      </div>
      <span>${el.creater_name}</span>
    </div>
    <p class="comment-content">${el.body}</p>
  </div>` + commentC.innerHTML;
  });
}

export { post, setAllComment };
