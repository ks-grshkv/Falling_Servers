const block = document.getElementById('block');
const dog_image = document.getElementById('dog_image');
const results = document.getElementById('results');


var tID; //we will use this variable to clear the setInterval()
function animateScript() {
    const dif = 149
    var    position = dif; //start position for the image slicer
    const  interval = 100; //100 ms of interval for the setInterval()
    tID = setInterval ( () => {
    document.getElementById("dog_image").style.backgroundPosition = `-${position}px 0px`; 
    //we use the ES6 template literal to insert the variable "position"
    if (position < 306)
    { position = position + dif;
        console.log('AAAA')}
    //we increment the position by 256 each time
    else
    { position = dif;
        console.log('BBB') }
    // console.log('AAAA')
    //reset the position to 256px, once position exceeds 1536px
    }
    
    , interval ); //end of setInterval
} //end of animateScript()

animateScript()

const gameContainer = document.getElementById('game-container');
let score = 0;

        function moveBlock(event) {
            const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            if (event.key === 'ArrowLeft' && blockLeft > 0) {
                // dog_image.src = '../static/dog.png'
                // dog_image.setAttribute('background-image', 'url("./static/dog.png");')
                block.style.left = blockLeft - 25 + 'px';
                
            }
            if (event.key === 'ArrowRight' && blockLeft + 50 < gameContainer.clientWidth) {
                block.style.left = blockLeft + 25 + 'px';
                // dog_image.setAttribute('background-image', 'url("./static/dogright.png");')
                // dog_image.src = '../static/dogright.png'
                // block.setAttribute('background-image', 'url("./static/dogright.png");')
            }
        }

        function createCircle() {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.left = Math.random() * (gameContainer.clientWidth - 20) + 'px';
            gameContainer.appendChild(circle);

            const fallInterval = setInterval(() => {
                const circleTop = parseInt(window.getComputedStyle(circle).getPropertyValue('top'));
                
                if (isCircleOnBlock(circle, block)) {
                    score++;
                    updateScore();
                    // circle.hidden = true
                    console.log(score)
                } 

                if (circleTop + circle.clientHeight >= gameContainer.clientHeight || isCircleOnBlock(circle, block)) {
                    clearInterval(fallInterval);
                    gameContainer.removeChild(circle);
                    // circle.style.top = circleTop + 5 + 'px';
                }
                circle.style.top = circleTop + 5 + 'px';
                    
                //     else {
                //     clearInterval(fallInterval);
                //     gameContainer.removeChild(circle);}
                // } else {
                //     circle.style.top = circleTop + 5 + 'px';
                // }
            }, 20);
        }

        function isCircleOnBlock(circle, block) {
            const circleRect = circle.getBoundingClientRect();
            const blockRect = block.getBoundingClientRect();
            return (
                circleRect.left >= blockRect.left &&
                circleRect.right <= blockRect.right &&
                circleRect.bottom >= blockRect.top &&
                circleRect.bottom <= blockRect.bottom
            );
        }

        function updateScore() {
            // const scoreElement = document.createElement('p');
            results.textContent = `Score: ${score}`;
            // results.appendChild(scoreElement);
        }

        document.addEventListener('keydown', moveBlock);
        setInterval(createCircle, 1000);