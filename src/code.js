const size = 8; 

const conteineGrid = document.getElementById("conteineGrid")
conteineGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
conteineGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

 for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) { 
        const cell = document.createElement("div");
        cell.classList.add("cell"); 

        if ((row + col) % 2 == 0 ) {
            cell.classList.add("white");
        } else {
            cell.classList.add("black");
        }
        conteineGrid.appendChild(cell)
     }
 }