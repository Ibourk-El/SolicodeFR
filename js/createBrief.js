import { taskURL } from "./constURLs.js";

import {
  sendData,
  formData,
  setUserName,
  user_name,
  user_id,
  user_img,
  textEditor,
  checkIfuserLogin,
  logout,
  notification,
} from "./functions.js";

const sendBtn = document.getElementById("send-btn");

const txtEditor = textEditor("editor");

logout();
checkIfuserLogin(user_id, () => {});
setUserName(user_name, user_img);

sendBtn.addEventListener("click", async () => {
  const msg = document.getElementById("msg");
  // const task_body = document.getElementById("task_body");
  const body = txtEditor.getSemanticHTML();
  const class_id = document.getElementById("class_id");
  const title = document.getElementById("title");
  const brief_catigory = document.getElementById("brief_catigory");
  const files = document.getElementById("files").files;
  if (
    body !== "" &&
    title.value !== "" &&
    class_id.value !== "" &&
    brief_catigory.value !== ""
  ) {
    let obj = {
      creater_id: user_id,
      task_body: body,
      class_id: class_id.value,
      title: title.value,
      brief_catigory: brief_catigory.value,
    };

    const res = await sendData(taskURL, "POST", formData(files, obj), "");
    console.log(res);
    if (res.res === "avalid") {
      notification(res.msg, "var(alert-b-g)", "var(alert-text-g)");
    }
  } else {
    msg.innerHTML = "some fieldes is empty";
  }
});
