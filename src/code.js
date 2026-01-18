const sizeGrid = 8; 
let start = false; 
let direcao = 'direita';
let possicaoCobra = [
    [4,4],
    [4,3],
    [4,2]
]


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
    
    desenharCobra();
    setInterval(moverCobra, 300);
}

function desenharCobra() { 
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('cobra')
  })
  possicaoCobra.forEach( parte => {
    const celular = pegarCelular(parte[0], parte[1]);
    celular.classList.add('cobra')
  })
}

function moverCobra() {
    let cabeca = possicaoCobra[0] 
    let novaCabeca = [cabeca[0], cabeca[1]];
  if (direcao === "direita") {
    novaCabeca[1]++;
  } else if (direcao === "esquerda") {
    novaCabeca[1]--;
  } else if (direcao === "baixo") {
    novaCabeca[0]++;
  } else if (direcao === "cima") {
    novaCabeca[0]--;
  }

  possicaoCobra.unshift(novaCabeca);

  possicaoCobra.pop()
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