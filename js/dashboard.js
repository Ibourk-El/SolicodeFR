import {
  getData,
  setUserName,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  class_id,
  logout,
} from "./functions.js";
import { dashboard } from "./constURLs.js";

logout();
setUserName(user_name, user_img);
checkIfuserLogin(user_id, setDataInTable);

const tbody = document.getElementById("tbody");

async function setDataInTable() {
  const res = await getData(dashboard, "?class_id=" + class_id);
  console.log(res);
  tbody.innerHTML = "";
  for (let item in res) {
    tbody.innerHTML += tableElemnt(
      res[item].photo,
      res[item].full_name,
      res[item].email,
      res[item].brief,
      res[item].autho
    );
  }
}

function tableElemnt(imgSrc, fullName, email, brief, autho) {
  const obj = {
    PHP: `<i class="fa-brands fa-php"></i>`,
    CSS: `<i class="fa-brands fa-css3"></i>`,
    Javascript: `<i class="fa-brands fa-js"></i>`,
    MySQL: `<i class="fa-solid fa-database"></i>`,
    HTML: `<i class="fa-brands fa-html5"></i>`,
  };

  let complite = "";
  let inproses = "";

  for (let item in autho) {
    if (autho[item]["elements_end"] === autho[item]["elements_number"]) {
      complite += obj[item];
    } else {
      const calc =
        (autho[item]["elements_end"] * 100) / autho[item]["elements_number"];
      inproses += `<div class="proses">
                  ${obj[item]}<span  class="bar-box"><span style="width:${calc}%;" class="bar-color"></span></span>
                </div>`;
    }
  }
  return `<tr>
            <th>
              <img src="${imgSrc}" alt="">
            </th>
            <th>${fullName}</th>
            <th>${email}</th>
            <th>${brief}</th>
            <th>
              ${complite}
            </th>
            <th class="bar">
              ${inproses}
            </th>
          </tr>`;
}
