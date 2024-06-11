import { profileURL } from "./constURLs.js";
import {
  checkIfuserLogin,
  setUserName,
  user_id,
  user_img,
  user_name,
  class_id,
  getData,
  sendData,
  logout,
  formData,
} from "./functions.js";

// const profileURL = baceURL + "solicode/backend/api/profile.php";
const userImageP = document.getElementById("user-img-p");
const saveBtn = document.getElementById("save-change");
const fileLabel = document.getElementById("file-label");

userImageP.src = user_img;
logout();
checkIfuserLogin(user_id, () => {});
setUserName(user_name, user_img);
setUserData();

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

async function setUserData() {
  const res = await getData(
    profileURL,
    "?id=" + user_id + "&class_id=" + class_id
  );
  const inputs = document.querySelectorAll(".inp");
  inputs.forEach((el) => {
    el.value = res.user_info[el.name];
  });

  setStaticData(
    res.brief_data.points,
    res.brief_data.rank,
    res.brief_data.brief_valid,
    res.problem_info.rank,
    res.problem_info.valid
  );
  console.log(res);
}

const editBtn = document.querySelectorAll(".edit");

editBtn.forEach((el) => {
  el.addEventListener("click", async (e) => {
    const inp = e.target.parentElement.children[0];
    inp.style.backgroundColor = "white";
    if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Edit";
      inp.style.backgroundColor = "var(--gray-light)";
      inp.setAttribute("readonly", "");

      const obj = { id: user_id, inp_name: inp.name, inp_value: inp.value };
      // send to update
      sessionStorage.setItem("user_name", inp.value);
      setUserName(inp.value, user_img);

      const res = await sendData(profileURL, "PUT", obj, "json");
    } else {
      e.target.innerHTML = "Save";
      inp.removeAttribute("readonly");
      inp.setAttribute("autofocus", "");
    }
    // autofocus.autofocus;
  });
});

saveBtn.addEventListener("click", async () => {
  const imgUrl = document.getElementById("file_path").files;

  const res = await sendData(
    profileURL,
    "POST",
    formData(imgUrl, { id: user_id }),
    ""
  );
  console.log(res);
  setUserName(user_name, res.photo);
  sessionStorage.setItem("user_img", res.photo);
  userImageP.src = res.photo;

  saveBtn.style.display = "none";
});

fileLabel.addEventListener("click", () => {
  saveBtn.style.display = "block";
});

function setStaticData(Bp, Br, Bc, Rp, Ps) {
  document.getElementById("briefs-points").innerHTML =
    Bp === undefined ? 0 : Bp;
  document.getElementById("class-rank").innerHTML = Br === null ? "&#8734" : Rp;
  document.getElementById("briefs-complited").innerHTML =
    Bc === undefined ? 0 : Bc;
  document.getElementById("rank-problem").innerHTML =
    Rp === null ? "&#8734" : Rp;
  document.getElementById("problems-solved").innerHTML =
    Ps === undefined ? 0 : Ps;
}
