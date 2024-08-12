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
const lifearray = [document.getElementById('life0'), document.getElementById('life1'), document.getElementById('life2'), document.getElementById('life3'), document.getElementById('life4')]
var main_int;
var tID;
var run_direction_switch = true;
var runInterval;
var speed = 20;

function animateScript(flag) {
    const dif = 149
    var position = dif;
    const interval = 100;
    if (!flag) {
        clearInterval(tID);
        return;
    }
    tID = setInterval(() => {
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
        , interval);
}
animateScript(!anim_trigger)


const gameContainer = document.getElementById('game-container');
let score = 0;
results.textContent = `Score: ${score}`;

function keyPressed(event) {

    moveBlock(event.key)
}

function moveBlock(direction) {

    if (fail_status) { return }
    speed = speed - 0.29;
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    if (direction === 'ArrowLeft' && blockLeft > 0) {
        dog_image.style.backgroundImage = 'url(./static/dog.png)';
        // run(blockLeft, direction);
    }
    if (direction === 'ArrowRight' && blockLeft + 165 < gameContainer.clientWidth) {
        dog_image.style.backgroundImage = 'url(./static/dogright.png)';
        // run(blockLeft, direction);
    }

    clearInterval(runInterval)
    runInterval = setInterval(() => { run(direction); }, 50)

}


function run(direction) {
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));

    console.log('run interval set', direction, blockLeft)
    if (direction === 'ArrowLeft') {
        // clearInterval(runInterval);
        console.log('direction detected -- left')
        if (blockLeft > 0) {
            block.style.left = blockLeft - 25 + 'px';
            blockLeft -= 25;
        } else {
            clearInterval(runInterval);
        }
    }
    if (direction === 'ArrowRight') {
        console.log('direction detected -- right')
        if (blockLeft + 165 < gameContainer.clientWidth) {
            console.log('moving', block.style.left)
            block.style.left = blockLeft + 25 + 'px';
            blockLeft += 25;
            console.log('moved', block.style.left);
        } else {
            clearInterval(runInterval);
            console.log('clear')
        }
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

    // console.log("createCircle")
    const fallInterval = setInterval(() => {
        // console.log("fallInterval")
        const circleTop = parseInt(window.getComputedStyle(circle).getPropertyValue('top'));
        if (isCircleOnBlock(circle, block) && !fail_status) {
            // console.log(fail_status)
            score++;
            updateScore();
        }

        if (circleTop + circle.clientHeight >= gameContainer.clientHeight || isCircleOnBlock(circle, block)) {
            clearInterval(fallInterval);
            gameContainer.removeChild(circle);
        }

        if (circleTop + circle.clientHeight + 5 >= gameContainer.clientHeight && !isCircleOnBlock(circle, block)) {
            clearInterval(fallInterval);
            gameContainer.removeChild(circle);

            if (fail_count <= 4) {
                let curr_life = lifearray[fail_count]

                curr_life.style.display = "none"
                fail_count++;

            }
            if (fail_count > 4) {
                clearInterval(runInterval)
                fail_alert.style.display = "block"
                fail_msg.style.display = "block"
                clearInterval(tID)
                fail_status = true;
            }

        }
        circle.style.top = circleTop + 5 + 'px';
    }, speed);
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


document.addEventListener('keydown', keyPressed);
if (!fail_status) {
    main_int = setInterval(createCircle, 1000);
} else { clearInterval(main_int) }

a
