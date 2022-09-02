const showAlert3 = function (type, msg) {
  hideAlert3();
  const markup = `<div class="alert alert--${type}" >${msg} </div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert3, 1000);
};
const hideAlert3 = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const logOut = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/user/logout",
    });

    if (res.data.status === "success") {
      showAlert3("success", "Logout Successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }

    console.log("hii");
  } catch (err) {
    showAlert3("error", "error in logging Out");
    console.log("byy");
  }
};
btnLogout = document.querySelector(".nav__el--logout");
if (btnLogout) btnLogout.addEventListener("click", logOut);
