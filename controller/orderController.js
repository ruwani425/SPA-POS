$(document).ready(() => {
  generateOrderID();
  setCurrentDate();
  loadCustomers();
  loadItems();

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
  function loadItems() {
    const itemSelect = document.getElementById("select-item");
    if (!itemSelect) {
      console.error("Item dropdown not found");
      return;
    }
    itemSelect.innerHTML = `<option value="">Select Item</option>`;
    itemArray.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.itemCode;
      option.textContent = `${item.itemCode} - ${item.itemName}`;
      itemSelect.appendChild(option);
    });
    itemSelect.addEventListener("change", function () {
      const selectedItemCode = this.value;
      const selectedItem = itemArray.find(
        (i) => i.itemCode === selectedItemCode
      );

      if (selectedItem) {
        document.getElementById("order_itemCode").value = selectedItem.itemCode;
        document.getElementById("order_itemName").value = selectedItem.itemName;
        document.getElementById("order_itemPrice").value =
          selectedItem.itemPrice;
        document.getElementById("order_qtyOnHand").value = selectedItem.itemQty;
      } else {
        document.getElementById("order_itemCode").value = "";
        document.getElementById("order_itemName").value = "";
        document.getElementById("order_itemPrice").value = "";
        document.getElementById("order_qtyOnHand").value = "";
      }
    });
  }

  $("#addItemBtn").on("click", function () {
    const itemCode = $("#order_itemCode").val();
    const itemName = $("#order_itemName").val();
    const itemPrice = parseFloat($("#order_itemPrice").val());
    const qtyOnHand = parseInt($("#order_qtyOnHand").val());
    const orderQuantity = parseInt($("#orderQuantity").val());

    if (
      !itemCode ||
      !itemName ||
      isNaN(itemPrice) ||
      isNaN(orderQuantity) ||
      orderQuantity <= 0
    ) {
      alert("Please select a valid item and enter a valid quantity.");
      return;
    }

    if (orderQuantity > qtyOnHand) {
      alert("Order quantity exceeds available stock.");
      return;
    }

    const totalPrice = itemPrice * orderQuantity;

    // Check if the item already exists in the table
    const existingRow = $(`#orderTableBody tr[data-item-code="${itemCode}"]`);
    if (existingRow.length > 0) {
      const existingQty = parseInt(existingRow.find(".quantity").text());
      const newQty = existingQty + orderQuantity;
      const newTotal = itemPrice * newQty;

      existingRow.find(".quantity").text(newQty);
      existingRow.find(".total").text(newTotal.toFixed(2));
    } else {
      const newRow = `
            <tr data-item-code="${itemCode}">
                <td>${itemCode}</td>
                <td>${itemName}</td>
                <td>${itemPrice.toFixed(2)}</td>
                <td class="quantity">${orderQuantity}</td>
                <td class="total">${totalPrice.toFixed(2)}</td>
            </tr>
        `;
      $("#orderTableBody").append(newRow);
    }

    // Update the total price in the summary
    updateOrderSummary();

    // Clear the input fields
    $("#order_itemCode").val("");
    $("#order_itemName").val("");
    $("#order_itemPrice").val("");
    $("#order_qtyOnHand").val("");
    $("#orderQuantity").val("");
  });

  function updateOrderSummary() {
    let total = 0;
    $("#orderTableBody tr").each(function () {
      const rowTotal = parseFloat($(this).find(".total").text());
      total += rowTotal;
    });
    $("#total").text(total.toFixed(2));
    $("#subtotal").text(total.toFixed(2));
  }

  // Event listener for cash input to calculate balance
  $("#cash").on("input", function () {
    const cash = parseFloat($(this).val());
    const subtotal = parseFloat($("#subtotal").text());

    if (!isNaN(cash) && !isNaN(subtotal)) {
      const balance = cash - subtotal;
      $("#balance").val(balance.toFixed(2));
    } else {
      $("#balance").val("");
    }
  });

  // Event listener for discount input to update subtotal
  $("#discount").on("input", function () {
    const discount = parseFloat($(this).val());
    const total = parseFloat($("#total").text());

    if (!isNaN(discount) && discount >= 0 && discount <= 100) {
      const discountedAmount = (total * discount) / 100;
      const newSubtotal = total - discountedAmount;
      $("#subtotal").text(newSubtotal.toFixed(2));

      // Recalculate balance if cash is already entered
      const cash = parseFloat($("#cash").val());
      if (!isNaN(cash)) {
        const balance = cash - newSubtotal;
        $("#balance").val(balance.toFixed(2));
      }
    } else {
      $("#subtotal").text(total.toFixed(2));
    }
  });

  //make global access
  window.loadCustomers = loadCustomers;
  window.loadItems = loadItems;

  $("#purchaseBtn").on("click", function () {
    const orderId = $("#orderId").val();
    const orderDate = $("#date").val();
    const customerId = $("#order_customerID").val();
    const orderItems = [];
    const subtotal = parseFloat($("#subtotal").text());
    const cash = parseFloat($("#cash").val());

    if (isNaN(cash) || cash < subtotal) {
      alert(
        "Insufficient cash. Please enter an amount equal to or greater than the subtotal."
      );
      return;
    }

    // Collect all items from the order table
    $("#orderTableBody tr").each(function () {
      const itemCode = $(this).find("td:nth-child(1)").text();
      const itemName = $(this).find("td:nth-child(2)").text();
      const itemPrice = parseFloat($(this).find("td:nth-child(3)").text());
      const quantity = parseInt($(this).find(".quantity").text());
      const total = parseFloat($(this).find(".total").text());

      orderItems.push({
        itemCode,
        itemName,
        itemPrice,
        quantity,
        total,
      });

      // Update the item quantity in the itemArray
      const item = itemArray.find((i) => i.itemCode === itemCode);
      if (item) {
        item.itemQty -= quantity;
      }
    });

    if (orderItems.length === 0) {
      alert("No items in the order to purchase.");
      return;
    }

    const order = {
      orderId,
      orderDate,
      customerId,
      orderItems,
      total: parseFloat($("#total").text()),
      subtotal,
    };

    orderArray.push(order);

    $("#orderTableBody").empty();

    $("#order_customerID").val("");
    $("#order_customerName").val("");
    $("#order_customerSalary").val("");
    $("#order_customerAddress").val("");
    $("#total").text("00.0");
    $("#subtotal").text("00.0");
    $("#cash").val("");
    $("#discount").val("");
    $("#balance").val("");

    $("#select-customer").val("");
    $("#select-item").val("");

    generateOrderID();

    // Reload the items dropdown to reflect updated quantities
    if (typeof window.loadItems === "function") {
      window.loadItems();
    }

    alert("Order placed successfully!");
  });
});
