function add() {
  const tbody = document.getElementById("tablebody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td><input type="text" class="items"></td>
    <td><input type="number" class="quantity" value="0"></td>
    <td><input type="number" class="price" value="0"></td>
    <td><input type="number" class="rtotal" readonly></td>
    <td><span class="remove text-danger">Remove</span></td>
    `;

  tbody.appendChild(newRow);

  newRow.querySelector(".remove").addEventListener("click", function () {
    newRow.remove();
  });

  const quantityInput = newRow.querySelector(".quantity");
  const priceInput = newRow.querySelector(".price");

  quantityInput.addEventListener("input", total);
  priceInput.addEventListener("input", total);
}

function tot() {
  const rows = document.querySelectorAll("#tablebody tr");
  last = 0;
  rows.forEach((row) => {
    const price = parseFloat(row.querySelector(".price").value) || 0;
    const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
    const total = price * quantity;
    row.querySelector(".rtotal").value = total.toFixed(2);

    last += total;
  });
}

function cal() {
  tot();
  const final = last;
  const gst = document.getElementById("gsst").value;

  if (gst == 6) {
    grand = (final * 6) / 100;
  } else if (gst == 12) {
    grand = (final * 12) / 100;
  } else if (gst == 18) {
    grand = (final * 18) / 100;
  } else if (gst == 22) {
    grand = (final * 22) / 100;
  }

  document.getElementById("sub").innerHTML = final.toFixed(2);
  document.getElementById("gstamt").innerHTML = grand.toFixed(2);
  document.getElementById("total").innerHTML = (final - grand).toFixed(2);
}

function dark() {
  let body = document.body;
  body.classList.toggle("dark-mode");

  let inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.classList.toggle("input-dark");
  });

  let table = document.querySelector("#table");
  if (table) {
    table.classList.toggle("table-dark");
  }

  let button = document.querySelector("#dark");
  if (body.classList.contains("dark-mode")) {
    button.textContent = "Light Theme";
  } else {
    button.textContent = "Dark Theme";
    button.classList.remove("btn-light", "text-dark");
    button.classList.add("btn-primary");
  }
}


function pri() {
  cal();

  const rows = document.querySelectorAll("#tablebody tr");
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;

  const subTotal = document.getElementById("sub").innerHTML;
  const gstAmount = document.getElementById("gstamt").innerHTML;
  const grandTotal = document.getElementById("total").innerHTML;

  let rowsHTML = "";

  rows.forEach((row) => {
    const item = row.querySelector(".items").value;
    const quantity = row.querySelector(".quantity").value;
    const price = row.querySelector(".price").value;
    const total = row.querySelector(".rtotal").value;

    rowsHTML += `
            <tr>
                <td>${item}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${total}</td>
            </tr>
        `;
  });

  const ibd = `
    <div class="container">
        <div class="head-sec">
            <h4 class="csr-name">Name: ${name}</h4>
            <h6 class="date">Date: ${date}</h6>
        </div><hr>
        <div class="table">
            <table id="table" class="table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="tablebody">
                    ${rowsHTML}
                </tbody>
            </table>
        </div>
        <div class="text-end">
            <h6>Sub: <strong>${subTotal}</strong></h6>
            <h6>GST: <strong>${gstAmount}</strong></h6>
            <h6>Total: <strong>${grandTotal}</strong></h6>
        </div>
    </div>
    `;

  document.getElementById("invoiceBody").innerHTML = ibd;
  var invoiceModal = new bootstrap.Modal(
    document.getElementById("invoiceModal")
  );
  invoiceModal.show();
}
