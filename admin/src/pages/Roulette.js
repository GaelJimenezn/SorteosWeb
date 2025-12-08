import { activeSorteos } from '../../../backend/services/data.js';

export default function Roulette() {
    window.spinRoulette = () => {
        const wheel = document.getElementById('roulette-wheel');
        const result = document.getElementById('roulette-result');

        // Reset
        wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        wheel.style.transform = 'rotate(0deg)';
        result.innerText = '...';

        // Spin
        setTimeout(() => {
            const randomRotation = 1080 + Math.floor(Math.random() * 360); // At least 3 spins
            wheel.style.transform = `rotate(${randomRotation}deg)`;

            // Show Result after spin
            setTimeout(() => {
                const winner = Math.floor(Math.random() * 100);
                result.innerText = `#${winner}`;
            }, 3000);
        }, 100);
    };

    return `
        <h2 class="mb-30">🎰 Realizar Sorteo</h2>
        <div class="module-card" style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
            <div class="form-group" style="max-width: 400px; margin: 0 auto 30px;">
                <label style="display:block; margin-bottom:10px; font-weight:bold;">Seleccionar Sorteo</label>
                <select class="form-input" style="width:100%; padding:10px;">
                    ${activeSorteos.map(s => `<option value="${s.id}">${s.titulo}</option>`).join('')}
                </select>
            </div>
            
            <div style="margin: 50px auto;">
                <div id="roulette-wheel" style="
                    width: 250px; 
                    height: 250px; 
                    border-radius: 50%; 
                    border: 15px solid var(--primary); 
                    margin: 0 auto 30px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 4rem; 
                    font-weight: bold; 
                    background: white; 
                    box-shadow: 0 0 30px rgba(0,0,0,0.1);
                    position: relative;
                ">
                    <span id="roulette-result">00</span>
                    <div style="
                        position: absolute; 
                        top: -25px; 
                        left: 50%; 
                        transform: translateX(-50%); 
                        width: 0; 
                        height: 0; 
                        border-left: 15px solid transparent; 
                        border-right: 15px solid transparent; 
                        border-top: 25px solid var(--accent);
                        z-index: 10;
                    "></div>
                </div>
                
                <button onclick="window.spinRoulette()" class="btn-primary" style="padding: 15px 40px; font-size: 1.2rem;">🎲 GIRAR</button>
                <p class="text-muted mt-20">El sistema seleccionará un boleto aleatorio de la base de datos.</p>
            </div>
        </div>
    `;
}
