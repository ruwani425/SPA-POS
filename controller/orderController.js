$(document).ready(() => {
  generateOrderID();
  setCurrentDate();
  loadCustomers();

  function generateOrderID() {
    const orderIdField = document.getElementById("orderId");
    if (orderIdField) {
      const shortId = Date.now().toString(36).slice(-5);
      const randomNum = Math.floor(100 + Math.random() * 900);
      const orderId = `ORD-${shortId}${randomNum}`;
      orderIdField.value = orderId;
    } else {
      console.error("orderId field not found");
    }
  }

  function setCurrentDate() {
    const dateField = document.getElementById("date");
    if (dateField) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US");
      dateField.value = formattedDate;
    } else {
      console.error("Date field not found");
    }
  }

  function loadCustomers() {
    const customerSelect = document.getElementById("select-customer");
    if (!customerSelect) {
      console.error("Customer dropdown not found");
      return;
    }

    // Clear the existing options and add the default "Select Customer"
    customerSelect.innerHTML = `<option value="">Select Customer</option>`;

    // Populate the dropdown dynamically from customerArray
    customerArray.forEach((customer) => {
      const option = document.createElement("option");
      option.value = customer.customerId;
      option.textContent = `${customer.customerId} - ${customer.customerName}`;
      customerSelect.appendChild(option);
    });

    // Add event listener for dropdown change
    customerSelect.addEventListener("change", function () {
      const selectedCustomerId = this.value;
      const selectedCustomer = customerArray.find(
        (c) => c.customerId === selectedCustomerId
      );

      if (selectedCustomer) {
        document.getElementById("order_customerID").value =
          selectedCustomer.customerId;
        document.getElementById("order_customerName").value =
          selectedCustomer.customerName;
        document.getElementById("order_customerSalary").value =
          selectedCustomer.customerSalary;
        document.getElementById("order_customerAddress").value =
          selectedCustomer.customerAddress;
      } else {
        document.getElementById("order_customerID").value = "";
        document.getElementById("order_customerName").value = "";
        document.getElementById("order_customerSalary").value = "";
        document.getElementById("order_customerAddress").value = "";
      }
    });
  }

  //make global access
  window.loadCustomers = loadCustomers;
});
