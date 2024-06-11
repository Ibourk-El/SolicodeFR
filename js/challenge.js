import { problemURL } from "./constURLs.js";

import {
  closeBtnFun,
  openWorkSection,
  setUserName,
  sendData,
  getData,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  logout,
} from "./functions.js";

// const problemURL = baceURL + "solicode/backend/api/problem.php";
const lang = document.getElementById("lang");
const runBtn = document.getElementById("run-editor-btn");

let code = null;
let pTitle = "";

logout();
checkIfuserLogin(user_id, getALLProblems);
// editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize("16px");
editor.session.setMode("ace/mode/" + lang.value);

lang.addEventListener("change", () => {
  editor.session.setMode("ace/mode/" + lang.value);
  editor.setValue(code[lang.value].fun);
});

// run code
runBtn.addEventListener("click", async () => {
  const problemId = document.getElementById("problemId").value;
  const output = document.getElementById("output");
  const problemStatus = document.getElementById("status" + problemId);
  let result = "";
  let obj = {
    userId: user_id,
    problemId: problemId,
    code: editor.getValue(),
    extantion: lang.value,
    problemTitle: pTitle,
  };
  const res = await sendData(problemURL, "POST", obj, "json");
  for (let el in res.result) {
    result += `<p><span class='${res.result[el].state}'>${el}</span> Result => <span>${res.result[el].result}</span></p>`;
  }
  problemStatus.innerHTML = res.passed;
  output.innerHTML = result;
});

//
closeBtnFun();
setUserName(user_name, user_img);

function setEventToTitle() {
  const problemTitle = document.querySelectorAll(".pro-title");
  problemTitle.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      pTitle = e.target.innerHTML;
      getProblem(e.target.getAttribute("data-pro"));
    });
  });
}

async function getProblem(id) {
  const res = await getData(problemURL, "?id=" + id);
  document.getElementById("problemId").value = res.id;
  document.getElementById("challenge-title").innerHTML = res.title;
  document.getElementById("challenge-body").innerHTML = res.body;
  if (lang.value === "javascript") editor.setValue(res.js_fun);
  else editor.setValue(res.php_fun);
}

async function getALLProblems() {
  const res = await getData(problemURL, "?student_id=" + user_id);
  const tBody = document.getElementById("tbody");
  tBody.innerHTML = "";
  res.forEach((el) => {
    tBody.innerHTML += `
    <tr >
      <th>${el.id}</th>
      <th class="pro-title" data-pro="${el.id}">${el.title}</th>
      <th id="status${el.id}" class="JS">${el.status ? el.status : "?"}</th>
      <th class="solved">${el.difficulty}</th>
    </tr>
    `;
  });
  setEventToTitle();
}
