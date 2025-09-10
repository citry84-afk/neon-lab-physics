// NEON LAB - OPTIMIZACIONES PHYSICS PUZZLE VIRAL
// v2.0 - Puzzle Game Revenue Optimization

// ========================================
// 1. VIRAL FEATURES ESPECÍFICAS PARA PUZZLE
// ========================================

// Captura automática de soluciones épicas para TikTok/Instagram
function capturePuzzleSolution() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL('image/png');
    
    // Crear elemento temporal para descarga
    const link = document.createElement('a');
    link.download = `neon-lab-solution-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    // Mostrar prompt de sharing específico para puzzle
    showPuzzleSharePrompt();
}

// Prompt de sharing específico para puzzle y soluciones
function showPuzzleSharePrompt() {
    const modal = document.createElement('div');
    modal.className = 'puzzle-share-modal';
    modal.innerHTML = `
        <div class="puzzle-share-content">
            <h3>🧪 ¡Solución Épica Capturada!</h3>
            <p>¡Comparte tu solución creativa en redes sociales!</p>
            <div class="puzzle-social-buttons">
                <button onclick="shareToTikTokPuzzle()" class="puzzle-social-btn tiktok">🎵 TikTok</button>
                <button onclick="shareToInstagramPuzzle()" class="puzzle-social-btn instagram">📷 Instagram</button>
                <button onclick="shareToYouTubePuzzle()" class="puzzle-social-btn youtube">🎥 YouTube</button>
                <button onclick="shareToFacebookPuzzle()" class="puzzle-social-btn facebook">📘 Facebook</button>
                <button onclick="shareToTwitterPuzzle()" class="puzzle-social-btn twitter">🐦 X (Twitter)</button>
            </div>
            <div class="puzzle-hashtag-suggestions">
                <h4>Hashtags Puzzle sugeridos:</h4>
                <div class="puzzle-hashtags">
                    <span class="puzzle-hashtag">#NeonLab</span>
                    <span class="puzzle-hashtag">#PhysicsPuzzle</span>
                    <span class="puzzle-hashtag">#PuzzleGame</span>
                    <span class="puzzle-hashtag">#BrainTeaser</span>
                    <span class="puzzle-hashtag">#PuzzleChallenge</span>
                    <span class="puzzle-hashtag">#LIPAStudios</span>
                </div>
            </div>
            <div class="puzzle-challenge-prompt">
                <h4>🎯 Challenge Puzzle:</h4>
                <p>¿Puedes resolver el nivel ${gameState.currentLevel || 1}? ¡Demuéstralo!</p>
            </div>
            <button onclick="closePuzzleShareModal()" class="close-btn">✕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Sharing específico para TikTok con temática puzzle
function shareToTikTokPuzzle() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    const text = `🧪 ¡Acabo de resolver el nivel ${level} en Neon Lab! ¿Puedes superar mi solución? #NeonLab #PhysicsPuzzle #PuzzleChallenge #TikTokGaming`;
    const url = window.location.href;
    
    // Abrir TikTok con el texto pre-formateado
    const shareUrl = `https://www.tiktok.com/upload?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    // Tracking específico para puzzle
    window.trackEvent('tiktok_puzzle_share_attempt', {
        level: level,
        score: score,
        game_type: 'physics_puzzle'
    });
    
    closePuzzleShareModal();
}

// Sharing específico para Instagram con temática puzzle
function shareToInstagramPuzzle() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    
    // Crear imagen optimizada para Instagram Stories con temática puzzle
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        
        // Crear imagen con overlay para Instagram Stories
        const img = new Image();
        img.onload = function() {
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            
            // Tamaño optimizado para Instagram Stories (1080x1920)
            canvas2.width = 1080;
            canvas2.height = 1920;
            
            // Dibujar el juego escalado
            ctx2.drawImage(img, 0, 0, 1080, 1920);
            
            // Añadir overlay con temática puzzle
            ctx2.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx2.fillRect(0, 0, 1080, 1920);
            
            // Título puzzle
            ctx2.fillStyle = '#00FFFF';
            ctx2.font = 'bold 80px Arial';
            ctx2.textAlign = 'center';
            ctx2.fillText(`🧪 PUZZLE SOLVED`, 540, 600);
            
            // Estadísticas
            ctx2.fillStyle = '#FF0080';
            ctx2.font = 'bold 60px Arial';
            ctx2.fillText(`Level: ${level}`, 540, 800);
            ctx2.fillText(`Score: ${score}`, 540, 900);
            
            // Hashtags
            ctx2.fillStyle = '#FFD700';
            ctx2.font = 'bold 40px Arial';
            ctx2.fillText(`#NeonLab`, 540, 1100);
            ctx2.fillText(`#PhysicsPuzzle`, 540, 1200);
            ctx2.fillText(`#PuzzleChallenge`, 540, 1300);
            
            // Descargar imagen optimizada
            const link = document.createElement('a');
            link.download = `neon-lab-puzzle-instagram-${Date.now()}.png`;
            link.href = canvas2.toDataURL('image/png');
            link.click();
        };
        img.src = dataURL;
    }
    
    // Mostrar instrucciones para Instagram
    showPuzzleInstagramInstructions();
}

