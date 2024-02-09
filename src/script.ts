import { Candidato } from "../types/Canditato";
import { Voto } from "../types/Votos";

let seuVotoPara = document.querySelector(".d-1-1 span") as HTMLElement;
let cargo = document.querySelector(".d-1-2 span") as HTMLElement;
let descricao = document.querySelector(".d-1-4") as HTMLElement;
let aviso = document.querySelector(".d-2") as HTMLElement;
let lateral = document.querySelector(".d-1-right") as HTMLElement;
let numeros = document.querySelector(".d-1-3") as HTMLElement;

let etapaAtual = 0;
let numero = "";
let branco = true;
let votos: Voto[] = [];

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHtml = "";
  numero = "";
  branco = false;

  for (var i = 0; i < etapa.numeros; i++) {
    if (i == 0) {
      numeroHtml += `<div class="numero pisca"></div>`;
    } else {
      numeroHtml += `<div class="numero"></div>`;
    }
  }

  seuVotoPara.style.display = "none";
  if (cargo) cargo.innerHTML = etapa.titulo;
  if (descricao) descricao.innerHTML = "";
  if (aviso) aviso.style.display = "none";
  if (lateral) lateral.innerHTML = "";
  if (numeros) numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  cargo.innerHTML = etapa.titulo;
  let candidato: Candidato | Candidato[] = etapa.candidatos.filter(
    (item) => item.numero.toString() == numero
  );

  if (candidato.length > 0) {
    candidato = Object.assign({}, candidato[0]);

    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    let fotosHtml = "";
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small">
        <img src=images/${candidato.fotos[i].url} alt="">
        ${candidato.fotos[i].legenda}
    </div>`;
      } else {
        fotosHtml += `<div class="d-1-image">
        <img src=images/${candidato.fotos[i].url} alt="">
        ${candidato.fotos[i].legenda}
    </div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
  }
}

function clicou(n: number) {
  let elNumero = document.querySelector(".numero.pisca");
  if (elNumero !== null) {
    elNumero.innerHTML = n.toString();
    numero += n;

    elNumero.classList.remove("pisca");
    elNumero.nextElementSibling
      ? elNumero.nextElementSibling.classList.add("pisca")
      : atualizaInterface();
  }
}

function btnBranco() {
  if (numero == "") {
    branco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML =
      '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
  } else {
    alert("Para votar em BRANCO, não pode ter digitado nenhum número!");
  }
}

function btnCorrige() {
  comecarEtapa();
}

function btnConfirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;
  if (branco) {
    votoConfirmado = true;
    votos.push({ etapa: etapas[etapaAtual].titulo, voto: "Branco" });
  } else if (numero.length == etapa.numeros) {
    votoConfirmado = true;
    votos.push({ etapa: etapas[etapaAtual].titulo, voto: numero });
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] != undefined) {
      comecarEtapa();
    } else {
      var tela = document.querySelector(".tela");
      if (tela) {
        tela.innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        console.log(votos);
      }
    }
  }
}

comecarEtapa();
