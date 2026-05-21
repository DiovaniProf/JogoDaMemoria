const valores = [
    0,1,2,3,4,5,6,7,
    8,9,10,11,12,13,14,15
];

// embaralhar cartas
valores.sort(() => Math.random() - 0.5);

const tabuleiro = document.getElementById("tabuleiro");

let primeiraCarta = null;
let segundaCarta = null;

let bloqueado = false;

// cria cartas
valores.forEach((valor) => {

    const carta = document.createElement("div");

    carta.classList.add("carta");
    carta.classList.add("oculta");

    carta.dataset.valor = valor;

    carta.innerText = valor;

    carta.addEventListener("click", virarCarta);

    tabuleiro.appendChild(carta);
});

function virarCarta(){

    if(bloqueado) return;

    if(!this.classList.contains("oculta")) return;

    this.classList.remove("oculta");

    if(primeiraCarta === null){

        primeiraCarta = this;

    }else{

        segundaCarta = this;

        verificarPar();
    }
}

function verificarPar(){

    bloqueado = true;

    let valor1 = Number(primeiraCarta.dataset.valor);
    let valor2 = Number(segundaCarta.dataset.valor);

    // lógica dos pares:
    // 0-8 | 1-9 | 2-10 ...

    let ehPar =
        Math.abs(valor1 - valor2) === 8;

    if(ehPar){

        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        resetarJogada();

    }else{

        setTimeout(() => {

            primeiraCarta.classList.add("oculta");
            segundaCarta.classList.add("oculta");

            resetarJogada();

        }, 1000);
    }
}

function resetarJogada(){

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;
}