import { sendData } from "./functions.js";
import { forgetPwd } from "./constURLs.js";

const sendBtn = document.getElementById("send");
const sendCode = document.getElementById("send-code");
const sendPwd = document.getElementById("send-pwd");

const emailBox = document.getElementById("email-box");
const codeBox = document.getElementById("code-box");
const pwdBox = document.getElementById("reset-pwd");
let code = null;
let user_id = null;

sendBtn.addEventListener("click", async () => {
  const input = document.getElementById("input");
  const obj = { email: input.value };
  const res = await sendData(forgetPwd, "POST", obj, "json");

  if (res.msg === "valid") {
    codeBox.style.display = "block";
    emailBox.style.display = "none";
    document.getElementById("msg").innerHTML = "";
    code = res.code;
    user_id = res.id;
  } else {
    document.getElementById("msg").innerHTML = "email does not  exist";
  }
});

sendCode.addEventListener("click", () => {
  const input = document.getElementById("code-inp");
  if (code !== null) {
    if (input.value == code) {
      codeBox.style.display = "none";
      pwdBox.style.display = "block";
    } else {
      document.getElementById("msg").innerHTML = "the code not valid";
    }
  }
});

sendPwd.addEventListener("click", async () => {
  const pwd = document.getElementById("pwd").value;
  const repwd = document.getElementById("repwd").value;
  if (pwd !== "" && pwd == repwd) {
    const res = await sendData(
      forgetPwd,
      "PUT",
      { pwd: pwd, id: user_id },
      "json"
    );

    if ((res.msg = "valid")) {
      sessionStorage.setItem("user_id", res.id);
      sessionStorage.setItem("user_name", res.full_name);
      sessionStorage.setItem("class_id", res.class_id);
      sessionStorage.setItem("_tk", res._tk);
      sessionStorage.setItem("user_img", res.photo_path);
      if (res.who === "teacher")
        window.location.href = "./teachers/briefs.html";
      else window.location.href = "./student/authoformation.html";
    }
  } else {
    document.getElementById("msg").innerHTML = "the pwd not match repwd";
  }
});
