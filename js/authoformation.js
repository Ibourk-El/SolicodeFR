import { createAutho, getCatigory } from "./constURLs.js";

import {
  setUserName,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  getData,
  sendData,
  logout,
} from "./functions.js";

// const courses = document.querySelectorAll(".course-catigory");
const catigoriy = document.getElementById("courses-title");
const class_id = sessionStorage.getItem("class_id");
const tbody = document.getElementById("tbody");

logout();
setUserName(user_name, user_img);
checkIfuserLogin(user_id, getCatigories);

async function setDataInTable(auto_id, user_id, class_id) {
  const res = await getData(
    createAutho,
    "?autho_id=" + auto_id + "&student_id=" + user_id + "&class_id=" + class_id
  );

  tbody.innerHTML = "";
  const urlLink = document.getElementById("urlLink");
  urlLink.href = res[0].autho_url;
  urlLink.innerHTML = res[0].autho_url;
  res.forEach((el) => {
    tbody.innerHTML += tableElement(
      el.id,
      el.part_title,
      el.autho_status,
      el.start_at,
      el.end_at
    );
  });

  addEventToSelect();
}

// catigories
async function getCatigories() {
  const res = await getData(getCatigory, "?class_id=" + class_id);
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
      console.log("hello");
      setDataInTable(el.id, user_id, class_id);
    });
  });
}

function tableElement(id, title, status, start_at, end_at) {
  let select = "";
  if (status === "none") {
    select = `<select class="select" name="status" value="none" id="${id}">
    <option value="none">None</option>
    <option value="start">Start</option>
    <option value="end">End</option>
    </select>`;
  }
  if (status === "start") {
    select = `<select class="select" name="status" value="start" id="${id}">
    <option value="start">Start</option>
    <option value="none">None</option>
    <option value="end">End</option>
    </select>`;
  }
  if (status === "end") {
    select = `<select class="select" name="status" value="end" id="${id}">
    <option value="end">End</option>
    <option value="none">None</option>
    <option value="start">Start</option>
    </select>`;
  }
  return `<tr class="${status}">
  <th>${title}</th>
  <th>${select}</th>
  <th id="start_${id}">${start_at}</th>
  <th id="end_${id}">${end_at}</th>
  </tr>`;
}

function addEventToSelect() {
  const select = document.querySelectorAll(".select");

  select.forEach((el) => {
    el.addEventListener("change", async () => {
      let timeBox = document.getElementById(el.value + "_" + el.id);
      console.log(el.value + "_" + el.id, timeBox);
      let k = el.value + "_at";
      let time = getDate();
      timeBox.innerHTML = time;
      // select.parentElement.parentElement.classList.add(el.value);
      if (el.value === "end") {
        timeBox.parentElement.classList.add("end");
        timeBox.parentElement.classList.remove("start");
      } else if (el.value === "start") {
        timeBox.parentElement.classList.add("start");
        timeBox.parentElement.classList.remove("end");
      }

      const res = await sendData(
        createAutho,
        "PUT",
        { part_id: el.id, k: k, v: time, status: el.value },
        "json"
      );

      console.log(res);
    });
  });
}

function getDate() {
  let time = new Date();
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();

  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (s < 10) {
    s = "0" + s;
  }

  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}
