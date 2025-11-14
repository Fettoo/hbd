particlesJS('particles-js', {
    "particles": { "number": {"value": 50}, "color": {"value": "#e94560"}, "shape": {"type": "image", "image": {"src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png", "width": 100, "height": 100}}, "opacity": {"value": 0.6, "random": true}, "size": {"value": 15, "random": true}, "line_linked": {"enable": false}, "move": {"enable": true, "speed": 1, "direction": "top", "out_mode": "out"}},
    "interactivity": {"events": {"onhover": {"enable": false}, "onclick": {"enable": false}}}, "retina_detect": true
});

document.addEventListener('DOMContentLoaded', () => {

    document.title = "Hadiah Spesial buat Sophie Grisella Olivia";

    const startButton = document.getElementById('startButton');
    const introDiv = document.getElementById('intro');
    const minigameContainer = document.getElementById('minigame-container');
    const cardDiv = document.querySelector('.card');
    const messageElement = document.getElementById('message');
    const gameArea = document.getElementById('game-area');
    const candleCounterElement = document.getElementById('candle-counter');
    const timerElement = document.getElementById('timer');
    const secretMessageElement = document.getElementById('secret-message');
    
    const backgroundMusic = document.getElementById('background-music');
    
    const candleCount = 24;
    let candlesOut = 0;
    const candles = [];
    let startTime, timerInterval;

    function enterFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    function setupGame() {
        for (let i = 0; i < candleCount; i++) {
            const candleElement = document.createElement('div');
            candleElement.className = 'candle';
            
            if (i === 0) {
                candleElement.classList.add('special');
            }
            
            const candleBody = document.createElement('div');
            candleBody.className = 'candle-body';
            const flame = document.createElement('div');
            flame.className = 'flame';
            
            candleElement.appendChild(candleBody);
            candleElement.appendChild(flame);
            gameArea.appendChild(candleElement);

            const candle = {
                element: candleElement,
                isSpecial: (i === 0),
                x: Math.random() * (window.innerWidth - 50),
                y: Math.random() * (window.innerHeight - 70),
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4
            };
            candles.push(candle);

            candleElement.addEventListener('click', () => {
                if (!candle.element.classList.contains('out')) {
                    if (candle.isSpecial) {
                        showSecretMessage();
                    }
                    extinguish(candle);
                }
            });
        }
        startTimer();
        gameLoop();
    }

    function showSecretMessage() {
        secretMessageElement.textContent = "I Love You! ❤️";
        secretMessageElement.classList.add('show');
        setTimeout(() => {
            secretMessageElement.classList.remove('show');
        }, 2000);
    }

    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
    }

    function extinguish(candle) {
        candle.element.classList.add('out');
        candlesOut++;
        updateCounter();
        if (candlesOut === candleCount) {
            clearInterval(timerInterval);
            triggerConfetti();
            const finalTime = (Date.now() - startTime) / 1000;
            setTimeout(() => startGameComplete(finalTime), 1200);
        }
    }
    
    function gameLoop() {
        candles.forEach(candle => {
            if (candle.element.classList.contains('out')) return;
            candle.x += candle.vx;
            candle.y += candle.vy;
            if (candle.x < 0 || candle.x > window.innerWidth - 30) candle.vx *= -1;
            if (candle.y < 0 || candle.y > window.innerHeight - 70) candle.vy *= -1;
            candle.element.style.left = candle.x + 'px';
            candle.element.style.top = candle.y + 'px';
        });
        requestAnimationFrame(gameLoop);
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
            timerElement.textContent = `Waktu: ${elapsedTime}s`;
        }, 100);
    }

    function updateCounter() {
        const remaining = candleCount - candlesOut;
        candleCounterElement.textContent = `Sisa Lilin: ${remaining}`;
    }

    function startGameComplete(finalTime) {
        minigameContainer.style.display = 'none';
        
        let finalMessages;
        if (finalTime <= 20.0) {
            finalMessages = [ 
                `Boleehhh, cuma ${finalTime.toFixed(1)} detik!`, 
                "Jago juga kalo cuman segini!", 
                "Selamat ulang tahun ke-24!",
                "Di hari spesial ini, aku cuma mau bilang kalo kamu itu luar biasa.",
                "Yang pertama aku seneng juga karena masih bisa kasih kejutan kecil buat kamu.",
                "Masih ga ada yang terlewat 1 pun hari spesial kamu.",
                "Aku tau harapanmu udah ga seperti dulu di hari ulang tahunmu,",
                "Tapi aku harap kamu tetap bisa bahagia hari ini, dan hari-hari selanjutnya.",
                "Di hari ulang tahunmu ini, semoga kamu selalu diberikan kesehatan,",
                "kebahagiaan, dan kesuksesan di segala hal yang kamu lakukan,",
                "semoga cita-citamu tercapai, dan impian kamu jadi kenyataan seiring berjalannya waktu.",
                "Semoga semakin dewasanya kamu, semakin bijak juga kamu dalam menghadapi segala hal.",
                "Pesanku, tetap pikirin hal-hal positif,",
                "jangan terlalu dipikirin hal-hal negatif,",
                "karena hidup ini terlalu singkat untuk disia-siakan dengan hal-hal yang tidak penting.",
                "Banyak hal yang lebih penting buat kamu prioritaskan,",
                "terutama kesehatan mental kamu, jaga itu baik-baik ya.",
                "Ingat ya, masih banyak orang yang sayang dan peduli sama kamu.",
                "Yauda itu aja sih, di hari spesial kamu ini.",
                "Maaf ya kalo aku blom bisa kasih yang lebih dari ini.",
                "Tapi aku harap kamu suka sama kejutan kecil ini.",
                "ini ku buat sendiri lohh jadi gada orang yang bikinin jago kan hehe. Buat kamu spesial.",
                "Ya next birthday ada hadiahnya aku double-in deh.",
                "Sekali lagi, selamat ulang tahun Sophie Grisella Olivia!",
                "Aku selalu ada buat kamu.",
                "Aku sayang kamu, lebih dari yang kamu tau.",
                "Love you always, - Fetto 🤟",
                "Happy Birthday Special Someone! Sophie Grisella Olivia 🎉" 
            ];
        } else {
            finalMessages = [ 
                `Waktumu ${finalTime.toFixed(1)} detik!`, 
                "Akhirnya selesai juga, hehe.", 
                "Selamat ulang tahun ke-24!", 
                "Di hari spesial ini, aku cuma mau bilang kalo kamu itu luar biasa.",
                "Yang pertama aku seneng juga karena masih bisa kasih kejutan kecil buat kamu.",
                "Masih ga ada yang terlewat 1 pun hari spesial kamu.",
                "Aku tau harapanmu udah ga seperti dulu di hari ulang tahunmu,",
                "Tapi aku harap kamu tetap bisa bahagia hari ini, dan hari-hari selanjutnya.",
                "Di hari ulang tahunmu ini, semoga kamu selalu diberikan kesehatan,",
                "kebahagiaan, dan kesuksesan di segala hal yang kamu lakukan,",
                "semoga cita-citamu tercapai, dan impian kamu jadi kenyataan seiring berjalannya waktu.",
                "Semoga semakin dewasanya kamu, semakin bijak juga kamu dalam menghadapi segala hal.",
                "Pesanku, tetap pikirin hal-hal positif,",
                "jangan terlalu dipikirin hal-hal negatif,",
                "karena hidup ini terlalu singkat untuk disia-siakan dengan hal-hal yang tidak penting.",
                "Banyak hal yang lebih penting buat kamu prioritaskan,",
                "terutama kesehatan mental kamu, jaga itu baik-baik ya.",
                "Ingat ya, masih banyak orang yang sayang dan peduli sama kamu.",
                "Yauda itu aja sih, di hari spesial kamu ini.",
                "Maaf ya kalo aku blom bisa kasih yang lebih dari ini.",
                "Tapi aku harap kamu suka sama kejutan kecil ini.",
                "ini ku buat sendiri lohh jadi gada orang yang bikinin jago kan hehe. Buat kamu spesial.",
                "Ya next birthday ada hadiahnya aku double-in deh.",
                "Sekali lagi, selamat ulang tahun Sophie Grisella Olivia!",
                "Aku selalu ada buat kamu.",
                "Aku sayang kamu, lebih dari yang kamu tau.",
                "Love you always, - Fetto 🤟",
                "Happy Birthday Special Someone! Sophie Grisella Olivia 🎉" 
            ];
        }
        
        startGreeting(finalMessages);
    }
    
    let messageIndex = 0;
    let messages = [];

    function startGreeting(finalMessages) {
        messages = finalMessages;
        cardDiv.style.display = 'flex';
        showNextMessage();
        setInterval(showNextMessage, 7500);
    }

    function showNextMessage() {
        if (messageIndex >= messages.length) return;
        messageElement.classList.remove('visible');
        setTimeout(() => {
            messageElement.innerHTML = messages[messageIndex];
            messageElement.classList.add('visible');
            messageIndex++;
        }, 600);
    }
    
    startButton.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            enterFullscreen();
        }

        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
        
        setupGame();
        introDiv.style.display = 'none';
        minigameContainer.style.display = 'block';
    });
});