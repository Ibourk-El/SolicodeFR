import { taskURL } from "./constURLs.js";

import {
  closeBtnFun,
  openWorkSection,
  getData,
  sendData,
  user_id,
  class_id,
  checkIfuserLogin,
  setUserName,
  user_img,
  user_name,
  logout
} from "./functions.js";

let tasks = {};

logout()
closeBtnFun();
checkIfuserLogin(user_id, getTask);
setUserName(user_name, user_img);

async function getTask() {
  const res = await getData(
    taskURL,
    `?class_id=${class_id}&creater_id=${user_id}`
  );
  console.log(res);

  res.forEach((el) => {
    const taskNum = "task " + el.id;
    if (taskNum in tasks) {
      tasks[taskNum].student.push({
        student_id: el.student_id,
        status: el.status,
        student_name: el.full_name,
      });
    } else {
      tasks[taskNum] = {
        id: el.id,
        title: el.title,
        task_body: el.task_body,
        imgUrl: el.file_path,
        student: [
          {
            student_id: el.student_id,
            student_name: el.full_name,
            githubLink: el.github_url,
          },
        ],
      };
      document.getElementById("task-container").innerHTML += createTaskBox(
        tasks[taskNum].id,
        tasks[taskNum].title,
        tasks[taskNum].imgUrl
      );
    }
  });

  const resultBtn = document.querySelectorAll(".result");
  const titleTask = document.getElementById("taskTitle-w");

  resultBtn.forEach((el) => {
    // add event to result button
    el.addEventListener("click", () => {
      const taskId = el.getAttribute("data-task");
      titleTask.innerHTML = el.getAttribute("data-taskTitle");
      openWorkSection();
      setDataInTable(taskId);
    });
  });
}

function createTaskBox(id, title, imgUrl) {
  let imgPath = JSON.parse(JSON.parse(imgUrl));
  console.log(imgPath);
  return `
    <div class="task" id="${id}">
      <div class="img-box">
        <img src="${imgPath["img 0"]}" />
      </div>
      <p>${title}</p>
      <div id="btnBoxTask${id}"class="btnBoxTask" >
        <button id="btnGo${id}" data-task="${id}" data-taskTitle="${title}" class="result">Result</button>
      </div>
    </div>`;
}

function setDataInTable(id) {
  const tbody = document.getElementById("tbody");
  document.getElementById("task_id").value = id;
  tbody.innerHTML = "";

  choseTask(id).forEach((el) => {
    const text = `<tr>
    <th>${el.student_name}</th>
    <th class="btn run-btn">Run</th>
    <th><a href="${el.githubLink}">go to github</a></th>
    <th>
      <select name="result" id="studentResult${el.student_id}">
        <option value=""></option>
        <option value="valid">Valid</option>
        <option value="invalid">Invalid</option>
      </select>
    </th>
    <th><input id="studentPoint${el.student_id}" style="width:60px;padding:5px;" type="number" /></th>
    <th class="btn save-btn" data-id="${el.student_id}">Save</th>
  </tr>`;

    tbody.innerHTML += text;
  });
  addEventToRunBtns();
  addEventToSaveBtns();
}

function choseTask(id) {
  for (let task in tasks) {
    if (tasks[task].id == id) return tasks[task].student;
  }
}

function addEventToRunBtns() {
  const runBtns = document.querySelectorAll(".run-btn");
  const taskId = document.getElementById("task_id").value;
  runBtns.forEach((el) => {
    el.addEventListener("click", () => {
      window.open("./../editor.html?task_id=" + taskId);
    });
  });
}

function addEventToSaveBtns() {
  const runBtns = document.querySelectorAll(".save-btn");
  const taskId = document.getElementById("task_id").value;
  runBtns.forEach((el) => {
    el.addEventListener("click", async (e) => {
      const studentId = e.target.getAttribute("data-id");
      const select = document.getElementById(`studentResult${studentId}`).value;
      const point = document.getElementById(`studentPoint${studentId}`).value;
      const obj = {
        student_id: studentId,
        task_id: taskId,
        status: select,
        point: point,
      };
      // console.log(e.target.getAttribute("data-id"));
      await sendData(taskURL, "PUT", obj, "json");
    });
  });
}
