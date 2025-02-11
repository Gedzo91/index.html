import { languageData } from './questions.js';
import { translations } from './translations.js';
import { LeagueSystem } from './leagues.js';

class DuolingoApp {
  constructor() {
    this.currentLanguage = null;
    this.currentLevel = null;
    this.hearts = 3;
    this.progress = 0;
    this.currentQuestionIndex = 0;
    this.interfaceLanguage = null;
    this.lessonStartTime = null;
    this.mistakes = 0;
    this.correctSound = new Audio('Voicy_Correct answer sound effect .mp3');
    this.wrongSound = new Audio('Voicy_Bad answer.mp3');
    this.lessonCompleteSound = new Audio('duolingo-completed-lesson.mp3');
    this.leagueSystem = new LeagueSystem();
    this.init();
    this.initLeagueUI();
  }

  init() {
    this.initInterfaceLanguageSelection();
  }

  initInterfaceLanguageSelection() {
    const languageButtons = document.querySelectorAll('.interface-language-option');
    languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        this.setInterfaceLanguage(lang);
      });
    });
  }

  setInterfaceLanguage(lang) {
    this.interfaceLanguage = lang;
    this.updateUITranslations();
    document.getElementById('language-selector').style.display = 'none';
    document.getElementById('home-screen').classList.remove('hidden');
    this.updateAvailableLanguages();
    this.initLanguageSelection();
    this.initBackButton();
  }

  updateUITranslations() {
    const elements = document.querySelectorAll('[data-i18n]'); 
    elements.forEach(element => {
      const key = element.dataset.i18n;
      if (translations[this.interfaceLanguage] && translations[this.interfaceLanguage][key]) {
        element.textContent = translations[this.interfaceLanguage][key];
      }
    });
  }

  updateAvailableLanguages() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      const langCode = option.dataset.lang;
      // Hide the button if it's the same as interface language
      if (langCode === this.interfaceLanguage) {
        option.style.display = 'none';
      } else {
        option.style.display = 'block';
        // Update the language name to the selected interface language
        const langNameElem = option.querySelector('h3');
        if (langNameElem) {
          langNameElem.textContent = translations[this.interfaceLanguage][langCode === 'en' ? 'english' : langCode];
        }
      }
    });
  }

  initLanguageSelection() {
    const languageButtons = document.querySelectorAll('.language-option');
    languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        this.selectLanguage(lang);
      });
    });
  }

  initBackButton() {
    document.getElementById('back-to-languages').addEventListener('click', () => {
      document.getElementById('levels-screen').classList.add('hidden');
      document.getElementById('home-screen').classList.remove('hidden');
    });
  }

  selectLanguage(lang) {
    this.currentLanguage = lang;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('levels-screen').classList.remove('hidden');
    document.getElementById('selected-language').textContent = 
      languageData[lang].name[this.interfaceLanguage];
    this.displayLevels();
  }

  displayLevels() {
    this.displayBasicLevels();
    this.displayIntermediateLevels();
    this.loadLevelProgress();
  }

  displayBasicLevels() {
    const basicContainer = document.getElementById('basic-levels');
    basicContainer.innerHTML = '';
    
    for (let i = 1; i <= 6; i++) {
      const button = this.createLevelButton(i, 'basic');
      // Lock all levels except first one initially
      if (i > 1) {
        button.classList.add('locked');
      }
      basicContainer.appendChild(button);
    }
  }

  displayIntermediateLevels() {
    const intermediateContainer = document.getElementById('intermediate-levels');
    intermediateContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const button = this.createLevelButton(i, 'intermediate');
      // Lock all intermediate levels initially
      button.classList.add('locked');
      intermediateContainer.appendChild(button);
    }
  }

  loadLevelProgress() {
    // Get progress from localStorage
    const progress = JSON.parse(localStorage.getItem(`progress_${this.currentLanguage}`) || '{}');
    
    // Update basic levels
    for (let i = 1; i <= 6; i++) {
      const basicButton = document.querySelector(`#basic-levels .level-button:nth-child(${i})`);
      
      // Handle completed levels
      if (progress[`basic_${i}`] === 'completed') {
        basicButton.classList.add('completed');
        basicButton.classList.remove('locked');
        
        // Unlock next level if not the last one
        if (i < 6) {
          const nextButton = document.querySelector(`#basic-levels .level-button:nth-child(${i + 1})`);
          if (nextButton) {
            nextButton.classList.remove('locked');
          }
        }
      } else if (progress[`basic_${i}`] === 'failed') {
        basicButton.classList.add('failed');
        basicButton.classList.remove('locked');
      }
    }

    // Check if all basic levels are completed to unlock intermediate
    const allBasicCompleted = Array.from({length: 6}, (_, i) => i + 1)
      .every(i => progress[`basic_${i}`] === 'completed');

    // Update intermediate levels
    const intermediateLevels = document.querySelectorAll('#intermediate-levels .level-button');
    intermediateLevels.forEach((button, i) => {
      if (allBasicCompleted) {
        if (i === 0) {
          // Unlock first intermediate level if all basic levels are completed
          button.classList.remove('locked');
        } else {
          // Check if previous level is completed
          const previousCompleted = progress[`intermediate_${i}`] === 'completed';
          if (previousCompleted) {
            button.classList.remove('locked');
          }
        }
      }

      if (progress[`intermediate_${i+1}`] === 'completed') {
        button.classList.add('completed');
        button.classList.remove('locked');
        
        // Unlock next level if not the last one
        if (i < 4) {  // 5 levels total, so index 4 is last
          const nextButton = intermediateLevels[i + 1];
          if (nextButton) {
            nextButton.classList.remove('locked');
          }
        }
      } else if (progress[`intermediate_${i+1}`] === 'failed') {
        button.classList.add('failed');
        button.classList.remove('locked');
      }
    });
  }

  createLevelButton(number, stage) {
    const button = document.createElement('button');
    button.className = 'level-button';
    button.textContent = number;
    
    button.addEventListener('click', () => {
      if (!button.classList.contains('locked')) {
        this.startLevel(stage, number - 1);
      }
    });

    return button;
  }

  saveLevelProgress(stage, levelNumber, status) {
    const progress = JSON.parse(localStorage.getItem(`progress_${this.currentLanguage}`) || '{}');
    progress[`${stage}_${levelNumber + 1}`] = status;
    localStorage.setItem(`progress_${this.currentLanguage}`, JSON.stringify(progress));
  }

  startLevel(stage, levelIndex) {
    this.currentLevel = stage;
    this.currentQuestionIndex = 0;
    this.hearts = 3;
    this.progress = 0;
    this.mistakes = 0;
    this.lessonStartTime = new Date();
    
    document.getElementById('levels-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    this.resetHearts();
    this.updateProgress();
    this.displayQuestion();
    
    document.getElementById('continue').addEventListener('click', () => this.nextQuestion());
  }

  async displayQuestion() {
    const questions = languageData[this.currentLanguage].levels[this.currentLevel];
    const question = questions[this.currentQuestionIndex];
    
    document.getElementById('prompt').textContent = 
      question.prompt[this.interfaceLanguage];
    
    if (question.type === 'text' || question.type === 'image') {
      document.getElementById('duolingo-png').style.display = 'block';
      document.getElementById('lily-png').style.display = 'none';
    } else if (question.type === 'audio') {
      document.getElementById('duolingo-png').style.display = 'none';
      document.getElementById('lily-png').style.display = 'block';
    } else if (question.type === 'speaking') {
      document.getElementById('duolingo-png').style.display = 'block';
      document.getElementById('lily-png').style.display = 'none';
    }
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    if (question.type === 'image') {
      this.displayImageQuestion(question, optionsContainer);
    } else if (question.type === 'audio') {
      this.displayAudioQuestion(question, optionsContainer);
    } else if (question.type === 'speaking') {
      this.displaySpeakingQuestion(question, optionsContainer);
    } else {
      this.displayTextQuestion(question, optionsContainer);
    }

    document.getElementById('result').classList.add('hidden');
  }

  displayTextQuestion(question, container) {
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option';
      button.textContent = option;
      button.addEventListener('click', () => this.checkAnswer(index));
      container.appendChild(button);
    });
  }

  displayImageQuestion(question, container) {
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'image-option';
      button.innerHTML = `
        ${option.image}
        <span>${option.label}</span>
      `;
      button.addEventListener('click', () => this.checkAnswer(index));
      container.appendChild(button);
    });
  }

  async displayAudioQuestion(question, container) {
    const languageCode = this.currentLanguage;
    let lang;
    switch (languageCode) {
      case 'fr':
        lang = 'fr-FR'; 
        break;
      case 'es':
        lang = 'es-ES'; 
        break;
      case 'de':
        lang = 'de-DE'; 
        break;
      case 'it':
        lang = 'it-IT'; 
        break;
      case 'pt':
        lang = 'pt-PT'; 
        break;
      default:
        lang = 'en-US'; 
    }

    const speech = new SpeechSynthesisUtterance(question.audio.text);
    speech.lang = lang;

    const audioContainer = document.createElement('div');
    audioContainer.className = 'audio-container';
    const playButton = document.createElement('button');
    playButton.className = 'play-audio';
    playButton.innerHTML = '&#x1F50A; Play';
    playButton.addEventListener('click', () => {
      window.speechSynthesis.speak(speech);
    });
    audioContainer.appendChild(playButton);
    container.appendChild(audioContainer);

    const blocksContainer = document.createElement('div');
    blocksContainer.className = 'word-blocks';
  
    const answerSpace = document.createElement('div');
    answerSpace.className = 'answer-space';
  
    const wordBank = document.createElement('div');
    wordBank.className = 'word-bank';
  
    let words = question.options;
    words = this.shuffleArray(words);

    words.forEach((word, index) => {
      const block = document.createElement('div');
      block.className = 'word-block';
      block.textContent = word;
      block.draggable = true;
      block.dataset.index = index;
      
      block.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
      });
      
      wordBank.appendChild(block);
    });
  
    answerSpace.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    answerSpace.addEventListener('drop', (e) => {
      e.preventDefault();
      const index = e.dataTransfer.getData('text/plain');
      const block = document.querySelector(`[data-index="${index}"]`);
      answerSpace.appendChild(block);
    });
  
    blocksContainer.appendChild(answerSpace);
    blocksContainer.appendChild(wordBank);
    container.appendChild(blocksContainer);

    const finishButton = document.createElement('button');
    finishButton.textContent = 'Finish';
    finishButton.addEventListener('click', () => {
      const answer = Array.from(answerSpace.children).map(block => block.textContent);
      this.checkAudioAnswerWithAI(answer, question.correctOrder, question.audio.text);
    });
    container.appendChild(finishButton);
  }

  async checkAudioAnswerWithAI(answer, correctOrder, text) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `Check if the given answer is correct for the sentence: ${text}.
          
          <typescript-interface>
          interface Response {
            isCorrect: boolean;
          }
          </typescript-interface>
          <example>

          {
            "isCorrect": true
          }
          </example>
          `,
          data: {
            answer: answer.join(' '),
            correctOrder: correctOrder.map(index => answer[index]),
          },
        }),
      });
      const data = await response.json();
      if (data.isCorrect) {
        this.correctSound.play();
        this.showResult(true);
        this.progress += 100 / languageData[this.currentLanguage].levels[this.currentLevel].length;
        this.updateProgress();
      } else {
        this.wrongSound.play();
        this.loseHeart();
        this.mistakes++;
        this.showResult(false);
      }
    } catch (error) {
      console.error('Error checking answer with AI:', error);
    }
  }

  async displaySpeakingQuestion(question, container) {
    const wordContainer = document.createElement('div');
    wordContainer.className = 'speaking-container';

    const word = document.createElement('h2');
    word.className = 'speaking-word';
    word.textContent = question.word;

    const translation = document.createElement('p');
    translation.className = 'translation';
    translation.textContent = `(${question.translation[this.interfaceLanguage]})`;

    // Check if browser supports speech recognition
    const isSpeechSupported = ('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window);

    if (isSpeechSupported) {
      // Original speaking functionality
      const micButton = document.createElement('button');
      micButton.className = 'mic-button';
      micButton.innerHTML = '&#x1F3A4; Click to speak';

      const resultText = document.createElement('p');
      resultText.className = 'recognition-result';
      resultText.style.display = 'none';

      wordContainer.appendChild(word);
      wordContainer.appendChild(translation);
      wordContainer.appendChild(micButton);
      wordContainer.appendChild(resultText);

      let isListening = false;
      let recognition = null;

      micButton.addEventListener('click', async () => {
        if (!isListening) {
          try {
            // First check if we already have permission
            const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
            
            if (permissionStatus.state === 'denied') {
              throw new Error('Microphone access is blocked. Please allow microphone access in your browser settings.');
            }

            // Try to get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately as we just needed to check permission

            // Initialize speech recognition
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = question.expectedLanguage;
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
              isListening = true;
              micButton.classList.add('listening');
              micButton.innerHTML = '&#x1F3A4; Listening...';
              resultText.style.display = 'none';
            };

            recognition.onend = () => {
              isListening = false;
              micButton.classList.remove('listening');
              micButton.innerHTML = '&#x1F3A4; Click to speak';
            };

            recognition.onerror = (event) => {
              isListening = false;
              micButton.classList.remove('listening');
              micButton.innerHTML = '&#x1F3A4; Click to speak';
              resultText.style.display = 'block';
              resultText.textContent = `Error: ${event.error}. Please try again.`;
            };

            recognition.onresult = async (event) => {
              const transcript = event.results[0][0].transcript.toLowerCase();
              resultText.style.display = 'block';
              resultText.textContent = `You said: "${transcript}"`;

              try {
                const response = await fetch('/api/ai_completion', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify({
                    prompt: `Compare the pronunciation "${transcript}" with the expected word "${question.word}" in ${question.expectedLanguage}. Consider phonetic similarities and accent variations. Return if it's close enough to be considered correct.
                    
                    <typescript-interface>
                    interface Response {
                      isCorrect: boolean;
                      explanation: string;
                    }
                    </typescript-interface>
                    <example>
                    {
                      "isCorrect": true,
                      "explanation": "The pronunciation matches well with expected word."
                    }
                    </example>`,
                    data: {
                      transcript,
                      expectedWord: question.word,
                      language: question.expectedLanguage
                    }
                  })
                });

                const result = await response.json();
                
                if (result.isCorrect) {
                  this.correctSound.play();
                  this.showResult(true);
                  this.progress += 100 / languageData[this.currentLanguage].levels[this.currentLevel].length;
                  this.updateProgress();
                } else {
                  this.wrongSound.play();
                  this.loseHeart();
                  this.mistakes++;
                  this.showResult(false);
                }

                resultText.textContent += `\n${result.explanation}`;
                
              } catch (error) {
                console.error('Error checking pronunciation:', error);
                resultText.textContent += '\nError checking pronunciation. Please try again.';
              }
            };

            recognition.start();
            
          } catch (err) {
            console.error('Error accessing microphone:', err);
            resultText.style.display = 'block';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              resultText.textContent = 'Microphone access was denied. Please allow microphone access in your browser settings and refresh the page.';
            } else {
              resultText.textContent = 'Error accessing microphone. Please make sure your microphone is connected and working.';
            }
          }
        } else if (recognition) {
          recognition.stop();
        }
      });
    } else {
      // Alternative options when speech recognition is not supported
      const alternativeContainer = document.createElement('div');
      alternativeContainer.className = 'alternative-options';
      
      const message = document.createElement('p');
      message.className = 'speech-not-supported';
      message.textContent = 'Speech recognition is not supported in your browser. Please choose an alternative:';
      
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'alternative-buttons';

      // Translation option
      const translateButton = document.createElement('button');
      translateButton.className = 'alternative-button translate-button';
      translateButton.textContent = 'Translate';
      translateButton.addEventListener('click', () => {
        this.showTranslationInput(question, alternativeContainer);
      });

      // Spelling option
      const spellingButton = document.createElement('button');
      spellingButton.className = 'alternative-button spelling-button';
      spellingButton.textContent = 'Write Spelling';
      spellingButton.addEventListener('click', () => {
        this.showSpellingInput(question, alternativeContainer);
      });

      optionsContainer.appendChild(translateButton);
      optionsContainer.appendChild(spellingButton);
      alternativeContainer.appendChild(message);
      alternativeContainer.appendChild(optionsContainer);

      wordContainer.appendChild(word);
      wordContainer.appendChild(translation);
      wordContainer.appendChild(alternativeContainer);
    }

    container.appendChild(wordContainer);
  }

  showTranslationInput(question, container) {
    container.innerHTML = '';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'translation-input';
    input.placeholder = 'Enter translation...';

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Check';

    const resultText = document.createElement('p');
    resultText.className = 'check-result';
    resultText.style.display = 'none';

    submitButton.addEventListener('click', async () => {
      const userTranslation = input.value.trim().toLowerCase();
      const correctTranslation = question.translation[this.interfaceLanguage].toLowerCase();

      try {
        const response = await fetch('/api/ai_completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Compare the translation "${userTranslation}" with the expected translation "${correctTranslation}". Consider synonyms and minor variations. Return if it's close enough to be considered correct.
            
            <typescript-interface>
            interface Response {
              isCorrect: boolean;
              explanation: string;
            }
            </typescript-interface>
            <example>
            {
              "isCorrect": true,
              "explanation": "The translation is correct."
            }
            </example>`,
            data: {
              userTranslation,
              correctTranslation
            }
          })
        });

        const result = await response.json();
        
        resultText.style.display = 'block';
        resultText.textContent = result.explanation;

        if (result.isCorrect) {
          this.correctSound.play();
          this.showResult(true);
          this.progress += 100 / languageData[this.currentLanguage].levels[this.currentLevel].length;
          this.updateProgress();
        } else {
          this.wrongSound.play();
          this.loseHeart();
          this.mistakes++;
          this.showResult(false);
        }
      } catch (error) {
        console.error('Error checking translation:', error);
        resultText.textContent = 'Error checking translation. Please try again.';
      }
    });

    container.appendChild(input);
    container.appendChild(submitButton);
    container.appendChild(resultText);
  }

  showSpellingInput(question, container) {
    container.innerHTML = '';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'spelling-input';
    input.placeholder = 'Write how you say it... (e.g. "heh-low" for "hello")';

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Check';

    const resultText = document.createElement('p');
    resultText.className = 'check-result';
    resultText.style.display = 'none';

    submitButton.addEventListener('click', async () => {
      const userSpelling = input.value.trim().toLowerCase();
      const correctWord = question.word.toLowerCase();

      try {
        const response = await fetch('/api/ai_completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Compare the phonetic spelling "${userSpelling}" with the correct word "${correctWord}". The user is trying to write how the word sounds in ${question.expectedLanguage}. Consider various phonetic spellings and letter combinations that could represent the same sounds. For example, "hello" could be written as "heh-low", "helou", "helow", etc.

            Return if the phonetic spelling represents a reasonable approximation of how the word sounds.
            
            <typescript-interface>
            interface Response {
              isCorrect: boolean;
              explanation: string;
            }
            </typescript-interface>
            <example>
            {
              "isCorrect": true,
              "explanation": "Your phonetic spelling 'heh-low' is a good representation of how 'hello' sounds!"
            }
            </example>`,
            data: {
              userSpelling,
              correctWord,
              language: question.expectedLanguage
            }
          })
        });

        const result = await response.json();
        
        resultText.style.display = 'block';
        resultText.textContent = result.explanation;

        if (result.isCorrect) {
          this.correctSound.play();
          this.showResult(true);
          this.progress += 100 / languageData[this.currentLanguage].levels[this.currentLevel].length;
          this.updateProgress();
        } else {
          this.wrongSound.play();
          this.loseHeart();
          this.mistakes++;
          this.showResult(false);
        }
      } catch (error) {
        console.error('Error checking spelling:', error);
        resultText.textContent = 'Error checking spelling. Please try again.';
      }
    });

    container.appendChild(input);
    container.appendChild(submitButton);
    container.appendChild(resultText);
  }

  checkAnswer(selectedIndex) {
    const questions = languageData[this.currentLanguage].levels[this.currentLevel];
    const question = questions[this.currentQuestionIndex];
    const options = document.querySelectorAll(question.type === 'image' ? '.image-option' : '.option');
    
    if (selectedIndex === question.correctIndex) {
      options[selectedIndex].classList.add('correct');
      this.correctSound.play();
      this.showResult(true);
      this.progress += 100 / questions.length;
      this.updateProgress();
    } else {
      options[selectedIndex].classList.add('incorrect');
      options[question.correctIndex].classList.add('correct');
      this.wrongSound.play();
      this.loseHeart();
      this.mistakes++;
      this.showResult(false);
    }

    options.forEach(option => option.style.pointerEvents = 'none');
  }

  resetHearts() {
    const heartElements = document.querySelectorAll('.hearts span');
    heartElements.forEach(heart => heart.classList.remove('lost'));
  }

  loseHeart() {
    this.hearts--;
    const heartElements = document.querySelectorAll('.hearts span');
    heartElements[this.hearts].classList.add('lost');

    if (this.hearts === 0) {
      setTimeout(() => {
        alert('Game Over! Try again...');
        this.returnToLevels();
      }, 1000);
    }
  }

  showResult(isCorrect) {
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    const message = isCorrect ? 
      translations[this.interfaceLanguage]['correct'] : 
      translations[this.interfaceLanguage]['incorrect'];
    result.querySelector('h2').textContent = message;
  }

  nextQuestion() {
    const questions = languageData[this.currentLanguage].levels[this.currentLevel];
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= questions.length) {
      this.showLessonComplete();
      return;
    }
    this.displayQuestion();
  }

  async showLessonComplete() {
    const lessonEndTime = new Date();
    const timeSpent = Math.floor((lessonEndTime - this.lessonStartTime) / 1000);
    const extraXP = Math.max(1, 5 - this.mistakes);
    const totalXP = 10 + extraXP;

    // Add XP to leaderboard
    await this.leagueSystem.addXP(totalXP);
    
    // Update league UI if visible
    const leagueBanner = document.querySelector('.league-banner');
    if (leagueBanner) {
      this.updateLeagueBanner(leagueBanner);
    }

    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Save progress
    const status = this.mistakes < 3 ? 'completed' : 'failed';
    this.saveLevelProgress(this.currentLevel, this.currentQuestionIndex, status);

    const modalHtml = `
      <div class="lesson-complete-modal modal">
        <div class="modal-content">
          <div class="mascot">
            <img src="Duolingo.png" alt="Duo the owl" width="120">
          </div>
          <h2>${translations[this.interfaceLanguage]['lesson-complete']}</h2>
          <div class="stats">
            <div class="stat-item">
              <h3>${translations[this.interfaceLanguage]['total-xp']}</h3>
              <p>+${totalXP} XP</p>
              ${extraXP > 0 ? `<small>(+${extraXP} ${translations[this.interfaceLanguage]['bonus-xp']})</small>` : ''}
            </div>
            <div class="stat-item">
              <h3>${translations[this.interfaceLanguage]['mistakes']}</h3>
              <p>${this.mistakes}</p>
            </div>
            <div class="stat-item">
              <h3>${translations[this.interfaceLanguage]['time']}</h3>
              <p>${timeFormatted}</p>
            </div>
          </div>
          <button class="continue-btn" onclick="window.duolingoApp.proceedToNextLevel();">
            ${translations[this.interfaceLanguage]['continue']}
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.lessonCompleteSound.play();
  }

  proceedToNextLevel() {
    document.querySelector('.lesson-complete-modal').remove();

    const currentLevel = this.currentLevel;
    const currentLevelIndex = this.currentQuestionIndex;
  
    // Mark current level as completed
    this.saveLevelProgress(currentLevel, currentLevelIndex, 'completed');

    // Check if completed all basic levels to unlock intermediate
    if (currentLevel === 'basic' && currentLevelIndex === 5) {  // Last basic level (index 5 = level 6)
      const progress = JSON.parse(localStorage.getItem(`progress_${this.currentLanguage}`) || '{}');
      const allBasicCompleted = Array.from({length: 6}, (_, i) => i + 1)
        .every(i => progress[`basic_${i}`] === 'completed');
    
      if (allBasicCompleted) {
        const firstIntermediate = document.querySelector('#intermediate-levels .level-button:first-child');
        if (firstIntermediate) {
          firstIntermediate.classList.remove('locked');
        }
      }
    }

    // Update UI for completed level and next level
    this.loadLevelProgress();
    this.returnToLevels();
  }

  returnToLevels() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('levels-screen').classList.remove('hidden');
    
    this.currentQuestionIndex = 0;
    this.hearts = 3;
    this.progress = 0;
    this.mistakes = 0;
    
    this.resetHearts();
    this.updateProgress();
  }

  updateProgress() {
    document.getElementById('progress').style.width = `${this.progress}%`;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  initLeagueUI() {
    const leaguePanel = document.querySelector('.league-panel');
    if (leaguePanel) {
      this.updateLeagueBanner(leaguePanel);
      
      // Update league panel every minute
      setInterval(() => {
        this.updateLeagueBanner(leaguePanel);
      }, 60000);
    }
  }

  updateLeagueBanner(banner) {
    if (!banner) return;
    
    const leagueData = this.leagueSystem.getCurrentLeagueData();
    
    if (!leagueData.hasCompletedLesson) {
      banner.innerHTML = `
        <div class="league-locked">
          <img src="Duolingo.png" alt="Duo the owl">
          <h3>Complete 1 lesson to join the league!</h3>
          <p>Compete with other learners and advance to higher leagues.</p>
        </div>
      `;
      return;
    }

    banner.innerHTML = `
      <div class="league-info">
        <div class="rank-info">
          <div class="rank-icon" style="background: ${leagueData.rank.color}"></div>
          <span class="league-rank">${leagueData.rank.name} League</span>
        </div>
        <div class="league-position">
          Position: ${leagueData.userPosition}/30
        </div>
      </div>
      <h3>Weekly Leaderboard</h3>
      <div class="leaderboard">
        ${leagueData.participants.map((participant, index) => `
          <div class="leaderboard-item ${participant.id === 'user' ? 'current-user' : ''}">
            <span class="leaderboard-position">${index + 1}</span>
            <img class="leaderboard-avatar" src="${participant.avatarUrl}" alt="${participant.name}">
            <span class="leaderboard-name">${participant.name}</span>
            <span class="leaderboard-xp">${participant.weeklyXP} XP</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

window.duolingoApp = new DuolingoApp();