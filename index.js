// script.js
const imageContainer = document.getElementById('image-container');
const checkButton = document.getElementById('check-order');
const randomOrderDisplay = document.getElementById('random-order');
const playerOrderDisplay = document.getElementById('player-order');
const statusMessage = document.getElementById('status-message');

// Define images and shuffle them
const images = ['./images/grey.jpeg', './images/rose-cup.jpeg','./images/wight-cup.jpeg', './images/black-cup.jpeg', './images/red-cup.jpeg', './images/pink-cup.jpeg', './images/blue-cup.jpeg'];
let currentOrder = [...images].sort(() => Math.random() - 0.5); // Random order
let randomOrder = [...images].sort(() => Math.random() - 0.5); // Random order
//console.log('currentOrder, randomOrder);


// Render images in the container
function renderRanomimg(){
    document.getElementById("ramndomimg").innerHTML=""
    randomOrder.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        document.getElementById("ramndomimg").appendChild(img);
    });
        
    document.getElementById("reset").style.display = "block";

}

function renderImages(order) {
    imageContainer.innerHTML = '';
    order.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.draggable = true;
        imageContainer.appendChild(img);

        img.addEventListener('dragstart', () => {
            img.classList.add('dragging');
        });

        img.addEventListener('dragend', () => {
            img.classList.remove('dragging');
        });
    });
}

// Get the dragged-over position
function getDragAfterElement(container, x) {
    const elements = [...container.querySelectorAll('img:not(.dragging)')];

    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Drag-and-drop functionality
imageContainer.addEventListener('dragover', e => {
    e.preventDefault();
    const draggingImg = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(imageContainer, e.clientX);
    if (afterElement == null) {
        imageContainer.appendChild(draggingImg);
    } else {
        imageContainer.insertBefore(draggingImg, afterElement);
    }

    // Update current order after drag-and-drop
    currentOrder = [...imageContainer.querySelectorAll('img')].map(img => img.src.split('/').pop());
    document.getElementById("status-message").innerHTML = "";
    //console.log('Random Order:', currentOrder, randomOrder);
});

function checkOrder(){
      let inrightPosition = 0;

      for(let i = 0; i< currentOrder.length; i++){
        if(currentOrder[i] === randomOrder[i].split('/').pop()){
            inrightPosition++;
        }
      }
      if(inrightPosition === randomOrder.length){
        document.getElementById("status-message").innerHTML = "you win!! all of them are in the right order ";
        renderRanomimg();

      }else{
          document.getElementById("status-message").innerHTML = `you have ${inrightPosition} in the right order`
      }
}

document.getElementById("check-order").addEventListener('click', checkOrder)

// Render the initial images
renderImages(currentOrder);


document.getElementById("give-up").addEventListener('click', renderRanomimg);
document.getElementById('reset').addEventListener('click', ()=>{
    location.reload()
});

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 100; i++) { // Generate 100 confetti pieces
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
        confetti.style.animationDelay = `${Math.random() * 4}s`; // Random delay
        confetti.style.animationDuration = `${3 + Math.random() * 2}s`; // Random duration
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Trigger confetti when the user wins
document.getElementById('check-order').addEventListener('click', () => {
    const statusMessage = document.getElementById('status-message').innerText;
    if (statusMessage.includes('you win')) {
        createConfetti();
    }
});
