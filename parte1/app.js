const TOTAL = 6;

function rotuloStatus(status){
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";    
}

const estrelas = (n) => {
    let contador = "";
    for(let i = 1; i <= 5; i++){
        contador += (i <= n) ? "★" : "☆";
    }
    return contador;
}

const nota = document.querySelector(".card .nota");
const badge = document.querySelector(".card .status");

function alterar(n, s){
    nota.textContent = estrelas(n);
    badge.textContent = rotuloStatus(s);
}

document.querySelector("footer").innerHTML = `<small>CineTrack © 2026 · ${TOTAL} filmes cadastrados.</small>`;
