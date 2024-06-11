import { taskURL } from "./constURLs.js";

import {
  closeBtnFun,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  class_id,
  logout,
  notification,
} from "./functions.js";

const courses = document.querySelectorAll(".course-catigory");
const closeGitBtn = document.getElementById("close-git");
const sendGitUrl = document.getElementById("send-url-btn");
let lastClick = "";
let task_id = null;

// fun
logout();
closeBtnFun();
setUserName(user_name, user_img);
closeBtnFun();
checkIfuserLogin(user_id, getUserTaskes);

closeGitBtn.addEventListener("click", () => {
  const box = document.getElementById("github-box");
  box.classList.remove("open");
});

sendGitUrl.addEventListener("click", async () => {
  const gitUrl = document.getElementById("github-url");
  const req = await sendData(
    taskURL,
    "PATCH",
    { github_url: gitUrl.value, student_id: user_id, task_id: task_id },
    "json"
  );
  console.log(req);
});

courses.forEach((el) => {
  el.addEventListener("click", () => {
    courses.forEach((el) => {
      el.classList.remove("active");
    });

    if (el !== lastClick) {
      lastClick = el;
      filter(el.innerHTML);
    }
    el.classList.add("active");
  });
});

function btnsEvent() {
  const showBtn = document.querySelectorAll(".task-btn");
  showBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      task_id = e.target.parentElement.parentElement.id;
      getTaskDetailes(task_id);
    });
  });

  const goBtn = document.querySelectorAll(".task-go");
  goBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      task_id = e.target.parentElement.parentElement.id;
      window.open("./../editor.html?task_id=" + task_id);
    });
  });

  const githubBtn = document.querySelectorAll(".githubBtn");
  githubBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      task_id = e.target.parentElement.parentElement.id;
      const box = document.getElementById("github-box");

      box.classList.add("open");
    });
  });
}

async function getTaskDetailes(task_id) {
  const res = await getData(taskURL, "?id=" + task_id);
  console.log(res);
  setTaskDetailes(res[0]);
}

async function filter(filter) {
  const breifContainer = document.getElementById("breifs-container");
  const res = await getData(
    taskURL,
    "?student_id=" +
      user_id +
      "&class_id=" +
      class_id +
      "&brief_catigory=" +
      filter
  );
  breifContainer.innerHTML = "";

  res.forEach((e) => {
    breifContainer.innerHTML += createTaskBox(e.id, e.title, e.file_path);
  });

  if (res.length === 0) {
    notification("Empty", "var(--alert-b-g)", "var(--alert-text-g)");
  }
  btnsEvent();
}

// // get user task
async function getUserTaskes() {
  const breifContainer = document.getElementById("breifs-container");
  const res = await getData(
    taskURL,
    "?student_id=" + user_id + "&class_id=" + class_id + "&brief_catigory=ALL"
  );
  breifContainer.innerHTML = "";
  res.forEach((e) => {
    breifContainer.innerHTML += createTaskBox(e.id, e.title, e.file_path);
  });
  if (res.length === 0) {
    notification("Empty", "var(--alert-b-g)", "var(--alert-text-g)");
  }
  btnsEvent();
}

function createTaskBox(id, title, imgUrl) {
  const images = JSON.parse(JSON.parse(imgUrl));
  console.log(images, images["img 0"]);
  return `
    <div class="task" id="${id}">
      <div class="img-box">
        <img src="${images["img 0"]}" />
      </div>
      <p>${title}</p>
      <div id="btnBoxTask${id}"class="btnBoxTask" >
        <button class="task-btn">Show Detailes</button>
        <button id="btnGo${id}" class="task-go">Go To code</button>
        <button id="githubBtn${id}" class="githubBtn">Github URL</button>
      </div>
    </div>`;
}

function setTaskDetailes(data) {
  document.getElementById("task-title").innerHTML = data.title;
  document.getElementById("task-text").innerHTML = data.task_body;
  const imgs = JSON.parse(JSON.parse(data.file_path));

  const mainImg = document.getElementById("main-img");
  const allImgBox = document.getElementById("all-img");

  allImgBox.innerHTML = "";
  console.log(imgs);
  for (let img in imgs) {
    if (img === "img 0") {
      mainImg.src = imgs["img 0"];
    } else {
      allImgBox.innerHTML += `<img class="img-s" src="${imgs[img]}" />`;
    }
  }

  const imgsBox = document.querySelectorAll(".img-s");
  imgsBox.forEach((el) => {
    el.addEventListener("click", () => {
      let src = mainImg.src;
      mainImg.src = el.src;
      el.src = src;
    });
  });
}
