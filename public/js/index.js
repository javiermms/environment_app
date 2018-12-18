
/** Toggle Password */
function showPassword() {
  let x = document.getElementById("formPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/** Add Up CO2e */
function AddCO2e() {
let carbonList = document.getElementsbyClassName("carbon");
let totalCarbon = 0;
    for (i = 0; i < carbonList.length; i++) {
        total_carbon += carbonList[i];
    }
    return total_carbon
}
