import { articleURL, commentURL } from "./constURLs.js";

import {
  closeBtnFun,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  closeWorkSection,
  formData,
  textEditor,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  logout,
  notification,
  imgClickForSizing,
  checkIftextEditorIsEmpty,
} from "./functions.js";

import { articleBody, articleComment } from "./articleElement.js";

const addBtn = document.getElementById("add-btn");
const sendArticleBtn = document.getElementById("send");
const filterBtn = document.getElementById("filter-btn");
const sendCommentBtn = document.getElementById("send-comment");
const txtEditor = textEditor("editor");

// fun

logout();
closeBtnFun();
setUserName(user_name, user_img);
setImgUserNameInCom(user_img, user_name);
checkIfuserLogin(user_id, getAllArticles);

//

addBtn.addEventListener("click", () => {
  openWorkSection();
  const articleContiner = document.getElementById("article-container");
  articleContiner.style.display = "none";
  const articleForm = document.getElementById("article-form");
  articleForm.style.display = "flex";
});

sendArticleBtn.addEventListener("click", async () => {
  const title = document.getElementById("title");
  const tags = document.getElementById("tags");
  const body = txtEditor.getSemanticHTML();
  const file = document.getElementById("file").files;

  let hasText = checkIftextEditorIsEmpty(body);

  if (title.value !== "" && hasText) {
    console.log(hasText);
    const obj = {
      title: title.value,
      body: body,
      creater_id: user_id,
      tags: tags.value,
    };
    if (sendArticleBtn.innerHTML === "Send") {
      // for send new article
      const res = await sendData(articleURL, "POST", formData(file, obj), "");
      notification(res.msg, "var(--alert-b-g)", "var(--alert-text-g)");
      title.value = "";
    } else {
      // for update article
      sendArticleBtn.innerHTML = "Send";
      const res = await sendData(articleURL, "PUT", formData(file, obj), "");
      notification(res.msg, "var(--alert-b-g)", "var(--alert-text-g)");
      title.value = "";
    }
    closeWorkSection();
  } else {
    // console.log("same field is empty");
    notification(
      "same field is empty",
      "var(--alert-b-r)",
      "var(--alert-text-r)"
    );
  }
});

filterBtn.addEventListener("click", async () => {
  const res = await getData(articleURL, "?creater_id=" + user_id);
  addArticlesToTheBox(res["data"], "active");
  iconMenuEvent();
});

async function getAllArticles() {
  const res = await getData(articleURL, "");
  addArticlesToTheBox(res["data"], "");
}

// send comment
sendCommentBtn.addEventListener("click", async () => {
  const body = document.getElementById("comment-body");
  const comments = document.getElementById("comments");
  if (body.value !== "") {
    const obj = {
      creater_id: user_id,
      body: body.value,
      catigory: "article",
      catigory_id: sendCommentBtn.getAttribute("data-id"),
    };
    body.value = "";
    const res = await sendData(commentURL, "POST", obj, "json");
    comments.innerHTML =
      articleComment({ ...obj, photo: user_img, creater_name: user_name }) +
      comments.innerHTML;
  } else {
    console.log("the comment is empty");
  }
});

function addArticlesToTheBox(res, activeMenu) {
  const con = document.getElementById("articles-container");
  con.innerHTML = "";
  res.forEach((el) => {
    con.innerHTML += articleBody(el, activeMenu);
  });
  if (activeMenu !== "active") setClickEventToArticleBox();
}

function setClickEventToArticleBox() {
  const articleBox = document.querySelectorAll(".article-box");
  articleBox.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      const articleContianer = document.getElementById("article-container");
      articleContianer.style.display = "block";
      const articleForm = document.getElementById("article-form");
      articleForm.style.display = "none";
      setArticle(e.target.id);
      setComments(e.target.id);
    });
  });

  async function setComments(id) {
    const res = await getData(
      commentURL,
      `?catigory=article&catigory_id=${id}`
    );
    const comments = document.getElementById("comments");
    comments.innerHTML = "";
    res.data.forEach((el) => {
      comments.innerHTML = articleComment(el) + comments.innerHTML;
    });
  }
}

async function setArticle(id) {
  const res = await getData(articleURL, `?id=${id}`);
  console.log(res);
  const aBody = document.getElementById("article-text");
  const aTitle = document.getElementById("article-title");
  const imgBox = document.getElementById("article-img");
  sendCommentBtn.setAttribute("data-id", id);
  aBody.innerHTML = res.data[0].body;
  aTitle.innerHTML = res.data[0].title;

  const allImg = JSON.parse(res.data[0].file_path);

  if (allImg.length === undefined) {
    imgBox.src = allImg["img 0"];
  }

  imgClickForSizing();
}

function setImgUserNameInCom(imgSRC, name) {
  document.getElementById("user_img_com").src = imgSRC;
  document.getElementById("user_name_com").innerHTML = name;
}

function iconMenuEvent() {
  const iconMenuBtn = document.querySelectorAll(".menu-icon");
  iconMenuBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.children[1].classList.toggle("active");
      editArticleEvent();
      deleteArticleEvent();
    });
  });
}

function editArticleEvent() {
  const editBtn = document.querySelector(".edit-article");
  editBtn.addEventListener("click", async (e) => {
    const articleId = e.target.getAttribute("data-id");
    const res = await getData(articleURL, "?id=" + articleId);
    sendArticleBtn.innerHTML = "Save Editing";
    setDataInEditBox(res.data[0]);
    e.target.parentElement.parentElement.classList.toggle("active");
    console.log(res);

    // for open article form
    openWorkSection();
    const articleContiner = document.getElementById("article-container");
    articleContiner.style.display = "none";
    const articleForm = document.getElementById("article-form");
    articleForm.style.display = "flex";
  });
}

function deleteArticleEvent() {
  let deleteBtn = parent.querySelector(".delete-article");
  deleteBtn.addEventListener("click", async (e) => {
    const articleId = e.target.getAttribute("data-id");
    const res = await sendData(articleURL, "DELETE", { id: articleId }, "json");
    console.log(res);
    e.target.parentElement.parentElement.classList.toggle("active");
    notification(res.msg, "var(--alert-b-r)", "var(--alert-text-r)");
  });
}

function setDataInEditBox(data) {
  document.getElementById("title").value = data.title;
  document.getElementById("tags").value = data.tags;
  txtEditor.clipboard.dangerouslyPasteHTML(data.body);
  const article = document.getElementById("article_id_input");
  article.value = data.id;
}
