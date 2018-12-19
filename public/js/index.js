
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
function addCO2e() {
let carbonList = document.getElementsbyTagName("dataCarbon");
let totalCarbon = 0;
    for (i = 0; i < carbonList.length; i++) {
        totalCarbon += carbonList[i];
    }
document.getElementById('total').innerHTML = total;
}
