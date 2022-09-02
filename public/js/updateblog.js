const showAlerts6 = function (type, msg) {
  hideAlerts6();
  const markup = `<div class="alert alert--${type}" >${msg} </div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlerts6, 1000);
};
const hideAlerts6 = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const update = async (
  heading,
  paragraph,
  cardView1,
  cardView2,
  cardView3,
  paragraph2
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/user/updateMe",
      data: {
        heading,
        paragraph,
        cardView1,
        cardView2,
        cardView3,
        paragraph2,
      },
    });

    if (res.data.status === "success") {
      showAlerts6("success", "Successfully Posted");
      window.setTimeout(() => {
        location.assign("/createblog");
      }, 1500);
    }
  } catch (err) {
    showAlerts6("error", err.response, err.message);
  }
};

const updateBtn = document.querySelector(".submit1");
if (updateBtn) {
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const heading = document.querySelector(".form-inputA").value;
    const paragraph = document.querySelector(".form-inputB").value;
    const cardView1 = document.querySelector(".form-inputC").value;
    const cardView2 = document.querySelector(".form-inputD").value;
    const cardView3 = document.querySelector(".form-inputE").value;
    const paragraph2 = document.querySelector(".form-inputF").value;

    update(heading, paragraph, cardView1, cardView2, cardView3, paragraph2);
  });
}
