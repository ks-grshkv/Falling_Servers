const block = document.getElementById('block');
const dog_image = document.getElementById('dog_image');
const results = document.getElementById('results');
var anim_trigger = false
var anim_trigger_int = 0;
const fail_alert = document.getElementById('fail_alert')
var fail_status = false
var fail_count = 0
const fail_msg = document.getElementById('fail_msg')
const lives = document.getElementById('lives')
const lifearray = [document.getElementById('life0'), document.getElementById('life1'), document.getElementById('life2')]
var main_int;
var tID; //we will use this variable to clear the setInterval()
function animateScript(flag) {
    const dif = 149
    var    position = dif;
    const  interval = 100; //100 ms of interval for the setInterval()
    if (!flag) {
        clearInterval(tID);
        return;
    }
    tID = setInterval ( () => {
    document.getElementById("dog_image").style.backgroundPosition = `-${position}px 0px`; 

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
    }
    , interval ); 
}
animateScript(!anim_trigger)


const gameContainer = document.getElementById('game-container');
let score = 0;
results.textContent = `Score: ${score}`;

function moveBlock(event) {
    if (fail_status) {return}
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    if (event.key === 'ArrowLeft' && blockLeft > 0) {
        dog_image.style.backgroundImage = 'url(../static/dog.png)'
        block.style.left = blockLeft - 25 + 'px';
    }
    if (event.key === 'ArrowRight' && blockLeft + 165 < gameContainer.clientWidth) {
        block.style.left = blockLeft + 25 + 'px';
        dog_image.style.backgroundImage = 'url(../static/dogright.png)';
    }
}

function createCircle() {
    if (fail_status) {
        return;
    }
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = Math.random() * (gameContainer.clientWidth - 60) + 'px';
    gameContainer.appendChild(circle);

    console.log("createCircle")
    const fallInterval = setInterval(() => {
        console.log("fallInterval")
        const circleTop = parseInt(window.getComputedStyle(circle).getPropertyValue('top'));      
        if (isCircleOnBlock(circle, block) && !fail_status) {
            console.log(fail_status)
            score++;
            updateScore();
        } 

        if (circleTop + circle.clientHeight >= gameContainer.clientHeight || isCircleOnBlock(circle, block)) {
            clearInterval(fallInterval);
            gameContainer.removeChild(circle);
        }
        
        if (circleTop + circle.clientHeight+5 >= gameContainer.clientHeight && !isCircleOnBlock(circle, block)){
            clearInterval(fallInterval);
            gameContainer.removeChild(circle);

            if (fail_count <= 2) {
                let curr_life = lifearray[fail_count]

                curr_life.style.display="none"
                fail_count++;
            }
            if (fail_count > 2) {
                fail_alert.style.display = "block"
                fail_msg.style.display = "block"
                clearInterval(tID)
                fail_status = true;
                // clearInterval(main_int)
                // clearInterval(fallInterval)
                // return
            }
            
            }
            circle.style.top = circleTop + 5 + 'px';
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
            results.textContent = `Score: ${score}`;
        }


document.addEventListener('keydown', moveBlock);
if (!fail_status) {
    main_int = setInterval(createCircle, 1000);
} else {clearInterval(main_int)}