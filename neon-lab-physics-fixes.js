// NEON LAB PHYSICS - FIXES CRÍTICOS v2.2
// Arreglar física, sistema de niveles y mensajes

// ========================================
// 1. FIXES DE FÍSICA
// ========================================

// Función mejorada para detectar colisiones
function checkCollisionImproved(particle, object) {
    if (!particle || !object) return false;
    
    const dx = particle.x - object.x;
    const dy = particle.y - object.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Radio de colisión más pequeño para evitar que se pegue
    const collisionRadius = Math.min(particle.radius, object.width / 2) * 0.8;
    
    return distance < collisionRadius;
}

// Función mejorada para rebotes
function handleBounceImproved(particle, object) {
    if (!particle || !object) return;
    
    // Calcular vector normal
    const dx = particle.x - object.x;
    const dy = particle.y - object.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return;
    
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Calcular velocidad relativa
    const vx = particle.vx;
    const vy = particle.vy;
    
    // Calcular velocidad después del rebote
    const dot = vx * nx + vy * ny;
    const newVx = vx - 2 * dot * nx;
    const newVy = vy - 2 * dot * ny;
    
    // Aplicar rebote con pérdida de energía
    particle.vx = newVx * 0.8;
    particle.vy = newVy * 0.8;
    
    // Separar la partícula del objeto para evitar que se pegue
    const separation = 2;
    particle.x = object.x + nx * (object.width / 2 + particle.radius + separation);
    particle.y = object.y + ny * (object.height / 2 + particle.radius + separation);
}

// ========================================
// 2. SISTEMA DE NIVELES MEJORADO
// ========================================

// Variable para controlar si el nivel está completado
let levelCompleted = false;

// Función mejorada para completar nivel
function completeLevel() {
    if (levelCompleted) return; // Evitar completar múltiples veces
    
    levelCompleted = true;
    
    // Mostrar mensaje de éxito
    showLevelCompleteMessage();
    
    // Deshabilitar el botón NEXT hasta que se complete
    const nextBtn = document.querySelector('.secondary');
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
    
    // Habilitar el botón NEXT después de 2 segundos
    setTimeout(() => {
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
            nextBtn.innerHTML = '➡️ SIGUIENTE NIVEL';
        }
    }, 2000);
}

