$(document).ready(function () {
    $("#home-btn").on("click", function (event) {
        event.preventDefault();
        $("#home").show();
        $("#customer").hide();
        $("#order").hide();
    });
    $("#customer-btn").on("click", function (event) {
        event.preventDefault();
        $("#home").hide();
        $("#customer").show();
        $("#order").hide();
    });
    $("#order-btn").on("click", function (event) {
        event.preventDefault();
        $("#home").hide();
        $("#customer").hide();
        $("#order").show();
    });
    $("#item-btn").on("click", function (event) {
        event.preventDefault();
        $("#home").hide();
        $("#customer").hide();
        $("#order").show();
    });
});