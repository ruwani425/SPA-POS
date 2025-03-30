$(document).ready(() => {
  // Show only the "Home" section by default
  $("#home").show();
  $("#customer, #order, #item").hide();

  // Handle Home button click
  $("#home-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Home");
    $("#home").show();
    $("#customer, #order, #item").hide();
    setActiveButton(this);
  });

  // Handle Customer button click
  $("#customer-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Customer Manage");
    $("#home").hide();
    $("#customer").show();
    $("#order, #item").hide();
    setActiveButton(this);
  });

  // Handle Order button click
  $("#order-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Order Manage");
    $("#home").hide();
    $("#customer").hide();
    $("#order").show();
    $("#item").hide();
    setActiveButton(this);

    // Reload customers and items when navigating to the order page
    if (typeof window.loadCustomers === "function") {
      window.loadCustomers();
    }
    if (typeof window.loadItems === "function") {
      window.loadItems();
    }
  });

  // Handle Item button click
  $("#item-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Item Manage");
    $("#home").hide();
    $("#customer").hide();
    $("#order").hide();
    $("#item").show();
    setActiveButton(this);
  });

  // Handle Customer Box click
  $("#customer-box").on("click", () => {
    $("#header-text").text("Customer Manage");
    $("#home").hide();
    $("#customer").show();
    $("#order, #item").hide();
    setActiveButton("#customer-btn");
  });

  // Handle Item Box click
  $("#item-box").on("click", () => {
    $("#header-text").text("Item Manage");
    $("#home").hide();
    $("#item").show();
    $("#customer, #order").hide();
    setActiveButton("#item-btn");
  });

  // Handle Order Box click
  $("#order-box").on("click", () => {
    $("#header-text").text("Order Manage");
    $("#home").hide();
    $("#order").show();
    $("#customer, #item").hide();
    setActiveButton("#order-btn");

    // Reload customers and items when navigating to the order page
    if (typeof window.loadCustomers === "function") {
      window.loadCustomers();
    }
    if (typeof window.loadItems === "function") {
      window.loadItems();
    }
  });

  // Function to set the active button
  function setActiveButton(buttonSelector) {
    $(".nav-link").removeClass("active");
    $(buttonSelector).addClass("active");
  }
});