// Función para mostrar mensaje de nivel completado
function showLevelCompleteMessage() {
    const modal = document.createElement('div');
    modal.className = 'level-complete-modal';
    modal.innerHTML = `
        <div class="level-complete-content">
            <h3>🎉 ¡NIVEL COMPLETADO!</h3>
            <p>¡Excelente trabajo! Has resuelto el puzzle.</p>
            <div class="celebration">✨��✨</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }, 3000);
}

// Función mejorada para detectar si la partícula llegó al objetivo
function checkTargetHit(particle, target) {
    if (!particle || !target) return false;
    
    const dx = particle.x - target.x;
    const dy = particle.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Radio de colisión más grande para el objetivo
    const targetRadius = Math.max(target.width / 2, target.height / 2) * 1.2;
    
    return distance < targetRadius;
}

// ========================================
// 3. MENSAJES DE MUERTE MEJORADOS
// ========================================

// Función mejorada para mostrar mensaje de muerte
function showDeathMessage() {
    const modal = document.createElement('div');
    modal.className = 'death-modal';
    modal.innerHTML = `
        <div class="death-content">
            <h3>�� ¡PARTÍCULA PERDIDA!</h3>
            <p>La partícula se ha perdido en el espacio. ¡Inténtalo de nuevo!</p>
            <div class="death-options">
                <button onclick="restartLevel()" class="btn restart-btn">🔄 REINTENTAR</button>
                <button onclick="showMenu()" class="btn menu-btn">🏠 MENÚ</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Función para reiniciar el nivel
function restartLevel() {
    const modal = document.querySelector('.death-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    // Reiniciar el nivel
    loadLevel(gameState.currentLevel);
    levelCompleted = false;
}

// Función para volver al menú
function showMenu() {
    const modal = document.querySelector('.death-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    // Mostrar menú principal
    document.getElementById('menu-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
}

// ========================================
// 4. SHARING VIRAL SIMPLE
// ========================================

function shareSolution() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    
    // Capturar momento épico
    captureNeonLabMoment();
    
    // Mostrar modal de sharing
    showNeonLabShareModal(level, score);
}

function captureNeonLabMoment() {
    // Crear canvas temporal para captura
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 600;
    
    // Fondo degradado épico
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#FF0080');
    gradient.addColorStop(0.5, '#00FFFF');
    gradient.addColorStop(1, '#8000FF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);
    
    // Texto épico
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEON LAB PHYSICS', 200, 100);
    
    ctx.font = 'bold 48px Arial';
    ctx.fillText(`NIVEL ${gameState.currentLevel || 1}`, 200, 200);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillText('¡PUZZLE RESUELTO!', 200, 250);
    
    ctx.font = 'bold 20px Arial';
    ctx.fillText('¿Puedes resolverlo?', 200, 300);
    
    // Convertir a imagen
    const dataURL = canvas.toDataURL('image/png');
    
    // Descargar automáticamente
    const link = document.createElement('a');
    link.download = `neon-lab-level-${gameState.currentLevel || 1}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
}

function showNeonLabShareModal(level, score) {
    const modal = document.createElement('div');
    modal.className = 'neon-lab-share-modal';
    modal.innerHTML = `
        <div class="neon-lab-share-content">
            <h3>🧪 ¡PUZZLE RESUELTO!</h3>
            <div class="score-display">
                <div class="score-number">NIVEL ${level}</div>
                <div class="score-label">COMPLETADO</div>
                <div class="level-badge">¡EXCELENTE!</div>
            </div>
            <p>¡Comparte tu solución y desafía a tus amigos!</p>
            <div class="share-buttons">
                <button onclick="shareToTwitter(${level})" class="share-btn twitter">🐦 Twitter</button>
                <button onclick="shareToFacebook(${level})" class="share-btn facebook">📘 Facebook</button>
                <button onclick="shareToWhatsApp(${level})" class="share-btn whatsapp">💬 WhatsApp</button>
                <button onclick="shareToInstagram(${level})" class="share-btn instagram">📷 Instagram</button>
            </div>
            <button onclick="closeNeonLabShareModal()" class="close-btn">✕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function shareToTwitter(level) {
    const text = `🧪 ¡Acabo de resolver el nivel ${level} en Neon Lab Physics! ¿Puedes resolverlo? #NeonLabPhysics #PuzzleGame #Gaming`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    closeNeonLabShareModal();
}

function shareToFacebook(level) {
    const text = `🧪 ¡Mira mi solución del nivel ${level} en Neon Lab Physics!`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    closeNeonLabShareModal();
}

function shareToWhatsApp(level) {
    const text = `🧪 ¡Acabo de resolver el nivel ${level} en Neon Lab Physics! ¿Puedes resolverlo?`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    closeNeonLabShareModal();
}

function shareToInstagram(level) {
    const modal = document.createElement('div');
    modal.className = 'instagram-modal';
    modal.innerHTML = `
        <div class="instagram-content">
            <h3>📷 Compartir en Instagram</h3>
            <p>1. La imagen épica se ha descargado</p>
            <p>2. Abre Instagram Stories</p>
            <p>3. Sube la imagen</p>
            <p>4. Añade el hashtag #NeonLabPhysics</p>
            <p>5. Desafía a tus amigos: "¿Pueden resolver el nivel ${level}?"</p>
            <button onclick="closeInstagramModal()" class="btn">✅ Entendido</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closeNeonLabShareModal() {
    const modal = document.querySelector('.neon-lab-share-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function closeInstagramModal() {
    const modal = document.querySelector('.instagram-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 5. ESTILOS CSS MEJORADOS
// ========================================

const neonLabStyles = `
<style>
/* Modales de nivel completado y muerte */
.level-complete-modal, .death-modal, .neon-lab-share-modal, .instagram-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
}

.level-complete-modal.show, .death-modal.show, .neon-lab-share-modal.show, .instagram-modal.show {
    opacity: 1;
}

.level-complete-content, .death-content, .neon-lab-share-content, .instagram-content {
    background: linear-gradient(135deg, #FF0080, #00FFFF, #8000FF);
    padding: 2rem;
    border-radius: 25px;
    text-align: center;
    color: white;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.celebration {
    font-size: 2rem;
    margin: 1rem 0;
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.death-options {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.restart-btn, .menu-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
}

.restart-btn {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
}

.menu-btn {
    background: linear-gradient(45deg, #666, #999);
    color: white;
}

.restart-btn:hover, .menu-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.score-display {
    background: rgba(0,0,0,0.3);
    padding: 2rem;
    border-radius: 20px;
    margin: 1.5rem 0;
    border: 3px solid white;
}

.score-number {
    font-size: 3rem;
    font-weight: bold;
    color: #00FFFF;
    text-shadow: 0 0 20px #00FFFF;
}

.score-label {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
}

.level-badge {
    background: linear-gradient(45deg, #FF0080, #8000FF);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    display: inline-block;
    margin-top: 1rem;
}

.share-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 2rem 0;
}

.share-btn {
    padding: 1.2rem;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.share-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.share-btn.twitter { background: #1da1f2; }
.share-btn.facebook { background: #4267b2; }
.share-btn.whatsapp { background: #25d366; }
.share-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
}

.close-btn:hover {
    opacity: 1;
}
</style>
`;

// Inyectar estilos mejorados
document.head.insertAdjacentHTML('beforeend', neonLabStyles);
