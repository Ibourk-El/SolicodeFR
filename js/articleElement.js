function articleBody(articleEl, activeMenu) {
  const allImg = JSON.parse(articleEl.file_path);
  // console.log(typeof allImg);
  let imgs = "";

  if (allImg.length === undefined) {
    imgs = `<img src="${allImg["img 0"]}" alt="" />`;
  }
  console.log(allImg.length);
  return `<main class="article-box" id="${articleEl.id}">
    <div class="article-menu ${activeMenu}">
        <i class="menu-icon" id="menu-icon">...</i>
        <ul>
          <li class="edit-article" data-id="${articleEl.id}" >edit</li>
          <li class="delete-article" data-id="${articleEl.id}"  >delete</li>
        <ul>
      </div>
    <div class="img-box">
      ${imgs}
    </div>
    <h4 class="title">${articleEl.title}</h4>
    <footer class="article-footer">
      <span>${articleEl.full_name}</span>
      <span>${articleEl.create_at}</span>
    </footer>
  </main>`;
}

function articleComment(comment) {
  return `<div class="comment">
    <div class="user-box">
      <div class="img-box">
        <img src="${comment.photo}" alt="poster img" />
      </div>
      <span>${comment.full_name}</span>
    </div>
    <p class="comment-content">
      ${comment.body}
    </p>
  </div>`;
}

export { articleBody, articleComment };
