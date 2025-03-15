document.getElementById("openCard").addEventListener("click", function() {
    let message = document.getElementById("message");
    let openCardButton = document.getElementById("openCard");
    let punchMeButton = document.getElementById("punchMe");
    let confetti = document.getElementById("confetti");
    let balloonContainer = document.getElementById("balloon-container");
    let photoContainer = document.getElementById("photo-container");

    message.style.display = "block";
    openCardButton.style.display = "none";
    punchMeButton.style.display = "block";

    // Make Confetti, Balloons & Photos Visible
    confetti.style.opacity = "1";
    balloonContainer.style.opacity = "1";
    photoContainer.style.opacity = "1";

    startConfetti();
    playMusic();
    createBalloons();
    addPhotos();
    startFireworks(); // 🎆 Fireworks start AFTER button press!
});

function startFireworks() {
    const canvas = document.createElement("canvas");
    canvas.id = "fireworksCanvas";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let fireworks = [];

    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.particles = [];

            for (let i = 0; i < 50; i++) {
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    angle: Math.random() * (2 * Math.PI),
                    speed: Math.random() * 5 + 2,
                    opacity: 1
                });
            }
        }

        update() {
            this.particles.forEach(p => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                p.opacity -= 0.02;
            });

            this.particles = this.particles.filter(p => p.opacity > 0);
        }

        draw(ctx) {
            this.particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${p.opacity})`;
                ctx.fill();
            });
        }
    }

    function createFirework() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * (canvas.height / 2);
        let colors = [
            "255, 99, 71",
            "255, 215, 0",
            "30, 144, 255",
            "34, 139, 34",
            "255, 20, 147"
        ];
        let color = colors[Math.floor(Math.random() * colors.length)];
        fireworks.push(new Firework(x, y, color));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach(f => {
            f.update();
            f.draw(ctx);
        });

        fireworks = fireworks.filter(f => f.particles.length > 0);

        requestAnimationFrame(animate);
    }

    setInterval(createFirework, 1000);
    animate();
}




// Punch Me Button - Adds More Floating Photos
document.getElementById("punchMe").addEventListener("click", function() {
    for (let i = 0; i < 5; i++) {
        addPhotos();
    }
});

// Play Background Music
function playMusic() {
    let audio = document.getElementById("birthdaySong");
    audio.play();
}

// Create Confetti
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 5 + 2,
            d: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.d;
            if (p.y > canvas.height) p.y = 0;
        });
        requestAnimationFrame(draw);
    }
    
    draw();
}

// Create Balloons
function createBalloons() {
    const container = document.getElementById("balloon-container");

    for (let i = 0; i < 20; i++) {
        let balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.left = `${Math.random() * 100}%`;
        container.appendChild(balloon);
    }
}

// Function to add floating framed pictures without overlapping
function addPhotos() {
    const container = document.getElementById("photo-container");
    let photos = ["sreya1.jpg", "sreya2.jpg", "sreya3.jpg"]; // Add more images

    let numRows = 5; // Define rows
    let numCols = 5; // Define columns
    let cellWidth = window.innerWidth / numCols;
    let cellHeight = window.innerHeight / numRows;
    let usedCells = new Set();

    for (let i = 0; i < 10; i++) {
        let photo = document.createElement("div");
        photo.classList.add("photo-frame");
        photo.style.backgroundImage = `url(${photos[Math.floor(Math.random() * photos.length)]})`;

        let validPosition = false;
        let row, col, topPos, leftPos;

        // Find an empty grid cell
        while (!validPosition) {
            row = Math.floor(Math.random() * numRows);
            col = Math.floor(Math.random() * numCols);
            let cellKey = `${row}-${col}`;

            if (!usedCells.has(cellKey)) {
                usedCells.add(cellKey);
                validPosition = true;
                topPos = row * cellHeight + Math.random() * (cellHeight - 150);
                leftPos = col * cellWidth + Math.random() * (cellWidth - 150);
            }
        }

        photo.style.top = `${topPos}px`;
        photo.style.left = `${leftPos}px`;
        container.appendChild(photo);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("birthday-doodles");

    function createDoodle(type, count) {
        for (let i = 0; i < count; i++) {
            let doodle = document.createElement("div");
            doodle.classList.add(type);
            doodle.style.left = `${Math.random() * 100}vw`;
            doodle.style.animationDuration = `${Math.random() * 4 + 3}s`;
            container.appendChild(doodle);
        }
    }

    // Create different doodles
    createDoodle("balloon", 10);
    createDoodle("confetti", 30);
    createDoodle("cake", 3);
    createDoodle("gift", 5);
});

document.getElementById("openCard").addEventListener("click", function() {
    let message = document.getElementById("message");
    let openCardButton = document.getElementById("openCard");
    let punchMeButton = document.getElementById("punchMe");
    let bdayArrow = document.getElementById("bday-arrow"); // Get the arrow message

    message.classList.remove("hidden");
    message.style.display = "block";
    openCardButton.style.display = "none";
    punchMeButton.style.display = "block";
    
    bdayArrow.style.display = "none"; // Hides the arrow message

    startConfetti();
    playMusic();
    createBalloons();
    addPhotos();
});