function showPuzzleInstagramInstructions() {
    const modal = document.createElement('div');
    modal.className = 'puzzle-instagram-instructions-modal';
    modal.innerHTML = `
        <div class="puzzle-instagram-instructions-content">
            <h3>📷 Compartir en Instagram</h3>
            <div class="puzzle-steps">
                <div class="puzzle-step">
                    <span class="puzzle-step-number">1</span>
                    <p>La imagen de solución se ha descargado</p>
                </div>
                <div class="puzzle-step">
                    <span class="puzzle-step-number">2</span>
                    <p>Abre Instagram Stories</p>
                </div>
                <div class="puzzle-step">
                    <span class="puzzle-step-number">3</span>
                    <p>Sube la imagen descargada</p>
                </div>
                <div class="puzzle-step">
                    <span class="puzzle-step-number">4</span>
                    <p>Añade los hashtags: #NeonLab #PhysicsPuzzle #PuzzleChallenge</p>
                </div>
                <div class="puzzle-step">
                    <span class="puzzle-step-number">5</span>
                    <p>¡Etiqueta a tus amigos para el challenge!</p>
                </div>
            </div>
            <button onclick="closePuzzleInstagramInstructions()" class="btn">✅ Entendido</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

// Sharing específico para YouTube con temática puzzle
function shareToYouTubePuzzle() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    const text = `🧪 ¡Increíble solución del nivel ${level} en Neon Lab! ¿Puedes superar mi puzzle? #NeonLab #PhysicsPuzzle #PuzzleChallenge #YouTubeGaming`;
    const url = window.location.href;
    
    // Abrir YouTube con el texto pre-formateado
    const shareUrl = `https://www.youtube.com/upload?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    closePuzzleShareModal();
}

// Sharing específico para Facebook con temática puzzle
function shareToFacebookPuzzle() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    const text = `🧪 ¡Acabo de resolver el nivel ${level} en Neon Lab! ¿Puedes superar mi solución? ¡Únete al challenge!`;
    const url = window.location.href;
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    
    closePuzzleShareModal();
}

// Sharing específico para X (Twitter) con temática puzzle
function shareToTwitterPuzzle() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    const text = `🧪 ¡Solución del nivel ${level} en Neon Lab! ¿Puedes superar mi puzzle? #NeonLab #PhysicsPuzzle #PuzzleChallenge #XGaming`;
    const url = window.location.href;
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
    
    closePuzzleShareModal();
}

