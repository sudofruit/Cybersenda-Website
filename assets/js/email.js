document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) {
    console.error("Contact form not found.");
    return;
  }

  const successMsg = document.querySelector(".messenger-box-contact__msg");
  const errorMsg = document.querySelector(".error-box-contact__msg");
  const submitBtn = contactForm.querySelector(".submit-btn");

  if (!successMsg || !errorMsg) {
    console.error("Message elements not found.");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<div class="spinner-border spinner-border-sm" role="status"></div> Sending...';

    // Hide previous messages
    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    emailjs
      .sendForm("service_n15xi3x", "template_kuw07xd", this)
      .then(() => {
        successMsg.style.display = "block";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        errorMsg.style.display = "block";
      })
      .finally(() => {
        // Re-enable button after request completes
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Message";
      });
  });
});
