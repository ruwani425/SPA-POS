let customerArray = [];

$(document).ready(function () {
  function showError(inputId, errorMessage) {
    $(inputId).removeClass("is-invalid");
    $(inputId).next(".invalid-feedback").remove();

    $(inputId).addClass("is-invalid");
    $(inputId).after(`<div class="invalid-feedback">${errorMessage}</div>`);
  }

  $("#btn-save-customer").on("click", function (event) {
    event.preventDefault();

    if (isValidated()) {
      let customer = {
        customerId: $("#customer-id").val(),
        customerName: $("#customer-name").val(),
        customerAddress: $("#customer-address").val(),
        customerSalary: $("#customer-salary").val(),
      };
      customerArray.push(customer);
      addToTable(customer);
      $("#customer-form")[0].reset();
      $(".is-invalid").removeClass("is-invalid"); 
      $(".invalid-feedback").remove();
    }
    function isValidated() {
      let customerId = $("#customer-id").val();
      let customerName = $("#customer-name").val();
      let customerAddress = $("#customer-address").val();
      let customerSalary = $("#customer-salary").val();
      let isValid = true;

      if (customerId === "") {
        showError("#customer-id", "Customer ID is required.");
        isValid = false;
      }
      if (customerName === "") {
        showError("#customer-name", "Customer Name is required.");
        isValid = false;
      }
      if (customerAddress === "") {
        showError("#customer-address", "Customer Address is required.");
        isValid = false;
      }
      if (customerSalary === "") {
        showError("#customer-salary", "Customer Salary is required.");
        isValid = false;
      } else if (isNaN(customerSalary)) {
        showError("#customer-salary", "Salary must be a number.");
        isValid = false;
      } else if (customerSalary < 0) {
        showError("#customer-salary", "Salary must be a positive number.");
        isValid = false;
      }
      if (customerArray.some((c) => c.customerId === customerId)) {
        showError("#customer-id", "Customer ID already exists.");
        isValid = false;
      }
      return isValid;
    }
  });

  function addToTable(customer) {
    let tableRow = `<tr>
              <td>${customer.customerId}</td>
              <td>${customer.customerName}</td>
              <td>${customer.customerAddress}</td>
              <td>${customer.customerSalary}</td>
          </tr>`;
    $("#customer-table-body").append(tableRow);
    $("#customer-table").show();
  }

  $("#btn-customer-delete").on("click", function (event) {
    event.preventDefault();
    let customerId = $("#customer-id").val();
    if (customerId === "") {
      alert("Customer ID is required to delete.");
      return;
    }
    customerArray = customerArray.filter((c) => c.customerId !== customerId);
    $("#customer-table-body").empty();
    customerArray.forEach((customer) => addToTable(customer));
    $("#customer-form")[0].reset();
  });

  $("#btn-customer-update").on("click", function (event) {
    event.preventDefault();
    let customerId = $("#customer-id").val();
    let customer = customerArray.find((c) => c.customerId === customerId);
    if (customer) {
      customer.customerName = $("#customer-name").val();
      customer.customerAddress = $("#customer-address").val();
      customer.customerSalary = $("#customer-salary").val();
      $("#customer-table-body").empty();
      customerArray.forEach((customer) => addToTable(customer));
      $("#customer-form")[0].reset();
    } else {
      alert("Customer ID not found.");
    }
  });

  $("#customer-table-body").on("click", "tr", function () {
    let customerId = $(this).find("td").eq(0).text();
    let customerName = $(this).find("td").eq(1).text();
    let customerAddress = $(this).find("td").eq(2).text();
    let customerSalary = $(this).find("td").eq(3).text();

    $("#customer-id").val(customerId);
    $("#customer-name").val(customerName);
    $("#customer-address").val(customerAddress);
    $("#customer-salary").val(customerSalary);
  });
});
