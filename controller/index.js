$(document).ready(() => {
  $("#home-btn").on("click", (event) => {
    event.preventDefault();
    $("#home").show();
    $("#customer").hide();
    $("#order").hide();
    $("#item").hide();
  });
  $("#customer-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Customer Manage");
    $("#home").hide();
    $("#customer").show();
    $("#order").hide();
    $("#item").hide();
  });
  $("#order-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Order Manage");
    $("#home").hide();
    $("#customer").hide();
    $("#order").show();
    $("#item").hide();

    // Reload customers when navigating to the order page
    if (typeof window.loadCustomers === "function") {
      window.loadCustomers();
    }
  });
  $("#item-btn").on("click", (event) => {
    event.preventDefault();
    $("#header-text").text("Item Manage");
    $("#home").hide();
    $("#customer").hide();
    $("#order").hide();
    $("#item").show();
  });
});
