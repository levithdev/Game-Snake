const sizeGrid = 8; 
let start = false; 
let direcao = 'direita';
let posicaoCobra = [4, 4]
let tamanho = 2; 


const conteineGrid = document.getElementById("conteineGrid")
conteineGrid.style.gridTemplateColumns = `repeat(${sizeGrid}, 1fr)`;
conteineGrid.style.gridTemplateRows = `repeat(${sizeGrid}, 1fr)`;

for (let row = 0; row < sizeGrid; row++) {
  for (let col = 0; col < sizeGrid; col++) { 
    const cell = document.createElement("div");
    cell.classList.add("cell"); 
    cell.dataset.row = row;
    cell.dataset.col = col;
    if ((row + col) % 2 == 0) {
      cell.classList.add("white");
    } else {
      cell.classList.add("black");
    }
    conteineGrid.appendChild(cell)
  }
}

function pegarCelular(row, col) {
 return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

function iniciarJogo() { 
    setInterval(moverCobra, 300);
    desenharCobra();
}

function desenharCobra() { 
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('cobra')
  })
  const celular = pegarCelular(posicaoCobra[0], posicaoCobra[1]); 
  celular.classList.add('cobra')
}

function moverCobra() {
  if (direcao === "direita") {
    posicaoCobra[1]++;
  } else if (direcao === "esquerda") {
    posicaoCobra[1]--;
  } else if (direcao === "baixo") {
    posicaoCobra[0]++;
  } else if (direcao === "cima") {
    posicaoCobra[0]--;
  }
  desenharCobra();
}

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowUp' && direcao !== 'baixo') {
    direcao = 'cima';
  } else if (evento.key === 'ArrowDown' && direcao !== 'cima') {
    direcao = 'baixo';
  } else if (evento.key === 'ArrowLeft' && direcao !== 'direita') {
    direcao = 'esquerda';
  } else if (evento.key === 'ArrowRight' && direcao !== 'esquerda') {
    direcao = 'direita';
  }
});