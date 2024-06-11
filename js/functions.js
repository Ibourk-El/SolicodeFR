const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");
const class_id = sessionStorage.getItem("class_id");

function logout() {
  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear();
    location.href = "./../index.html";
  });
}

function setUserName(userName, imgURL) {
  document.getElementById("user-name").innerHTML = userName;
  document.getElementById("user-img").src = imgURL;
}

function closeBtnFun() {
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", () => {
    closeWorkSection();
  });
}

function openWorkSection() {
  const work = document.getElementById("work");
  work.classList.add("open");
}

function closeWorkSection() {
  const work = document.getElementById("work");
  work.classList.remove("open");
}

async function getData(url, query) {
  const token = sessionStorage.getItem("_tk");
  const req = await fetch(url + query, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      "x-access-token": token,
      ID: user_id,
    },
  });
  if (req.status == 401) {
    error(401);
    return;
  }
  return await req.json();
}

async function sendData(url, method, data, format) {
  let req;

  const token = sessionStorage.getItem("_tk");

  if (format === "json") {
    req = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "Application/json",
        "x-access-token": token,
        ID: user_id,
      },
      body: JSON.stringify(data),
    });
  } else {
    req = await fetch(url, {
      method: method,
      headers: {
        "x-access-token": token,
        ID: user_id,
      },
      body: data,
    });
  }

  if (req.status == 401) {
    error(401);
    return;
  } else if (req.ok) return await req.json();
  else return "connect faild";
}

function formData(files, data) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("file[]", files[i]);
  }

  formData.append("data", JSON.stringify(data));

  return formData;
}

function textEditor(id) {
  const quill = new Quill(`#${id}`, {
    theme: "snow",
  });
  return quill;
}

function resetImagePath(imgUrl) {
  return imgUrl.replaceAll("\\", "/");
}

function checkIfuserLogin(user_id, fun) {
  if (user_id !== null) fun();
  else location.href = "./../";
}

function error(er) {
  location.href = "./../error.html?er=" + er;
}

function notification(msg, notiColor, textColor) {
  const msgBox = document.getElementById("msg");
  const noti = document.getElementById("notification");
  msgBox.style.color = textColor;
  noti.style.backgroundColor = notiColor;
  msgBox.innerHTML = msg;
  setTimeout(() => {
    noti.classList.add("active");
    setTimeout(() => {
      noti.classList.remove("active");
    }, 2000);
  }, 0);
}

function imgClickForSizing() {
  const img = document.querySelectorAll("img");
  img.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
    });
  });
}

function checkIftextEditorIsEmpty(body) {
  const regex = /(<([^>]+)>)/gi;
  return !!body.replace(regex, "").length;
}

export {
  closeBtnFun,
  closeWorkSection,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  formData,
  textEditor,
  resetImagePath,
  checkIfuserLogin,
  logout,
  notification,
  imgClickForSizing,
  checkIftextEditorIsEmpty,
  user_id,
  user_img,
  user_name,
  class_id,
};