function closePuzzleShareModal() {
    const modal = document.querySelector('.puzzle-share-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function closePuzzleInstagramInstructions() {
    const modal = document.querySelector('.puzzle-instagram-instructions-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 2. RETENCIÓN & ENGAGEMENT ESPECÍFICO PARA PUZZLE
// ========================================

// Sistema de logros específico para physics puzzle
const puzzleAchievements = {
    firstPuzzle: { unlocked: false, name: "Primer Puzzle", reward: 100, description: "Resuelve tu primer puzzle" },
    fivePuzzles: { unlocked: false, name: "5 Puzzles", reward: 200, description: "Resuelve 5 puzzles" },
    tenPuzzles: { unlocked: false, name: "10 Puzzles", reward: 500, description: "Resuelve 10 puzzles" },
    twentyPuzzles: { unlocked: false, name: "20 Puzzles", reward: 1000, description: "Resuelve 20 puzzles" },
    perfectSolution: { unlocked: false, name: "Solución Perfecta", reward: 800, description: "Resuelve un puzzle sin hints" },
    speedSolver: { unlocked: false, name: "Solucionador Rápido", reward: 600, description: "Resuelve un puzzle en menos de 30 segundos" },
    creativeSolver: { unlocked: false, name: "Solucionador Creativo", reward: 1200, description: "Resuelve un puzzle de forma creativa" },
    masterSolver: { unlocked: false, name: "Maestro Solucionador", reward: 2000, description: "Resuelve 50 puzzles" }
};

// Sistema de power-ups específico para physics puzzle
const puzzlePowerUps = {
    hint: { name: "Hint", cost: 150, description: "Muestra una pista para resolver el puzzle" },
    undo: { name: "Deshacer", cost: 100, description: "Deshace el último movimiento" },
    reset: { name: "Reiniciar", cost: 200, description: "Reinicia el puzzle actual" },
    solution: { name: "Solución", cost: 500, description: "Muestra la solución completa" },
    extraTime: { name: "Tiempo Extra", cost: 300, description: "Añade 30 segundos al timer" },
    skip: { name: "Saltar", cost: 800, description: "Salta al siguiente nivel" }
};

// Monedas del juego puzzle
let puzzleCoins = parseInt(localStorage.getItem('neonLabPuzzleCoins') || '0');

// Mostrar notificación de logro puzzle
function showPuzzleAchievement(achievement) {
    const notification = document.createElement('div');
    notification.className = 'puzzle-achievement-notification';
    notification.innerHTML = `
        <div class="puzzle-achievement-content">
            <div class="puzzle-achievement-icon">🧪</div>
            <div class="puzzle-achievement-text">
                <h4>¡Logro Puzzle Desbloqueado!</h4>
                <p>${achievement.name}</p>
                <span class="puzzle-reward">+${achievement.reward} monedas</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Añadir monedas
    puzzleCoins += achievement.reward;
    localStorage.setItem('neonLabPuzzleCoins', puzzleCoins.toString());
    updatePuzzleCoinsDisplay();
}

// Verificar logros específicos del physics puzzle
function checkPuzzleAchievements() {
    const level = gameState.currentLevel || 1;
    const score = gameState.score || 0;
    const hintsUsed = gameState.hintsUsed || 0;
    
    if (level >= 1 && !puzzleAchievements.firstPuzzle.unlocked) {
        puzzleAchievements.firstPuzzle.unlocked = true;
        showPuzzleAchievement(puzzleAchievements.firstPuzzle);
    }
    
    if (level >= 5 && !puzzleAchievements.fivePuzzles.unlocked) {
        puzzleAchievements.fivePuzzles.unlocked = true;
        showPuzzleAchievement(puzzleAchievements.fivePuzzles);
    }
    
    if (level >= 10 && !puzzleAchievements.tenPuzzles.unlocked) {
        puzzleAchievements.tenPuzzles.unlocked = true;
        showPuzzleAchievement(puzzleAchievements.tenPuzzles);
    }
    
    if (level >= 20 && !puzzleAchievements.twentyPuzzles.unlocked) {
        puzzleAchievements.twentyPuzzles.unlocked = true;
        showPuzzleAchievement(puzzleAchievements.twentyPuzzles);
    }
    
    if (hintsUsed === 0 && level > 1 && !puzzleAchievements.perfectSolution.unlocked) {
        puzzleAchievements.perfectSolution.unlocked = true;
        showPuzzleAchievement(puzzleAchievements.perfectSolution);
    }
}

// ========================================
// 3. MONETIZACIÓN MEJORADA PARA PUZZLE VIRAL
// ========================================

// Reward ads para power-ups de puzzle
function showPuzzleRewardAd(powerUpType, callback) {
    const modal = document.createElement('div');
    modal.className = 'puzzle-reward-ad-modal';
    modal.innerHTML = `
        <div class="puzzle-reward-ad-content">
            <h3>🎬 Ver Anuncio para ${puzzlePowerUps[powerUpType].name}</h3>
            <p>Mira un anuncio de 30 segundos para obtener este power-up gratis</p>
            <div class="puzzle-ad-simulation">
                <div class="puzzle-ad-video">
                    <div class="puzzle-ad-progress"></div>
                    <p>Anuncio en reproducción...</p>
                    <div class="puzzle-ad-brand">LIPA Studios - Puzzle Gaming</div>
                </div>
            </div>
            <button onclick="completePuzzleRewardAd('${powerUpType}', ${callback})" class="btn">✅ Obtener Power-up</button>
            <button onclick="closePuzzleRewardAd()" class="btn secondary">❌ Cancelar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Simular progreso del anuncio
    const progressBar = modal.querySelector('.puzzle-ad-progress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            modal.querySelector('button').disabled = false;
        }
    }, 100);
}

function completePuzzleRewardAd(powerUpType, callback) {
    if (callback) callback();
    
    const modal = document.querySelector('.puzzle-reward-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    showPuzzleNotification(`¡${puzzlePowerUps[powerUpType].name} activado!`, 'success');
}

function closePuzzleRewardAd() {
    const modal = document.querySelector('.puzzle-reward-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Interstitial ads para puzzle
function showPuzzleInterstitialAd() {
    const lastAdTime = parseInt(localStorage.getItem('lastPuzzleInterstitialAd') || '0');
    const currentTime = Date.now();
    const adInterval = 4 * 60 * 1000; // 4 minutos (puzzles tardan más)
    
    if (currentTime - lastAdTime > adInterval) {
        const modal = document.createElement('div');
        modal.className = 'puzzle-interstitial-ad-modal';
        modal.innerHTML = `
            <div class="puzzle-interstitial-ad-content">
                <h3>📺 Anuncio Puzzle</h3>
                <div class="puzzle-ad-banner">
                    <p>Anuncio de 30 segundos</p>
                    <div class="puzzle-ad-timer">30</div>
                    <div class="puzzle-ad-brand">LIPA Studios - Puzzle Gaming</div>
                </div>
                <button onclick="closePuzzleInterstitialAd()" class="btn">Continuar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Timer del anuncio
        let timeLeft = 30;
        const timer = setInterval(() => {
            timeLeft--;
            modal.querySelector('.puzzle-ad-timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                modal.querySelector('button').disabled = false;
            }
        }, 1000);
        
        localStorage.setItem('lastPuzzleInterstitialAd', currentTime.toString());
    }
}

function closePuzzleInterstitialAd() {
    const modal = document.querySelector('.puzzle-interstitial-ad-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========================================
// 4. UI MEJORADA PARA PUZZLE
// ========================================

// Actualizar display de monedas puzzle
function updatePuzzleCoinsDisplay() {
    let coinsDisplay = document.getElementById('puzzleCoinsDisplay');
    if (!coinsDisplay) {
        coinsDisplay = document.createElement('div');
        coinsDisplay.id = 'puzzleCoinsDisplay';
        coinsDisplay.className = 'puzzle-coins-display';
        document.querySelector('.ui').appendChild(coinsDisplay);
    }
    coinsDisplay.innerHTML = `🧪 ${puzzleCoins}`;
}

// Mostrar notificación puzzle
function showPuzzleNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `puzzle-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// 5. ESTILOS CSS ESPECÍFICOS PARA PUZZLE
// ========================================

const puzzleStyles = `
<style>
/* Modales de sharing para puzzle */
.puzzle-share-modal, .puzzle-instagram-instructions-modal, .puzzle-reward-ad-modal, .puzzle-interstitial-ad-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
}

.puzzle-share-modal.show, .puzzle-instagram-instructions-modal.show, .puzzle-reward-ad-modal.show, .puzzle-interstitial-ad-modal.show {
    opacity: 1;
}

.puzzle-share-content, .puzzle-instagram-instructions-content, .puzzle-reward-ad-content, .puzzle-interstitial-ad-content {
    background: linear-gradient(135deg, #00FFFF, #FF0080, #FFD700);
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
    max-width: 600px;
    width: 90%;
    position: relative;
    animation: puzzlePulse 2s infinite;
}

@keyframes puzzlePulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

.puzzle-social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
}

.puzzle-social-btn {
    padding: 1rem;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
    animation: puzzleBounce 1s infinite;
}

@keyframes puzzleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.puzzle-social-btn:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.puzzle-social-btn.tiktok { background: #000; color: white; }
.puzzle-social-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; }
.puzzle-social-btn.youtube { background: #FF0000; color: white; }
.puzzle-social-btn.facebook { background: #4267b2; color: white; }
.puzzle-social-btn.twitter { background: #1da1f2; color: white; }

.puzzle-hashtag-suggestions {
    margin: 1.5rem 0;
    text-align: left;
}

.puzzle-hashtag-suggestions h4 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #FFD700;
}

.puzzle-hashtags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.puzzle-hashtag {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.puzzle-hashtag:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.puzzle-challenge-prompt {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 15px;
    margin: 1.5rem 0;
    border: 2px solid #FFD700;
}

.puzzle-challenge-prompt h4 {
    color: #FFD700;
    margin-bottom: 0.5rem;
}

.puzzle-instructions .puzzle-steps {
    text-align: left;
    margin: 1.5rem 0;
}

.puzzle-step {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
}

.puzzle-step-number {
    background: #00FFFF;
    color: #000;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
}

/* Display de monedas puzzle */
.puzzle-coins-display {
    position: fixed;
    top: 20px;
    left: 20px;
    background: linear-gradient(135deg, #00FFFF, #FF0080);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    z-index: 100;
    font-size: 1.1rem;
    animation: puzzleGlow 2s infinite;
}

@keyframes puzzleGlow {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.8); }
}

/* Notificaciones de logros puzzle */
.puzzle-achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00FFFF, #FF0080, #FFD700);
    color: white;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s;
    max-width: 350px;
    animation: puzzleSlideIn 0.5s ease-out;
}

@keyframes puzzleSlideIn {
    0% { transform: translateX(100%) scale(0.8); }
    100% { transform: translateX(0) scale(1); }
}

.puzzle-achievement-notification.show {
    transform: translateX(0);
}

.puzzle-achievement-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.puzzle-achievement-icon {
    font-size: 2.5rem;
    animation: puzzleSpin 1s infinite;
}

@keyframes puzzleSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.puzzle-achievement-text h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: #FFD700;
}

.puzzle-achievement-text p {
    margin: 0 0 0.5rem 0;
    font-weight: bold;
    font-size: 1.1rem;
}

.puzzle-reward {
    color: #FFD700;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

/* Anuncios simulados puzzle */
.puzzle-ad-simulation {
    background: #000;
    border-radius: 20px;
    padding: 2rem;
    margin: 1.5rem 0;
    border: 2px solid #00FFFF;
}

.puzzle-ad-progress {
    height: 8px;
    background: #333;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.puzzle-ad-progress::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #00FFFF, #FF0080, #FFD700);
    width: 0%;
    transition: width 0.1s;
    animation: puzzleProgress 0.5s ease-in-out;
}

@keyframes puzzleProgress {
    0% { width: 0%; }
    100% { width: 100%; }
}

.puzzle-ad-brand {
    font-size: 1rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    color: #FFD700;
    font-weight: bold;
}

.puzzle-ad-banner {
    background: linear-gradient(135deg, #000, #333);
    color: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    margin: 1.5rem 0;
    border: 2px solid #00FFFF;
}

.puzzle-ad-timer {
    font-size: 3rem;
    font-weight: bold;
    color: #00FFFF;
    margin: 1rem 0;
    animation: puzzleCountdown 1s infinite;
}

@keyframes puzzleCountdown {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s;
}

.close-btn:hover {
    transform: scale(1.2);
    color: #00FFFF;
}

/* Notificaciones generales puzzle */
.puzzle-notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 20px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
    font-weight: bold;
    border: 2px solid #00FFFF;
}

.puzzle-notification.show {
    opacity: 1;
}

.puzzle-notification.success { background: linear-gradient(135deg, #00FF00, #00CC00); }
.puzzle-notification.error { background: linear-gradient(135deg, #FF0000, #CC0000); }
.puzzle-notification.warning { background: linear-gradient(135deg, #FFD700, #FFA500); }
</style>
`;

// Inyectar estilos específicos para puzzle
document.head.insertAdjacentHTML('beforeend', puzzleStyles);
