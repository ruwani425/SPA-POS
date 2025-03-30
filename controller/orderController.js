$(document).ready(function () {
  generateOrderID();
  setCurrentDate();

  function generateOrderID() {
    console.log("generateOrderID called");
    let orderIdField = document.getElementById("orderId");
    if (orderIdField) {
      let shortId = Date.now().toString(36).slice(-5);
      let randomNum = Math.floor(100 + Math.random() * 900);
      let orderId = `ORD-${shortId}${randomNum}`;
      console.log("Generated Order ID:", orderId);
      orderIdField.value = orderId;
    } else {
      console.error("orderId field not found");
    }
  }

  function setCurrentDate() {
    const dateField = document.getElementById("date");
    if (dateField) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US');
      dateField.value = formattedDate;
    } else {
      console.error("Date field not found");
    }
  }
});
