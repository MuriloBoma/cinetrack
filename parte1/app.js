const TOTAL = 6;

const filmesIniciais = [
    {
    id: 1,
    titulo: "A origem",
    ano: 2010,
    genero: "Ficção Cientifica",
    poster: "https://image.tmdb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
    nota: 5,
    status: "Assistido"
    },
    {
    id: 2,
    titulo: "Parasita",
    ano: 2019,
    genero: "Suspense",
    poster: "https://image.tmdb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
    nota: 4,
    status: "Assistido"
    },
    {
    id: 3,
    titulo: "O Auto da Compadecida",
    ano: 2000,
    genero: "Comédia",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
    nota: 5,
    status: "Assistido"
    },
    {
    id: 4,
    titulo: "Duna: Parte Dois",
    ano: 2024,
    genero: "Ficção Cientifica",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg",
    nota: 4,
    status: "Assistindo"
    },
    {
    id: 5,
    titulo: "Interestelar",
    ano: 2014,
    genero: "Ficção Cientifica",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
    nota: 4,
    status: "Quero Assistir"
    },
    {
    id: 6,
    titulo: "Cidade de Deus",
    ano: 2002,
    genero: "Drama",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
    nota: 4,
    status: "Quero Assistir"
    }
];


const coresStatus = {
    'Assistido': '#28a745',
    'Quero Assistir': '#ffc107',
    'Assistindo': '#3ebdf8'
};

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

function renderizarCards(filmes) {
    const cards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src=${f.poster}>

            <h2>${f.titulo}</h2>

            <p>${f.ano} - ${f.genero}</p>

            <p>Nota: <span class="nota">${estrelas(f.nota)}</span></p>

            <span class="status" style="background-color: ${coresStatus[f.status]}">
                ${f.status}
            </span>

            <div class="acoes">
                <button>Editar</button>
                <button>Remover</button>
            </div>
        </article>`).join("");
    lista.innerHTML = cards;
}

document.querySelector("footer").innerHTML = `<small>CineTrack © 2026 · ${TOTAL} filmes cadastrados.</small>`;
