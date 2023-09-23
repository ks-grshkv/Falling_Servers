    const block = document.getElementById('block');
    const results = document.getElementById('results');
        const gameContainer = document.getElementById('game-container');
        let score = 0;

        function moveBlock(event) {
            const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            if (event.key === 'ArrowLeft' && blockLeft > 0) {
                block.style.left = blockLeft - 10 + 'px';
            }
            if (event.key === 'ArrowRight' && blockLeft + 50 < gameContainer.clientWidth) {
                block.style.left = blockLeft + 10 + 'px';
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

                if (circleTop + 20 >= gameContainer.clientHeight || isCircleOnBlock(circle, block)) {
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