const block = document.getElementById('block');
const dog_image = document.getElementById('dog_image');
const results = document.getElementById('results');
var anim_trigger = false
var anim_trigger_int = 0;
const fail_alert = document.getElementById('fail_alert')
var fail_status = false

var tID; //we will use this variable to clear the setInterval()
function animateScript(flag) {
    const dif = 149
    var    position = dif; //start position for the image slicer
    const  interval = 100; //100 ms of interval for the setInterval()
    if (!flag) {
        clearInterval(tID);
        return;
    }
    console.log('aaaa')
    tID = setInterval ( () => {
        // console.log('enter TID')
    document.getElementById("dog_image").style.backgroundPosition = `-${position}px 0px`; 
    //we use the ES6 template literal to insert the variable "position"
    
    if (anim_trigger_int < 2) {
        if (position < 306) {
            position = position + dif;
        } else { 
            position = dif;
        }
    }
    else {
        clearInterval(tID);
    }
    // anim_trigger_int++;
    }
    , interval ); //end of setInterval
} //end of animateScript()

animateScript(!anim_trigger)
// onkeydown = (event) => {
//     // anim_trigger = !anim_trigger
//     if ((anim_trigger_int % 2) > 0) {
//         console.log(anim_trigger_int)
//         anim_trigger = true
//     }
//     // anim_trigger_int++;
//     animateScript(anim_trigger)};

onkeydown = (event) => {
    // animateScript(true)
}
onkeyup = (event) => {
    // clearInterval(tID);
    // animateScript(false)
    // anim_trigger_int=0;
};

const gameContainer = document.getElementById('game-container');
let score = 0;

        function moveBlock(event) {
            const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            if (event.key === 'ArrowLeft' && blockLeft > 0) {
                // dog_image.src = '../static/dog.png'
                dog_image.style.backgroundImage = 'url(../static/dog.png)'
                // dog_image.setAttribute('background-image', 'url("./static/dog.png");')
                block.style.left = blockLeft - 25 + 'px';
                
            }
            if (event.key === 'ArrowRight' && blockLeft + 165 < gameContainer.clientWidth) {
                block.style.left = blockLeft + 25 + 'px';
                // dog_image.setAttribute('background-image', 'url("./static/dogright.png");')
                dog_image.style.backgroundImage = 'url(../static/dogright.png)'
                // block.setAttribute('background-image', 'url("./static/dogright.png");')
            }
        }

        function createCircle() {
            if (fail_status) {clearInterval(fallInterval)}
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.left = Math.random() * (gameContainer.clientWidth - 60) + 'px';
            gameContainer.appendChild(circle);

            const fallInterval = setInterval(() => {
                
                const circleTop = parseInt(window.getComputedStyle(circle).getPropertyValue('top'));
                
                if (isCircleOnBlock(circle, block) && !fail_status) {
                    console.log(fail_status)
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
                if (circleTop + circle.clientHeight >= gameContainer.clientHeight){
                    console.log('FAIL')
                    clearInterval(tID)
                    fail_alert.style.display = "block"
                    fail_status = true
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