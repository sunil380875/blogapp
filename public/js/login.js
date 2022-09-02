//import axios from axios
const showAlerts = function (type, msg) {
  hideAlerts();
  const markup = `<div class="alert alert--${type}" >${msg} </div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlerts, 1000);
};
const hideAlerts = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);

    if (res.data.status === "success") {
      showAlerts("success", "Logged in Successful");
      window.setTimeout(() => {
        location.assign("/me");
      }, 1500);
    }
  } catch (err) {
    showAlerts("error", "Invalid Credential");
  }
};

const loginBtn = document.querySelector(".form");
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector(".email-input").value;
    const password = document.querySelector(".password-input").value;

    login(email, password);
  });
}
