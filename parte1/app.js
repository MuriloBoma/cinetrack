const TOTAL = 6;

const filmesIniciais = [
    {
    id: 1,
    titulo: "A origem",
    ano: 2010,
    genero: "Ficção Cientifica",
    poster: "https://image.tmdb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
    nota: 5,
    status: "assistido"
    },
    {
    id: 2,
    titulo: "Parasita",
    ano: 2019,
    genero: "Suspense",
    poster: "https://image.tmdb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
    nota: 4,
    status: "assistido"
    },
    {
    id: 3,
    titulo: "O Auto da Compadecida",
    ano: 2000,
    genero: "Comédia",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
    nota: 5,
    status: "assistido"
    },
    {
    id: 4,
    titulo: "Duna: Parte Dois",
    ano: 2024,
    genero: "Ficção Cientifica",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg",
    nota: 4,
    status: "assistindo"
    },
    {
    id: 5,
    titulo: "Interestelar",
    ano: 2014,
    genero: "Ficção Cientifica",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
    nota: 4,
    status: "quero"
    },
    {
    id: 6,
    titulo: "Cidade de Deus",
    ano: 2002,
    genero: "Drama",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
    nota: 4,
    status: "quero"
    }
];

let filmes = [...filmesIniciais];

const nav = document.querySelector("nav");

const coresStatus = {
    'assistido': '#28a745',
    'quero': '#ffc107',
    'assistindo': '#3ebdf8'
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

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster;

    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;

    const infoAnoGenero = document.createElement("p");
    infoAnoGenero.textContent = `${f.ano} - ${f.genero}`;

    const infoNota = document.createElement("p");
    infoNota.textContent = "Nota: ";
    const spanNota = document.createElement("span");
    spanNota.className = "nota";
    spanNota.textContent = estrelas(f.nota);
    infoNota.append(spanNota);

    const spanStatus = document.createElement("span");
    spanStatus.className = "status";
    spanStatus.textContent = f.status;
    spanStatus.style.backgroundColor = coresStatus[f.status];

    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    divAcoes.append(btnEditar, btnRemover);

    card.append(img, titulo, infoAnoGenero, infoNota, spanStatus, divAcoes);

    return card;
}

function renderizarCards(filmes) {
    const frag = document.createDocumentFragment();
    filmes.forEach((f) => frag.appendChild(criarCard(f)));
    lista.replaceChildren(frag);
}

lista.addEventListener("click", (event) => {
    const botao = event.target.closest(".btn-remover");
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;
    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);
    renderizarCards(filmes);
});

nav.addEventListener("click", (event) => {
    const botao = event.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    const status = botao.dataset.status;
    renderizarCards(filmes.filter((f) => status === "todos" || f.status === status));
});

let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const abrir = () => modal.style.display = "flex";
const fechar = () => modal.style.display = "none";

document.querySelector("header button").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    abrir();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dados = {
        titulo: form.elements.titulo.value,
        ano: Number(form.elements.ano.value) || 2026,
        genero: form.elements.genero.value,
        poster: form.elements.poster.value,
        nota: Number(form.elements.nota.value) || 0,
        status: form.elements.status.value
    };

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId ? { ...f, ...dados } : f
        );
        editandoId = null;
    } else {
        filmes = [
            ...filmes,
            { id: gerarId(filmes), ...dados }
        ];
    }

    renderizarCards(filmes);
    fechar();
});


function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo) erros.push("Título obrigatório");
    if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido");
    return { valido: erros.length === 0, erros };
}

lista.addEventListener('click'  , (event) => { 
    const botao = event.target.closest('.btn-editar'); 
    if (!botao) return; 
    
    const card = botao.closest('.card'); 
    editandoId = Number(card.dataset.id); 
    
    const f = filmes.find((x) => x.id === editandoId);
    
    form.elements.titulo.value = f.titulo; 
    form.elements.ano.value = f.ano;
    form.elements.genero.value = f.genero;
    form.elements.poster.value = f.poster;
    form.elements.nota.value = f.nota;
    form.elements.status.value = f.status;
    
    abrir(); 
});

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

document.querySelector('#form-filme button[type="button"]').addEventListener("click", fechar);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        fechar();
    }
});



document.querySelector("footer").innerHTML = `<small>CineTrack © 2026 · ${TOTAL} filmes cadastrados.</small>`;
