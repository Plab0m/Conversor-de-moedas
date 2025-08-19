const valorinput = document.getElementsByClassName("input-valor")[0];
const SelectFrom = document.querySelector("#select-moeda1");
const SelectTo = document.querySelector("#select-moeda2");
const ImgResult1 = document.querySelector(".resultado1-logo");
const ImgResult2 = document.querySelector(".resultado2-logo");
const ConvertFromValue = document.querySelector("#valueResult1");
const ConvertedValue = document.querySelector("#valueResult2");
const MoedaResult1 = document.querySelector("#moedaResult1");
const MoedaResult2 = document.querySelector("#moedaResult2");

const formatacaoMoedas = {
  USDBRL: { locale: "en-US", currency: "USD" },
  EURBRL: { locale: "de-DE", currency: "EUR" },
  BRL: { locale: "pt-BR", currency: "BRL" },
};

async function converterMoedas(valor, moedaOrigem, moedaDestino) {
  const moedas = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
  ).then((response) => response.json());
  if (moedaOrigem === moedaDestino) {
    return valor;
  }
  const cotOrigem = moedaOrigem == "BRL" ? 1 : parseFloat(moedas[moedaOrigem].high);
  const cotDestino = moedaDestino == "BRL" ? 1 : parseFloat(moedas[moedaDestino].high);
  const valorConvertido = (valor * cotOrigem) / cotDestino;
  return valorConvertido;
}

async function Converter() {
  const valorOriginal = parseFloat(valorinput.value) || 0;
  const moedaOrigem = SelectFrom.value;
  const moedaDestino = SelectTo.value;

  const valorConvertido = await converterMoedas(
    valorOriginal,
    moedaOrigem,
    moedaDestino
  );

  const formatOrigem = formatacaoMoedas[moedaOrigem];
  ConvertFromValue.innerHTML = new Intl.NumberFormat(formatOrigem.locale, {
    style: "currency",
    currency: formatOrigem.currency,
  }).format(valorOriginal);
  const formatDestino = formatacaoMoedas[moedaDestino];
  ConvertedValue.innerHTML = new Intl.NumberFormat(formatDestino.locale, {
    style: "currency",
    currency: formatDestino.currency,
  }).format(valorConvertido);

  if (valorOriginal <= 0) {
    valorinput.placeholder = "Valor inválido!";
    valorinput.classList.add("erro-placeholder");
    return;
  }

  valorinput.classList.remove("erro-placeholder");
  valorinput.placeholder = "Insira o valor:";
}
const ButtonConverter = document.querySelector(".converter");
ButtonConverter.addEventListener("click", ChangeMoeda);
SelectTo.addEventListener("change", ChangeMoeda);
SelectFrom.addEventListener("change", ChangeMoeda);

function ChangeMoeda() {
  Converter();
  MoedaResult1.innerHTML =
    SelectFrom.value == "BRL" ? "Real" : SelectFrom.value.slice(0, 3);
  MoedaResult2.innerHTML =
    SelectTo.value == "BRL" ? "Real" : SelectTo.value.slice(0, 3);

  const bandeiras = {
    USDBRL: "assets/usaBandeira.png",
    BRL: "assets/brasilBandeira.png",
    EURBRL: "assets/EURBandeira.png",
  };

  if (bandeiras[SelectFrom.value]) {
    ImgResult1.src = bandeiras[SelectFrom.value];
  }
  if (bandeiras[SelectTo.value]) {
    ImgResult2.src = bandeiras[SelectTo.value];
  }
}
