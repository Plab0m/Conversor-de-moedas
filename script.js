function Converter() {
    const valorinput = document.getElementsByClassName("input-valor")[0];
    console.log(valorinput.value);
    const dolarTday = 5.54;
    const euroTday = 6.05;
    const realTday = 1.00;

    const ConvertFromValue = document.querySelector("#valueResult1");
    ConvertFromValue.innerHTML = "R$ " + Number(valorinput.value).toFixed(2);

    const ConvertedValue = document.querySelector("#valueResult2");
    ConvertedValue.innerHTML = "US$ "+ (valorinput.value * dolarTday).toFixed(2);
}


