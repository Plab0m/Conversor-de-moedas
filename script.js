const valorinput = document.getElementsByClassName("input-valor")[0];
const SelectFrom = document.querySelector("#select-moeda1");
const SelectTo = document.querySelector("#select-moeda2");
const ImgResult1 = document.querySelector(".resultado1-logo");
const ImgResult2 = document.querySelector(".resultado2-logo");
const ConvertFromValue = document.querySelector("#valueResult1");
const ConvertedValue = document.querySelector("#valueResult2");
const MoedaResult1 = document.querySelector("#moedaResult1");
const MoedaResult2 = document.querySelector("#moedaResult2");

const moedas = {
  Dolar: 5.54,
  Euro: 6.05,
  Real: 1.0,
};

const formatacaoMoedas = {
  Dolar: { locale: "en-US", currency: "USD" },
  Euro: { locale: "de-DE", currency: "EUR" },
  Real: { locale: "pt-BR", currency: "BRL" },
};

function converterParaReal(valor, moedaOrigem) {
  return valor * (moedas.Real / moedas[moedaOrigem]);
}

function converterDeReal(valorEmReal, moedaDestino) {
  return valorEmReal * (moedas[moedaDestino] / moedas.Real);
}

function converterMoedas(valor, moedaOrigem, moedaDestino) {
  if (moedaOrigem === moedaDestino) {
    return valor;
  }

  const valorEmReal = converterParaReal(valor, moedaOrigem);

  const valorConvertido = converterDeReal(valorEmReal, moedaDestino);

  return valorConvertido;
}

function Converter() {
  const valorOriginal = parseFloat(valorinput.value) || 0;
  const moedaOrigem = SelectFrom.value;
  const moedaDestino = SelectTo.value;

  const formatOrigem = formatacaoMoedas[moedaOrigem];
  ConvertFromValue.innerHTML = new Intl.NumberFormat(formatOrigem.locale, {
    style: "currency",
    currency: formatOrigem.currency,
  }).format(valorOriginal);

  const valorConvertido = converterMoedas(
    valorOriginal,
    moedaOrigem,
    moedaDestino
  );

  const formatDestino = formatacaoMoedas[moedaDestino];
  ConvertedValue.innerHTML = new Intl.NumberFormat(formatDestino.locale, {
    style: "currency",
    currency: formatDestino.currency,
  }).format(valorConvertido);
   if (valorOriginal <= 0) {
    valorinput.placeholder = "Valor inválido!";
    return;
  }
}

SelectTo.addEventListener("change", ChangeMoeda);
SelectFrom.addEventListener("change", ChangeMoeda);

function ChangeMoeda() {
  Converter();
  MoedaResult1.innerHTML = SelectFrom.value;
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
