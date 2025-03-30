$(document).ready(() => {
  function showError(inputId, errorMessage) {
    $(inputId).removeClass("is-invalid");
    $(inputId).next(".invalid-feedback").remove();

    $(inputId).addClass("is-invalid");
    $(inputId).after(`<div class="invalid-feedback">${errorMessage}</div>`);
  }

  //customer save function
  $("#btn-save-customer").on("click", (event) => {
    event.preventDefault();

    if (isValidated()) {
      const customer = {
        customerId: $("#customer-id").val(),
        customerName: $("#customer-name").val(),
        customerAddress: $("#customer-address").val(),
        customerSalary: $("#customer-salary").val(),
      };
      customerArray.push(customer);
      addToTable(customer);

      // Call loadCustomers to update the dropdown in the order form
      if (typeof window.loadCustomers === "function") {
        window.loadCustomers();
      }

      $("#customer-form")[0].reset();
      $(".is-invalid").removeClass("is-invalid");
      $(".invalid-feedback").remove();
    }

    // Validation function
    function isValidated() {
      const customerId = $("#customer-id").val();
      const customerName = $("#customer-name").val();
      const customerAddress = $("#customer-address").val();
      const customerSalary = $("#customer-salary").val();
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

  // Function to add customer to the table
  function addToTable(customer) {
    const tableRow = `<tr>
              <td>${customer.customerId}</td>
              <td>${customer.customerName}</td>
              <td>${customer.customerAddress}</td>
              <td>${customer.customerSalary}</td>
          </tr>`;
    $("#customer-table-body").append(tableRow);
    $("#customer-table").show();
  }

  // Function to delete table row
  $("#btn-customer-delete").on("click", (event) => {
    event.preventDefault();
    const customerId = $("#customer-id").val();
    if (customerId === "") {
      alert("Customer ID is required to delete.");
      return;
    }

    customerArray = customerArray.filter((c) => c.customerId !== customerId);

    $("#customer-table-body tr").each(function () {
      if ($(this).find("td").eq(0).text() === customerId) {
        $(this).remove();
      }
    });

    // Update the customer dropdown after deletion
    if (typeof window.loadCustomers === "function") {
      window.loadCustomers();
    }

    $("#customer-form")[0].reset();
  });

  // Function to update table row
  $("#btn-customer-update").on("click", (event) => {
    event.preventDefault();
    const customerId = $("#customer-id").val();
    const customer = customerArray.find((c) => c.customerId === customerId);

    if (customer) {
      // Update the object in array
      customer.customerName = $("#customer-name").val();
      customer.customerAddress = $("#customer-address").val();
      customer.customerSalary = $("#customer-salary").val();

      // Update the row in the table
      $("#customer-table-body tr").each(function () {
        if ($(this).find("td").eq(0).text() === customerId) {
          $(this).find("td").eq(1).text(customer.customerName);
          $(this).find("td").eq(2).text(customer.customerAddress);
          $(this).find("td").eq(3).text(customer.customerSalary);
        }
      });

      // Update the customer dropdown after update
      if (typeof window.loadCustomers === "function") {
        window.loadCustomers();
      }

      $("#customer-form")[0].reset();
    } else {
      alert("Customer ID not found.");
    }
  });

  //clear text feilds
  $("#btn-clear-all").on("click", (event) => {
    event.preventDefault();
    $("#customer-form")[0].reset();
  });

  //table row click event
  $("#customer-table-body").on("click", "tr", function () {
    const customerId = $(this).find("td").eq(0).text();
    const customerName = $(this).find("td").eq(1).text();
    const customerAddress = $(this).find("td").eq(2).text();
    const customerSalary = $(this).find("td").eq(3).text();

    $("#customer-id").val(customerId);
    $("#customer-name").val(customerName);
    $("#customer-address").val(customerAddress);
    $("#customer-salary").val(customerSalary);
  });
});
