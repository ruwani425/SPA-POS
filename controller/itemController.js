$(document).ready(function () {
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

  // Real-time validation for Item Code
  $("#item-code").on("input", function () {
    const itemCode = $(this).val();
    const itemCodePattern = /^I\d{2}-\d{3}$/;
    if (!itemCode || !itemCodePattern.test(itemCode)) {
      showError(this, "Item Code is a required field: Pattern I00-000");
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Item Name
  $("#item-name").on("input", function () {
    const itemName = $(this).val();
    const itemNamePattern = /^[a-zA-Z\s]{5,20}$/;
    if (!itemName || !itemNamePattern.test(itemName)) {
      showError(
        this,
        "Item Name is a required field: Minimum 5, Max 20, spaces allowed"
      );
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Item Quantity
  $("#item-qty").on("input", function () {
    const itemQty = $(this).val();
    if (!itemQty || isNaN(itemQty) || itemQty <= 0) {
      showError(this, "Item Quantity is a required field: Only numbers");
    } else {
      clearError(this);
    }
  });

  // Real-time validation for Item Price
  $("#item-price").on("input", function () {
    const itemPrice = $(this).val();
    const itemPricePattern = /^\d+(\.\d{2})?$/;
    if (!itemPrice || !itemPricePattern.test(itemPrice)) {
      showError(this, "Item Price is a required field: Pattern 100.00 or 100");
    } else {
      clearError(this);
    }
  });

  // Item Save Function
  $("#btn-save-item").on("click", function (event) {
    event.preventDefault();

    if (isValidated()) {
      let item = {
        itemCode: $("#item-code").val(),
        itemName: $("#item-name").val(),
        itemQty: $("#item-qty").val(),
        itemPrice: $("#item-price").val(),
      };

      itemArray.push(item);
      addToTable(item);

      if (typeof window.loadItems === "function") {
        window.loadItems();
      }

      $("#item-form")[0].reset();
      $(".is-invalid").removeClass("is-invalid");
      $(".is-valid").removeClass("is-valid");
    }
  });

  // Validation Function
  function isValidated() {
    let isValid = true;

    // Trigger validation for all fields
    $("#item-code").trigger("input");
    $("#item-name").trigger("input");
    $("#item-qty").trigger("input");
    $("#item-price").trigger("input");

    // Check if any field has the "is-invalid" class
    if ($(".is-invalid").length > 0) {
      isValid = false;
    }

    return isValid;
  }

  // Function to add item to the table
  function addToTable(item) {
    let tableRow = `<tr>
            <td>${item.itemCode}</td>
            <td>${item.itemName}</td>
            <td>${item.itemQty}</td>
            <td>${item.itemPrice}</td>
        </tr>`;
    $("#item-table-body").append(tableRow);
  }

  // Clear all form inputs
  $("#btn-clear-all-item").on("click", function () {
    $("#item-form")[0].reset();
    $(".is-invalid").removeClass("is-invalid");
    $(".is-valid").removeClass("is-valid");
    $(".invalid-feedback").remove();
  });

  // Table row click event for editing
  $("#item-table-body").on("click", "tr", function () {
    let itemCode = $(this).find("td").eq(0).text();
    let itemName = $(this).find("td").eq(1).text();
    let itemQty = $(this).find("td").eq(2).text();
    let itemPrice = $(this).find("td").eq(3).text();

    $("#item-code").val(itemCode);
    $("#item-name").val(itemName);
    $("#item-qty").val(itemQty);
    $("#item-price").val(itemPrice);
  });

  // Remove item
  $("#btn-remove-item").on("click", function () {
    let itemCode = $("#item-code").val();
    itemArray = itemArray.filter((item) => item.itemCode !== itemCode);

    $("#item-table-body tr").each(function () {
      if ($(this).find("td").eq(0).text() === itemCode) {
        $(this).remove();
      }
    });

    if (typeof window.loadItems === "function") {
      window.loadItems();
    }

    $("#item-form")[0].reset();
  });

  // Update item
  $("#btn-update-item").on("click", function () {
    let itemCode = $("#item-code").val();
    let item = itemArray.find((item) => item.itemCode === itemCode);

    if (item) {
      item.itemName = $("#item-name").val();
      item.itemQty = $("#item-qty").val();
      item.itemPrice = $("#item-price").val();

      $("#item-table-body tr").each(function () {
        if ($(this).find("td").eq(0).text() === itemCode) {
          $(this).find("td").eq(1).text(item.itemName);
          $(this).find("td").eq(2).text(item.itemQty);
          $(this).find("td").eq(3).text(item.itemPrice);
        }
      });

      if (typeof window.loadItems === "function") {
        window.loadItems();
      }

      $("#item-form")[0].reset();
    } else {
      alert("Item not found.");
    }
  });
});
