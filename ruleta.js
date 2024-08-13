document.getElementById('spin').addEventListener('click', function() {
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    const degree = Math.floor(Math.random() * 360) + 3600; // Rotar 10 veces + un ángulo aleatorio
    const rotation = `rotate(${degree}deg)`;

    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    wheel.style.transform = rotation;

    // Determinar el ángulo final y el premio
    setTimeout(() => {
        const prizeIndex = Math.floor(((360 - (degree % 360)) / 360) * 6);
        const prizes = ['5% OFF', '10% OFF', '15% OFF', '20% OFF', '5% OFF', '10% OFF'];
        result.textContent = `¡Felicidades! Has ganado un descuento de ${prizes[prizeIndex]}`;
    }, 4000); // Después de la duración de la animación
});
