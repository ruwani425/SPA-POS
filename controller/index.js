$(document).ready(() => {
  $("#home").show();
  $("#customer, #order, #item").hide();

  setTimeout(() => {
    $(".box").addClass("loaded");
  }, 200);

  $("#home-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Home");
    $("#home").show();
    $("#customer, #order, #item").hide();
    setActiveButton(this);

    $(".box").removeClass("loaded"); // Reset the animation
    setTimeout(() => {
      $(".box").addClass("loaded"); // Reapply the animation
    }, 200);
  });

  $("#customer-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Customer Manage");
    $("#home").hide();
    $("#customer").show();
    $("#order, #item").hide();
    setActiveButton(this);
  });

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

  $("#item-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Item Manage");
    $("#home").hide();
    $("#customer").hide();
    $("#order").hide();
    $("#item").show();
    setActiveButton(this);
  });

  $("#customer-box").on("click", () => {
    $("#header-text").text("Customer Manage");
    $("#home").hide();
    $("#customer").show();
    $("#order, #item").hide();
    setActiveButton("#customer-btn");
  });

  $("#item-box").on("click", () => {
    $("#header-text").text("Item Manage");
    $("#home").hide();
    $("#item").show();
    $("#customer, #order").hide();
    setActiveButton("#item-btn");
  });

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
