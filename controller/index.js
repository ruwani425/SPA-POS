$(document).ready(function () {
    $("#home-btn").on("click", function (event) {
        event.preventDefault();
        $("#home").show();
        $("#customer").hide();
        $("#order").hide();
        $("#item").hide();
    });
    $("#customer-btn").on("click", function (event) {
        event.preventDefault();
        $("#header-text").text("Customer Manage");
        $("#home").hide();
        $("#customer").show();
        $("#order").hide();
        $("#item").hide();
    });
    $("#order-btn").on("click", function (event) {
        event.preventDefault();
        $("#header-text").text("Order Manage");
        $("#home").hide();
        $("#customer").hide();
        $("#order").show();
        $("#item").hide();
    });
    $("#item-btn").on("click", function (event) {
        event.preventDefault();
        $("#header-text").text("Item Manage");
        $("#home").hide();
        $("#customer").hide();
        $("#order").hide();
        $("#item").show();
    });
});