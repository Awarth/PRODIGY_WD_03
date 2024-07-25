document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menuButton");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = sidebar.querySelector(".closeButton");
  const navLinks = document.querySelectorAll(".navLinks");
  const form = document.querySelector("form");
  const phoneInput = form.querySelector(
    'input[type="text"][placeholder="Phone no."]'
  );

  // Toggle sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("show");
  }

  menuButton.addEventListener("click", toggleSidebar);
  closeSidebarButton.addEventListener("click", toggleSidebar);

  // Scroll to section on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      const sectionId = this.getAttribute("href").substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      sidebar.classList.remove("show");
    });
  });

  // Prevent alphabetic characters in phone number input
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  // Validate phone number input
  phoneInput.addEventListener("blur", function () {
    const phoneRegex = /^[0-9]{10}$/; // Regex pattern for a 10-digit phone number
    if (!phoneRegex.test(phoneInput.value)) {
      phoneInput.setCustomValidity(
        "Please enter a valid 10-digit phone number."
      );
    } else {
      phoneInput.setCustomValidity("");
    }
  });

  // Form submission handling
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Check phone number validation
    if (!phoneInput.checkValidity()) {
      alert(phoneInput.validationMessage);
      return;
    }

    const formData = new FormData(form);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    console.log("Form Submitted:", formDataObj);

    alert("Form Submitted Successfully!");

    form.reset();
  });
});
