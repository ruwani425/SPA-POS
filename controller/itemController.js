
$(document).ready(function () {
  // Function to display error messages
  function showError(inputId, errorMessage) {
    $(inputId).removeClass("is-invalid");
    $(inputId).next(".invalid-feedback").remove();

    $(inputId).addClass("is-invalid");
    $(inputId).after(`<div class="invalid-feedback">${errorMessage}</div>`);
  }

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
      $("#item-form")[0].reset();
      $(".is-invalid").removeClass("is-invalid");
      $(".invalid-feedback").remove();
    }

    function isValidated() {
      let itemCode = $("#item-code").val();
      let itemName = $("#item-name").val();
      let itemQty = $("#item-qty").val();
      let itemPrice = $("#item-price").val();
      let isValid = true;

      if (itemCode === "") {
        showError("#item-code", "Item Code is required.");
        isValid = false;
      }
      if (itemName === "") {
        showError("#item-name", "Item Name is required.");
        isValid = false;
      }
      if (itemQty === "" || itemQty <= 0) {
        showError("#item-qty", "Valid Quantity is required.");
        isValid = false;
      }
      if (itemPrice === "" || itemPrice <= 0) {
        showError("#item-price", "Valid Price is required.");
        isValid = false;
      }

      if (itemArray.some((item) => item.itemCode === itemCode)) {
        showError("#item-code", "Item Code already exists.");
        isValid = false;
      }

      return isValid;
    }
  });

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

      $("#item-form")[0].reset();
    } else {
      alert("Item not found.");
    }
  });
});
