
/** Toggle Password */
function showPassword() {
  var x = document.getElementById("formPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/** Add Up CO2e */
function AddCO2e(data_carbon_list) {
let total_carbon = 0;
    for (i = 0; i < data_carbon_list.length; i++) {
        total_carbon += data_carbon_list[i];
    }
    return total_carbon
}
