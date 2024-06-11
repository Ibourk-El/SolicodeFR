import { communityURL, commentURL } from "./constURLs.js";

import {
  closeBtnFun,
  openWorkSection,
  closeWorkSection,
  setUserName,
  getData,
  sendData,
  formData,
  textEditor,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  logout,
  checkIftextEditorIsEmpty,
  notification,
} from "./functions.js";
import { post, setAllComment } from "./postElement.js";

const sendPostBtn = document.getElementById("send-btn");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const txtEditor = textEditor("editor");

//
closeBtnFun();
setUserName(user_name, user_img);
checkIfuserLogin(user_id, getAllPosts);
logout();

//

async function getAllPosts() {
  const res = await getData(communityURL, "");
  console.log(res);
  setPosts(res.data, "");
}

function setPosts(data, activeMenu) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";
  data.forEach((el) => {
    let color = "";
    let likes = JSON.parse(el.likes);
    likes.students_IDs.forEach((el) => {
      if (el == user_id) color = "add-like";
    });

    postsContainer.innerHTML += post(
      el.id,
      el.photo,
      el.full_name,
      el.post_body,
      el.file_path,
      el.create_at,
      { num: likes.likes, color: color },
      activeMenu
    );
  });

  addClickTOcommentBtn();

  addLikeEvent();

  iconMenuEvent();
}

//

addBtn.addEventListener("click", openWorkSection);

sendPostBtn.addEventListener("click", async () => {
  const body = txtEditor.getSemanticHTML();
  const file = document.getElementById("file").files;

  const bodyEmpty = checkIftextEditorIsEmpty(body);

  if (bodyEmpty) {
    if (sendPostBtn.innerHTML === "Send") {
      // to create the post
      const obj = {
        post_body: body,
        creater_id: user_id,
        likes: {
          likes: 0,
          students_IDs: [],
        },
      };
      const res = await sendData(communityURL, "POST", formData(file, obj), "");
      console.log(res);
      if ((res.res = "valid")) {
        notification(res.msg, "var(--alert-b-g)", "var(--alert-text-g)");
      }
    } else {
      // to update the post
      const obj = {
        id: document.getElementById("post_id_input").value,
        post_body: body.value,
        file_path: file.value,
      };
      const res = await sendData(communityURL, "PUT", obj, "json");
      console.log(res);
      notification(res.msg, "var(--alert-b-g)", "var(--alert-text-g)");
    }
    sendPostBtn.innerHTML = "Send";

    closeWorkSection();
  } else {
    console.log("same field is empty");
  }
});

filterBtn.addEventListener("click", async () => {
  const res = await getData(communityURL, "?creater_id=" + user_id);
  setPosts(res.data, "active");
});

// get all comment
async function getComments(id, con) {
  const res = await getData(
    commentURL,
    "?catigory_id=" + id + "&catigory=post"
  );
  // add comment to the post
  console.log(res);
  setAllComment(res.data, con);
}

function sendComment(parent) {
  const sendCommentBtn = parent.querySelector("#send-comment");
  sendCommentBtn.addEventListener("click", async () => {
    const body = parent.querySelector("#comment-body").value;
    if (body !== "") {
      const obj = {
        creater_id: user_id,
        body: body,
        catigory: "post",
        catigory_id: parent.id,
      };
      // add comment before send it to backend
      setAllComment(
        [{ creater_name: user_name, body: body, photo: user_img }],
        parent.children[1].querySelector("#all-comment-box")
      );
      // send req
      const res = await sendData(commentURL, "POST", obj, "json");
      parent.querySelector("#comment-body").value = "";
    } else {
      console.log("the comment is empty");
    }
  });
}

function addClickTOcommentBtn() {
  const commentBtn = document.querySelectorAll(".comment-btn");
  commentBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement.parentElement;

      sendComment(parent);
      parent.children[1].classList.toggle("open");
      getComments(
        parent.id,
        parent.children[1].querySelector("#all-comment-box")
      );
    });
  });
}

function addLikeEvent() {
  const likeBtn = document.querySelectorAll(".likes");
  likeBtn.forEach((el) => {
    el.addEventListener("click", async (e) => {
      const parent = e.target.parentElement.parentElement.parentElement;
      // change style and add number of likes
      const numOflikes = +e.target.children[0].innerHTML;
      e.target.classList.add("add-like");
      const res = await updatePostLikes(parent.id, numOflikes);
      if (res.msg !== "already")
        e.target.children[0].innerHTML = numOflikes + 1;
    });
  });
}

async function updatePostLikes(pId, pLikes) {
  let obj = {
    id: pId,
    user_id: user_id,
    likes: ++pLikes,
  };
  return await sendData(communityURL, "PATCH", obj, "json");
}

function iconMenuEvent() {
  const iconMenuBtn = document.querySelectorAll(".menu-icon");
  iconMenuBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.children[1].classList.toggle("active");
      editPostEvent(parent);
      deletePostEvent(parent);
    });
  });
}

function editPostEvent(parent) {
  let editBtn = parent.querySelector(".edit-post");
  editBtn.addEventListener("click", async (e) => {
    const postId = parent.parentElement.parentElement.parentElement.id;
    openWorkSection();
    const res = await getData(communityURL, "?id=" + postId + "&key=id");
    sendPostBtn.innerHTML = "Edit";
    setDataInEditBox(res.data[0]);
    parent.children[1].classList.toggle("active");
  });
}

function deletePostEvent(parent) {
  let deleteBtn = parent.querySelector(".delete-post");
  deleteBtn.addEventListener("click", async () => {
    console.log(parent.parentElement.parentElement.parentElement.id);
    const postId = parent.parentElement.parentElement.parentElement.id;
    const res = await sendData(communityURL, "DELETE", { id: postId }, "json");
    console.log(res);
    parent.children[1].classList.toggle("active");
    notification(res.msg, "var(--alert-b-r)", "var(--alert-text-r)");
  });
}

function setDataInEditBox(data) {
  const postId = document.getElementById("post_id_input");
  txtEditor.clipboard.dangerouslyPasteHTML(data.post_body);
  postId.value = data.id;
}
