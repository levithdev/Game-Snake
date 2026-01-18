const sizeGrid = 8; 
let start = false; 
let direcao = 'direita';
let intervaloJogo = null;
let possicaoCobra = [
    [4,4],
    [4,3],
    [4,2]
] 
// acho mais interesante deixar o corpo inteiro no inicio no mesmo espaço. tudo [4, 4] e quando add a morte,
//  fazer algo para não permite a morte nesse caso. acho que fica mehor para o user, porque ele pode ir 
//  para o lado onde estaria o corpo se mantiver desse jeito.
let possicaoFruta = null;


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

    if (intervaloJogo) return;

    surgiFruta(); 
    desenharCobra();
    intervaloJogo = setInterval(moverCobra, 300);
}

 function gameOver () {
    clearInterval(intervaloJogo)
    intervaloJogo = null
    alert("Game over")

    //restart game 
    possicaoCobra = [[4,4], [4,3], [4,2]]; 
    direcao = 'direita'; 

    document.querySelectorAll('.cell').forEach (cell => {
        cell.classList.remove('cobra', 'fruta');
    })
 } 
// fruta 

function surgiFruta() { 
    let frutaCriada = false;
    while (!frutaCriada) { 
        let row = Math.floor(Math.random() * sizeGrid); 
        let col = Math.floor(Math.random() * sizeGrid); 
    
    const celular = pegarCelular(row, col);

    if (!celular.classList.contains('cobra')) {
         possicaoFruta = [row, col];
         celular.classList.add('fruta')
         frutaCriada = true; 
        }
    }
}

// Tudo sobre a cobra 
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
  if (novaCabeca[0] < 0 || novaCabeca[0] >= sizeGrid|| 
      novaCabeca[1]< 0 || novaCabeca[1] >= sizeGrid) {
        gameOver();
        return;
      }

  let bateuNoCorpo = possicaoCobra.slice(1).some(parte => 
    parte[0] === novaCabeca[0] && parte[1] === novaCabeca[1]
  );
  if( bateuNoCorpo) {
    gameOver();
    return;
  }

  possicaoCobra.unshift(novaCabeca);

  // se comeu a fruta 
  if (novaCabeca[0] === possicaoFruta[0] && novaCabeca[1] === possicaoFruta[1]) {
    const celularFruta = pegarCelular(possicaoFruta[0], possicaoFruta[1]); 
    celularFruta.classList.remove('fruta'); 

    surgiFruta(); 
  } else { 
    possicaoCobra.pop(); 
  }
  console.log(cabeca[0], cabeca[1])
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
