const valorinput = document.getElementsByClassName("input-valor")[0];
const SelectFrom = document.querySelector("#select-moeda1");
const SelectTo = document.querySelector("#select-moeda2");
const ImgResult1 = document.querySelector(".resultado1-logo");
const ImgResult2 = document.querySelector(".resultado2-logo");
const ConvertFromValue = document.querySelector("#valueResult1");
const ConvertedValue = document.querySelector("#valueResult2");
const MoedaResult1 = document.querySelector("#moedaResult1");
const MoedaResult2 = document.querySelector("#moedaResult2");

function Converter() {
  ConvertFromValue.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorinput.value);

  const dolar = 5.54;
  const euro = 6.05;
  const real = 1.0;

  if (SelectTo.value == "Dolar") {
    ConvertedValue.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(valorinput.value * dolar);
  }
  if (SelectTo.value == "Euro") {
    ConvertedValue.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(valorinput.value * euro);
  }
}

SelectTo.addEventListener("change", ChangeMoeda);
function ChangeMoeda() {
  Converter();
  MoedaResult2.innerHTML = SelectTo.value;
  const bandeiras = {
    Dolar: "assets/usaBandeira.png",
    Real: "assets/brasilBandeira.png",
    Euro: "assets/EURBandeira.png",
  };

  if (bandeiras[SelectFrom.value]) {
    ImgResult1.src = bandeiras[SelectFrom.value];
  }
  if (bandeiras[SelectTo.value]) {
    ImgResult2.src = bandeiras[SelectTo.value];
  }
}
