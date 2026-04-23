const packageButtons = document.querySelectorAll(".package-card");
const guestCount = document.querySelector("#guestCount");
const guestValue = document.querySelector("#guestValue");
const heroEstimate = document.querySelector("#heroEstimate");
const heroDetail = document.querySelector("#heroDetail");
const formEstimate = document.querySelector("#formEstimate");
const inquiryForm = document.querySelector("#inquiryForm");
const formStatus = document.querySelector("#formStatus");

let selectedPackage = {
  name: "signature",
  price: 18500
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function estimateTotal() {
  const guests = Number(guestCount.value);
  const guestPremium = Math.max(0, guests - 120) * 42;
  return selectedPackage.price + guestPremium;
}

function updateEstimate() {
  const guests = Number(guestCount.value);
  const total = currency.format(estimateTotal());

  guestValue.textContent = guests;
  heroEstimate.textContent = total;
  formEstimate.textContent = total;
  heroDetail.textContent = `${guests} guests, ${selectedPackage.name} plan`;
}

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    packageButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    selectedPackage = {
      name: button.dataset.package,
      price: Number(button.dataset.price)
    };
    updateEstimate();
  });
});

guestCount.addEventListener("input", updateEstimate);

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const name = data.get("name") || "there";
  formStatus.textContent = `Thanks, ${name}. Your ${selectedPackage.name} proposal brief is ready to send.`;
});

updateEstimate();
