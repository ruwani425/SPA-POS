$(document).ready(() => {
  let customerArray = []; // Array to store customers

  // Function to display error messages
  function showError(inputId, errorMessage) {
    $(inputId).removeClass("is-valid").addClass("is-invalid");
    $(inputId).next(".invalid-feedback").remove();
    $(inputId).after(`<div class="invalid-feedback">${errorMessage}</div>`);
  }

  // Function to clear error messages
  function clearError(inputId) {
    $(inputId).removeClass("is-invalid").addClass("is-valid");
    $(inputId).next(".invalid-feedback").remove();
  }

  // Real-time validation for Customer ID
  $("#customer-id").on("input", function () {
    const customerId = $(this).val();
    const customerIdPattern = /^C\d{2}-\d{3}$/;
    if (!customerId || !customerIdPattern.test(customerId)) {
      showError(this, "Customer ID is a required field: Pattern C00-000");
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Customer Name
  $("#customer-name").on("input", function () {
    const customerName = $(this).val();
    const customerNamePattern = /^[a-zA-Z\s]{5,20}$/;
    if (!customerName || !customerNamePattern.test(customerName)) {
      showError(
        this,
        "Customer Name is a required field: Minimum 5, Max 20, spaces allowed"
      );
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Customer Address
  $("#customer-address").on("input", function () {
    const customerAddress = $(this).val();
    if (!customerAddress || customerAddress.length < 5) {
      showError(
        this,
        "Customer Address is a required field: Minimum 5 characters"
      );
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Customer Salary
  $("#customer-salary").on("input", function () {
    const customerSalary = $(this).val();
    const customerSalaryPattern = /^\d+(\.\d{2})?$/;
    if (!customerSalary || !customerSalaryPattern.test(customerSalary)) {
      showError(
        this,
        "Customer Salary is a required field: Pattern 100.00 or 100"
      );
    } else {
      clearError(this);
    }
  });

  // Save Customer
  $("#btn-save-customer").on("click", function (event) {
    event.preventDefault();

    if (isValidated()) {
      const customerId = $("#customer-id").val();

      // Check if the customer ID already exists
      const existingCustomer = customerArray.find(
        (customer) => customer.customerId === customerId
      );

      if (existingCustomer) {
        alert("Customer ID already exists. Please use a different ID.");
        return; // Stop further execution
      }

      const customer = {
        customerId: customerId,
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
      $(".is-valid").removeClass("is-valid");
    }
  });

  // Update Customer
  $("#btn-customer-update").on("click", function (event) {
    event.preventDefault();

    if (isValidated()) {
      const customerId = $("#customer-id").val();

      // Check if the customer ID exists in the array
      const customer = customerArray.find(
        (customer) => customer.customerId === customerId
      );

      if (!customer) {
        alert("Customer ID not found. Please add the customer first.");
        return; // Stop further execution
      }

      // Update the customer details
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

      // Call loadCustomers to update the dropdown in the order form
      if (typeof window.loadCustomers === "function") {
        window.loadCustomers();
      }

      $("#customer-form")[0].reset();
    }
  });

  // Validation Function
  function isValidated() {
    let isValid = true;

    // Trigger validation for all fields
    $("#customer-id").trigger("input");
    $("#customer-name").trigger("input");
    $("#customer-address").trigger("input");
    $("#customer-salary").trigger("input");

    // Check if any field has the "is-invalid" class
    if ($(".is-invalid").length > 0) {
      isValid = false;
    }

    return isValid;
  }

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

  //clear text feilds
  $("#btn-clear-all").on("click", (event) => {
    event.preventDefault();
    $("#customer-form")[0].reset();
    $(".is-invalid").removeClass("is-invalid");
    $(".is-valid").removeClass("is-valid");
    $(".invalid-feedback").remove();
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
