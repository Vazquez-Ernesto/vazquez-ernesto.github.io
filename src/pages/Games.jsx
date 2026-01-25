import { useState, useEffect } from 'react'
import '../styles/games.css'

function Games() {
  const [currentGame, setCurrentGame] = useState('menu')
  const [quizScore, setQuizScore] = useState(0)        // Puntaje solo del quiz
  const [mineSweeperScore, setMineSweeperScore] = useState(0)  // Puntaje solo del buscaminas
  const [totalScore, setTotalScore] = useState(0)      // Puntaje total combinado
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [certificate, setCertificate] = useState(null)
  const [notification, setNotification] = useState(null)

  // Estado del Buscaminas QA
  const [mineSweeperBoard, setMineSweeperBoard] = useState([])
  const [revealedCells, setRevealedCells] = useState(new Set())
  const [flaggedCells, setFlaggedCells] = useState(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [startTime, setStartTime] = useState(null)

  // Quiz questions
  const quizQuestions = [
    {
      question: "¿Cuál es la diferencia entre testing funcional y no funcional?",
      options: [
        "Funcional prueba qué hace el software, no funcional prueba cómo lo hace",
        "Funcional es manual, no funcional es automático",
        "Funcional prueba código, no funcional prueba UI",
        "No hay diferencia, son lo mismo"
      ],
      correct: 0,
      explanation: "El testing funcional verifica QUÉ hace el software (funcionalidades), mientras que el no funcional verifica CÓMO lo hace (rendimiento, seguridad, usabilidad)."
    },
    {
      question: "¿Qué framework NO es para testing E2E?",
      options: ["Cypress", "Playwright", "Jest", "Selenium"],
      correct: 2,
      explanation: "Jest es un framework de testing unitario, no E2E. Cypress, Playwright y Selenium son frameworks E2E."
    },
    {
      question: "¿Cuál es el código HTTP para 'No autorizado'?",
      options: ["400", "401", "403", "404"],
      correct: 1,
      explanation: "401 Unauthorized indica que la solicitud requiere autenticación del usuario."
    },
    {
      question: "¿Qué tipo de testing verifica la integración entre módulos?",
      options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
      correct: 1,
      explanation: "Integration Testing verifica cómo interactúan los diferentes módulos/componentes del sistema."
    },
    {
      question: "¿Cuál NO es una buena práctica en testing?",
      options: [
        "Escribir tests antes del código (TDD)",
        "Usar datos de prueba realistas",
        "Probar solo casos positivos",
        "Automatizar tests repetitivos"
      ],
      correct: 2,
      explanation: "Debes probar tanto casos positivos como negativos, edge cases y casos de error."
    }
  ]

  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  // Timer effect
  useEffect(() => {
    if (currentGame === 'quiz' && timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, currentGame, gameCompleted])

  // Detectar cuando se completa un juego y generar certificado
  useEffect(() => {
    if (totalScore > 0 && !gameCompleted) {
      generateCertificate()
    }
  }, [totalScore, gameCompleted])

  // Función de sonidos mejorada
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'hover') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      } else if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      } else if (type === 'incorrect') {
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      } else if (type === 'checkmark') {
        // Sonido para encontrar checkmark
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1046, audioContext.currentTime + 0.1);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      } else if (type === 'gameOver') {
        // Sonido de game over
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      }
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + (type === 'correct' ? 0.4 : 0.3));
    } catch (error) {
      console.log('Audio no disponible');
    }
  }

  // Función para mostrar notificaciones
  const showBugNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 2500)
  }

  // Inicializar Buscaminas QA
  const initializeMineSweeper = () => {
    const boardSize = 8
    const totalCells = boardSize * boardSize
    const bugCount = 10
    const checkmarkCount = 15
    
    // Crear board vacío (sin emojis iniciales)
    const board = Array(boardSize).fill().map(() => Array(boardSize).fill({ type: 'empty' }))

    // Colocar bugs (sin emojis)
    let bugsPlaced = 0
    while (bugsPlaced < bugCount) {
      const row = Math.floor(Math.random() * boardSize)
      const col = Math.floor(Math.random() * boardSize)
      if (board[row][col].type === 'empty') {
        board[row][col] = { type: 'bug' }
        bugsPlaced++
      }
    }

    // Colocar checkmarks (sin emojis)
    let checkmarksPlaced = 0
    while (checkmarksPlaced < checkmarkCount) {
      const row = Math.floor(Math.random() * boardSize)
      const col = Math.floor(Math.random() * boardSize)
      if (board[row][col].type === 'empty') {
        board[row][col] = { type: 'checkmark' }
        checkmarksPlaced++
      }
    }
    
    setMineSweeperBoard(board)
    setRevealedCells(new Set())
    setFlaggedCells(new Set())
    setGameOver(false)
    setGameWon(false)
    setMineSweeperScore(0)
    setStartTime(Date.now())
  }

  const startQuiz = () => {
    setCurrentGame('quiz')
    setQuizScore(0)  // Reset solo el puntaje del quiz
    setTimeLeft(30)
    setCurrentQuizQuestion(0)
    setGameCompleted(false)
    setCertificate(null)
  }

  const startMineSweeper = () => {
    setCurrentGame('minesweeper')
    setMineSweeperScore(0)  // Reset solo el puntaje del buscaminas
    initializeMineSweeper()
  }

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === quizQuestions[currentQuizQuestion].correct) {
      playSound('correct')
      const timeBonus = timeLeft * 10
      const correctBonus = 100
      setQuizScore(prev => prev + correctBonus + timeBonus)
    } else {
      playSound('incorrect')
    }
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setTimeLeft(30)
      } else {
        // Al terminar el quiz, añadir el puntaje del quiz al total
        setTotalScore(prev => prev + quizScore + (timeLeft * 10) + 100)
      }
    }, 3000)
  }

  const handleCellClick = (row, col) => {
    if (gameOver || gameWon) return
    
    const cellKey = `${row}-${col}`
    
    if (revealedCells.has(cellKey)) return
    
    const newRevealed = new Set(revealedCells)
    newRevealed.add(cellKey)
    setRevealedCells(newRevealed)
    
    const cell = mineSweeperBoard[row][col]
    
    if (cell.type === 'bug') {
      playSound('gameOver')
      setGameOver(true)
      showBugNotification('💥 ¡Activaste un bug! Juego terminado', 'error')
    } else if (cell.type === 'checkmark') {
      playSound('checkmark')
      setMineSweeperScore(prev => prev + 100)
      showBugNotification('✅ ¡Checkmark encontrado! +100 puntos', 'success')
      
      // Verificar si ganó (encontró todos los checkmarks)
      const totalCheckmarks = mineSweeperBoard.flat().filter(cell => cell.type === 'checkmark').length
      const foundCheckmarks = Array.from(newRevealed).filter(key => {
        const [r, c] = key.split('-').map(Number)
        return mineSweeperBoard[r][c].type === 'checkmark'
      }).length
      
      if (foundCheckmarks === totalCheckmarks) {
        const timeBonus = Math.max(0, 300 - Math.floor((Date.now() - startTime) / 1000))
        setMineSweeperScore(prev => prev + timeBonus)
        setGameWon(true)
        showBugNotification(`🏆 ¡Ganaste! +${timeBonus} puntos bonus por tiempo`, 'bonus')
        // Al ganar el buscaminas, añadir el puntaje al total
        setTotalScore(prev => prev + mineSweeperScore + timeBonus + 100)
      }
    }
  }

  const generateCertificate = () => {
    // Usar el puntaje total acumulado
    const finalScore = totalScore
    const certificates = [
      { title: "QA Novice", emoji: "🌱", color: "#ff6b6b" },
      { title: "Testing Apprentice", emoji: "🛠️", color: "#4ecdc4" },
      { title: "Bug Hunter", emoji: "🕵️", color: "#45b7d1" },
      { title: "QA Master", emoji: "👑", color: "#f9ca24" },
      { title: "Testing Legend", emoji: "⭐", color: "#ff9ff3" }
    ]
    
    const certIndex = Math.min(Math.floor(finalScore / 500), certificates.length - 1)
    setCertificate(certificates[certIndex])
    setGameCompleted(true)
  }

  const resetGame = () => {
    // Reset completo de TODOS los estados
    setCurrentGame('menu')
    setQuizScore(0)
    setMineSweeperScore(0)
    setTotalScore(0)  // Reset completo del puntaje total
    setLevel(1)
    setTimeLeft(30)
    setGameCompleted(false)
    setCertificate(null)
    setNotification(null)
    
    // Reset estados del buscaminas
    setMineSweeperBoard([])
    setRevealedCells(new Set())
    setFlaggedCells(new Set())
    setGameOver(false)
    setGameWon(false)
    setStartTime(null)
    
    // Reset estados del quiz
    setCurrentQuizQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const printCertificate = () => {
    // Crear una ventana de impresión con el certificado
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificado QA - Ernesto Vázquez</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              text-align: center;
              padding: 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              margin: 0;
            }
            .certificate {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              padding: 40px;
              backdrop-filter: blur(10px);
              border: 2px solid rgba(255, 255, 255, 0.3);
              max-width: 600px;
              margin: 0 auto;
            }
            .badge {
              font-size: 4rem;
              margin: 20px 0;
            }
            .score {
              font-size: 2rem;
              font-weight: bold;
              margin: 20px 0;
              color: #ffd700;
            }
            .title {
              font-size: 1.5rem;
              margin: 20px 0;
            }
            .name {
              font-size: 1.2rem;
              margin-bottom: 30px;
              opacity: 0.9;
            }
            .footer {
              margin-top: 40px;
              font-size: 0.9rem;
              opacity: 0.7;
            }
            @media print {
              body { background: white !important; color: black !important; }
              .certificate { background: white !important; border: 2px solid #333 !important; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>🎉 Certificado de Excelencia QA</h1>
            <div class="badge">${certificate.emoji}</div>
            <h2 class="title">${certificate.title}</h2>
            <p>Este certificado se otorga a</p>
            <p class="name"><strong>Ernesto Vázquez</strong></p>
            <p>Por completar exitosamente los Mini-Juegos QA</p>
            <div class="score">${totalScore} puntos</div>
            <p>Fecha: ${new Date().toLocaleDateString('es-ES')}</p>
            <div class="footer">
              Mini-Juegos QA - PortFolio 2.0<br>
              QA Automation Engineer
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }

  return (
    <div className="games">
      <section className="games-hero section">
        <div className="container">
          <h1 className="fade-in">🎮 Mini-Juegos QA</h1>
          <p className="games-subtitle">
            Pon a prueba tus conocimientos en QA Automation de forma divertida
          </p>
        </div>
      </section>

      <section className="games-content section">
        <div className="container">
          {currentGame === 'menu' && (
            <div className="game-menu">
              <div className="score-display">
                <h3>🏆 Puntaje Total: <span className="score">{totalScore}</span></h3>
              </div>
              
              <div className="game-options">
                <div className="game-card card" onClick={startQuiz}>
                  <div className="game-icon">🧠</div>
                  <h3>Quiz de Conocimientos QA</h3>
                  <p>Pon a prueba tus conocimientos sobre testing, automatización y mejores prácticas</p>
                  <div className="game-meta">
                    <span>⏱️ 30s por pregunta</span>
                    <span>💯 100 puntos</span>
                  </div>
                </div>

                <div className="game-card card" onClick={startMineSweeper}>
                  <div className="game-icon">💣</div>
                  <h3>Buscaminas QA</h3>
                  <p>Encuentra todos los checkmarks ✅ sin activar bugs 🐛. ¡Demuestra tu atención al detalle!</p>
                  <div className="game-meta">
                    <span>🎯 15 checkmarks</span>
                    <span>💎 100 puntos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentGame === 'quiz' && !gameCompleted && (
            <div className="quiz-game">
              <div className="game-header">
                <div className="timer">⏱️ {timeLeft}s</div>
                <div className="progress">
                  Pregunta {currentQuizQuestion + 1} de {quizQuestions.length}
                </div>
                <div className="current-score">🏆 {quizScore}</div>
              </div>

              <div className="question-card card">
                <h3>{quizQuestions[currentQuizQuestion].question}</h3>
                
                <div className="options">
                  {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${selectedAnswer !== null ? 
                        (index === quizQuestions[currentQuizQuestion].correct ? 'correct' : 
                         index === selectedAnswer ? 'incorrect' : '') : ''}`}
                      onClick={() => handleQuizAnswer(index)}
                      onMouseEnter={() => playSound('hover')}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="explanation">
                    <h4>💡 Explicación:</h4>
                    <p>{quizQuestions[currentQuizQuestion].explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentGame === 'minesweeper' && !gameCompleted && (
            <div className="minesweeper-game">
              <div className="game-header">
                <div className="current-score">🏆 {mineSweeperScore}</div>
                <div className="game-stats">
                  Checkmarks encontrados: {Array.from(revealedCells).filter(key => {
                    const [r, c] = key.split('-').map(Number)
                    return mineSweeperBoard[r]?.[c]?.type === 'checkmark'
                  }).length} / {mineSweeperBoard.flat().filter(cell => cell.type === 'checkmark').length}
                </div>
                {gameOver && <div className="game-status game-over">💥 ¡Game Over!</div>}
                {gameWon && <div className="game-status game-won">🏆 ¡Ganaste!</div>}
              </div>

              <div className="minesweeper-board">
                {mineSweeperBoard.map((row, rowIndex) => (
                  <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => {
                      const cellKey = `${rowIndex}-${colIndex}`
                      const isRevealed = revealedCells.has(cellKey)
                      const showAllBugs = gameOver || gameWon
                      
                      // Determinar qué mostrar
                      let displayContent = '⬜' // Cuadrado vacío por defecto
                      let cellClass = 'cell'
                      
                      if (isRevealed) {
                        if (cell.type === 'checkmark') {
                          displayContent = '✅'
                          cellClass += ' revealed checkmark'
                        } else if (cell.type === 'bug') {
                          displayContent = '🐛'
                          cellClass += ' revealed bug exploded'
                        } else {
                          displayContent = '⬛'
                          cellClass += ' revealed empty'
                        }
                      } else if (showAllBugs && cell.type === 'bug') {
                        // Mostrar bugs no revelados cuando pierdes
                        displayContent = '🐛'
                        cellClass += ' revealed bug revealed-bug'
                      } else {
                        cellClass += ' hidden'
                      }
                      
                      return (
                        <div
                          key={colIndex}
                          className={cellClass}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {displayContent}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="game-instructions">
                <h4>📋 Cómo jugar Buscaminas QA:</h4>
                <ul>
                  <li>✅ <strong>Checkmarks verdes:</strong> Haz click para ganar 100 puntos</li>
                  <li>🐛 <strong>Bugs rojos:</strong> Si haces click, ¡pierdes el juego!</li>
                  <li>🎯 <strong>Objetivo:</strong> Encuentra todos los 15 checkmarks sin activar bugs</li>
                  <li>⏱️ <strong>Bonus:</strong> Más rápido = más puntos extra por tiempo</li>
                  <li>💡 <strong>Estrategia:</strong> Recuerda posiciones y evita repetir clicks</li>
                </ul>
              </div>
            </div>
          )}

          {gameCompleted && certificate && (
            <div className="certificate-modal">
              <div className="certificate card">
                <div className="certificate-header">
                  <h2>🎉 ¡Felicitaciones!</h2>
                  <div className="certificate-badge" style={{color: certificate.color}}>
                    {certificate.emoji}
                  </div>
                </div>
                
                <h3>{certificate.title}</h3>
                <p>Has completado el Mini-Juego QA con un puntaje de:</p>
                <div className="final-score">{totalScore} puntos</div>
                
                <div className="certificate-actions">
                  <button className="btn" onClick={resetGame}>
                    🎮 Jugar de Nuevo
                  </button>
                  <button className="btn btn-secondary" onClick={printCertificate}>
                    🖨️ Imprimir Certificado
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notificación temporal */}
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {currentGame !== 'menu' && !gameCompleted && (
            <button className="back-btn" onClick={resetGame}>
              ← Volver al Menú
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default Games