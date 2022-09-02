const showAlerts1 = function (type, msg) {
  hideAlerts1();
  const markup = `<div class="alert alert--${type}" >${msg} </div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlerts1, 1000);
};
const hideAlerts1 = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const signup = async (email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/signup",
      data: {
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlerts1("success", "Successfully signup");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlerts1("error", err.response, err.message);
  }
};

const signupBtn = document.querySelector(".form1");
if (signupBtn) {
  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector(".email-input1").value;
    const password = document.querySelector(".password-input1").value;
    const passwordConfirm = document.querySelector(".password-input2").value;

    signup(email, password, passwordConfirm);
  });
}
