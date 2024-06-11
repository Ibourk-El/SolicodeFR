import {
  sendData,
  checkIfuserLogin,
  setUserName,
  getData,
  user_id,
  user_img,
  user_name,
  logout,
  notification,
} from "./functions.js";
import { createAutho, getCatigory } from "./constURLs.js";

checkIfuserLogin(user_id, () => {});
setUserName(user_name, user_img);
logout();

const addItem = document.getElementById("add-item");
const formActive = document.getElementById("add-btn");
const itemsBox = document.getElementById("items-box");
const inputItem = document.getElementById(`input-item`);
const sendBtn = document.getElementById(`send-btn`);
const catigoriy = document.getElementById("courses-title");

let index = 0;
let catigoryId = null;

addItem.addEventListener("click", () => {
  if (inputItem.value !== "") {
    itemsBox.innerHTML += `<li class="item-box" id="box-${index}"><span class="title" >${inputItem.value}</span><button id="remove-box-${index}" data-boxId="box-0">X</button></li>`;
    inputItem.value = "";
    // inputItem.setAttribute("")
    const removeBtn = document.getElementById(`remove-box-${index}`);
    removeBtn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
    index++;
  } else {
    console.log("the last input is empty");
  }
});
const authoCatigory = document.getElementById("catigory");

authoCatigory.addEventListener("change", (e) => {
  const catigoryItems = document.querySelectorAll(".course-catigory");

  catigoryItems.forEach((el) => {
    if (el.innerHTML === e.target.value) {
      notification(
        "you have allready this " + e.target.value + " formation",
        "var(--alert-b-g)",
        "var(--alert-text-g)"
      );
    }
  });
});

sendBtn.addEventListener("click", async () => {
  const url = document.getElementById("url-inp");
  let objData = [];

  if (
    authoCatigory.value !== "" &&
    url.value !== "" &&
    authoCatigory.length > 0
  ) {
    const allAuthoParts = document.querySelectorAll(".title");
    allAuthoParts.forEach((el) => {
      objData.push(el.innerHTML);
    });
    const obj = {
      creater: user_id,
      class_id: sessionStorage.getItem("class_id"),
      url: url.value,
      authoCatigory: authoCatigory.value,
      data: objData,
      elements_num: objData.length,
    };

    const res = await sendData(createAutho, "POST", obj, "json");

    console.log(res);
    if (res.msg === "valid") {
      notification(res.msg, "var(--alert-b-g)", "var(--alert-text-g)");
      itemsBox.innerHTML = "Titles Of The Authoformation <br>";
    }
  }
});

getCatigories();

async function getCatigories() {
  const res = await getData(getCatigory, "?creater_id=" + user_id);
  catigoriy.innerHTML = "";
  res.forEach((el) => {
    catigoriy.innerHTML += `<li class="course-catigory" id="${el.id}">${el.autho_name}</li>`;
  });

  // add event to li
  const courses = document.querySelectorAll(".course-catigory");
  courses.forEach((el) => {
    el.addEventListener("click", () => {
      courses.forEach((el) => {
        el.classList.remove("active");
      });
      el.classList.add("active");
      catigoryId = el.id;
      getFormationDitailes(el.id);
      document.getElementById("form").classList.remove("open");
    });
  });
}

async function getFormationDitailes(formationId) {
  const res = await getData(
    getCatigory,
    "?autho_id=" + formationId + "&creater_id=" + user_id + "&case=filter"
  );
  const formation = document.getElementById("formation");

  formation.innerHTML = "";
  res.forEach((el) => {
    formation.innerHTML += `<li class="formation-title">
                <span class="title" id="${el.id}">${el.part_title}</span
                ><button class="edit-btn" data-id="${el.id}">Edit</button>
                <button class="delete-btn" data-id="${el.id}">Delete</button>
              </li>`;
  });

  editElement();
  deleteElement();
}

function editElement() {
  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((el) => {
    el.addEventListener("click", async () => {
      const itemId = el.getAttribute("data-id");
      const titleBox = document.getElementById(`${itemId}`);

      console.log(titleBox);
      if (el.innerHTML === "Edit") {
        titleBox.setAttribute("contenteditable", "true");
        titleBox.focus();
        el.innerHTML = "Save";
      } else {
        titleBox.setAttribute("contenteditable", "false");
        el.innerHTML = "Edit";
        const res = await sendData(
          getCatigory,
          "PATCH",
          {
            id: itemId,
            autho_id: catigoryId,
            part_title: titleBox.innerHTML,
          },
          "json"
        );
        console.log(res);
      }
    });
  });
}

function deleteElement() {
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((el) => {
    el.addEventListener("click", async () => {
      const itemId = el.getAttribute("data-id");

      const res = await sendData(
        getCatigory,
        "DELETE",
        {
          id: itemId,
          autho_id: catigoryId,
        },
        "json"
      );
      console.log(res);
      el.parentElement.remove();
    });
  });
}

formActive.addEventListener("click", () => {
  document.getElementById("form").classList.add("open");
  document.getElementById("formation").innerHTML = "";
});
