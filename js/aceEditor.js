import { taskURL, userTaskURL } from "./constURLs.js";

import { sendData, getData, user_id } from "./functions.js";

const taskId = window.location.search.split("=")[1];

const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize("16px");
editor.session.setMode("ace/mode/html");

editor.setValue(`
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  </body>  
</html>`);
getTaskCode();

const iframe = document.getElementById("iframe").contentWindow.document;

document.getElementById("run-btn").addEventListener("click", () => {
  iframe.open();
  iframe.write(editor.getValue());
  iframe.close();
});

document.getElementById("save-btn").addEventListener("click", async () => {
  const obj = { student_id: user_id, task_id: taskId, code: editor.getValue() };
  const res = await sendData(taskURL, "PATCH", obj, "json");
  console.log(res);
});

async function getTaskCode() {
  const res = await getData(
    userTaskURL,
    `?student_id=${user_id}&task_id=${taskId}`
  );
  if (res.code != "") editor.setValue(res.code);
}
