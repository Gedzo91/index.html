export const languageData = {
  en: {
    name: {
      en: "English",
      es: "Inglés",
      fr: "Anglais",
      de: "Englisch", 
      it: "Inglese",
      pt: "Inglês"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola", 
            pt: "Pronuncie esta palavra"
          },
          word: "hello",
          translation: {
            es: "hola",
            fr: "bonjour", 
            de: "hallo",
            it: "ciao",
            pt: "olá",
            en: "hello"
          },
          expectedLanguage: "en-US"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra", 
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "goodbye",
          translation: {
            es: "adiós",
            fr: "au revoir",
            de: "auf wiedersehen",
            it: "arrivederci", 
            pt: "adeus",
            en: "goodbye"
          },
          expectedLanguage: "en-US"
        },
        {
          type: "text",
          prompt: {
            es: "¿Cómo se dice 'perro' en inglés?",
            fr: "Comment dit-on 'chien' en anglais?",
            de: "Wie sagt man 'Hund' auf Englisch?",
            it: "Come si dice 'cane' in inglese?",
            pt: "Como se diz 'cachorro' em inglês?"
          },
          options: ["Dog", "Cat", "Bird", "Fish"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "My name is John and I love pizza",
            lang: "en-US"
          },
          options: ["My", "name", "is", "John", "and", "I", "love", "pizza"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            es: "Traduce: 'Quiero aprender inglés'",
            fr: "Traduisez: 'Je veux apprendre l'anglais'",
            de: "Übersetze: 'Ich möchte Englisch lernen'",
            it: "Traduci: 'Voglio imparare l'inglese'",
            pt: "Traduza: 'Eu quero aprender inglês'"
          },
          options: ["I want to learn English", "I am learning English", "I speak English", "I know English"],
          correctIndex: 0
        }
      ]
    }
  },
  es: {
    name: {
      en: "Spanish",
      es: "Español",
      fr: "Espagnol",
      de: "Spanisch",
      it: "Spagnolo",
      pt: "Espanhol"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot", 
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "casa",
          translation: {
            es: "casa",
            fr: "maison",
            de: "Haus",
            it: "casa",
            pt: "casa",
            en: "house"
          },
          expectedLanguage: "es-ES"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus", 
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "gato",
          translation: {
            es: "gato",
            fr: "chat",
            de: "Katze",
            it: "gatto",
            pt: "gato",
            en: "cat"
          },
          expectedLanguage: "es-ES"
        },
        {
          type: "text",
          prompt: {
            en: "What is 'apple' in Spanish?",
            es: "¿Cómo se dice 'manzana' en español?",
            fr: "Comment dit-on 'pomme' en espagnol?",
            de: "Wie sagt man 'Apfel' auf Spanisch?",
            it: "Come si dice 'mela' in spagnolo?",
            pt: "Como se diz 'maçã' em espanhol?"
          },
          options: ["Manzana", "Pera", "Naranja", "Plátano"],
          correctIndex: 0
        },
        {
          type: "image",
          prompt: {
            en: "Which one is an apple?",
            es: "¿Cuál es una manzana?",
            fr: "Laquelle est une pomme?",
            de: "Welches ist ein Apfel?",
            it: "Quale è una mela?",
            pt: "Qual é uma maçã?"
          },
          options: [
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#ff0000"/>
                <path d="M50 5 Q65 5 65 20 L65 25 Q80 25 80 40 L50 95 L20 40 Q20 25 35 25 L35 20 Q35 5 50 5" fill="#228B22"/>
              </svg>`,
              label: "Apple"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 L80 60 L50 95 L20 60 Z" fill="#FFA500"/>
                <path d="M50 5 Q65 5 65 20 L65 25" fill="#228B22"/>
              </svg>`,
              label: "Orange"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M10 40 Q50 0 90 40 L50 95 Z" fill="#FFE135"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Banana"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 Q80 30 50 95 Q20 30 50 5" fill="#90EE90"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Pear"
            }
          ],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Me llamo Sofía y me gustan los gatos y los perros",
            lang: "es-ES"
          },
          options: ["Me", "llamo", "Sofía", "y", "me", "gustan", "los", "gatos", "y", "los", "perros"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Voy a la playa con mis amigos",
            lang: "es-ES"
          },
          options: ["Voy", "a", "la", "playa", "con", "mis", "amigos", "la", "montaña", "el", "parque"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Me encanta leer libros de historia",
            lang: "es-ES"
          },
          options: ["Me", "encanta", "leer", "libros", "de", "historia", "ciencia", "ficción", "romance"],
          correctOrder: [0, 1, 2, 3, 4]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            en: "Translate: 'I want to eat'",
            es: "Traduce: 'Quiero comer'",
            fr: "Traduisez: 'Je veux manger'",
            de: "Übersetze: 'Ich will essen'",
            it: "Traduci: 'Voglio mangiare'",
            pt: "Traduza: 'Eu quero comer'"
          },
          options: ["Yo quiero comer", "Yo como", "Yo tengo hambre", "Yo necesito"],
          correctIndex: 0
        },
        {
          type: "text",
          prompt: {
            en: "What is 'computer' in this language?",
            es: "¿Cómo se dice 'ordenador' en este idioma?",
            fr: "Comment dit-on 'ordinateur' dans cette langue?",
            de: "Wie sagt man 'Computer' in dieser Sprache?",
            it: "Come si dice 'computer' in questa lingua?",
            pt: "Como se diz 'computador' nesta língua?"
          },
          options: ["Computer", "Television", "Phone", "Tablet"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Voy a la playa con mis amigos y mi familia",
            lang: "es-ES"
          },
          options: ["Voy", "a", "la", "playa", "con", "mis", "amigos", "y", "mi", "familia"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      ]
    }
  },
  fr: {
    name: {
      en: "French",
      es: "Francés",
      fr: "Français",
      de: "Französisch",
      it: "Francese",
      pt: "Francês"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot", 
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "maison",
          translation: {
            es: "casa",
            fr: "maison",
            de: "Haus",
            it: "casa",
            pt: "casa",
            en: "house"
          },
          expectedLanguage: "fr-FR"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus", 
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "chat",
          translation: {
            es: "gato",
            fr: "chat",
            de: "Katze",
            it: "gatto",
            pt: "gato",
            en: "cat"
          },
          expectedLanguage: "fr-FR"
        },
        {
          type: "text",
          prompt: {
            en: "What is 'apple' in French?",
            es: "¿Cómo se dice 'manzana' en francés?",
            fr: "Comment dit-on 'pomme' en français?",
            de: "Wie sagt man 'Apfel' auf Französisch?",
            it: "Come si dice 'mela' in francese?",
            pt: "Como se diz 'maçã' em francês?"
          },
          options: ["Pomme", "Poire", "Orange", "Banane"],
          correctIndex: 0
        },
        {
          type: "image",
          prompt: {
            en: "Which one is an apple?",
            es: "¿Cuál es una manzana?",
            fr: "Laquelle est une pomme?",
            de: "Welches ist ein Apfel?",
            it: "Quale è una mela?",
            pt: "Qual é uma maçã?"
          },
          options: [
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#ff0000"/>
                <path d="M50 5 Q65 5 65 20 L65 25 Q80 25 80 40 L50 95 L20 40 Q20 25 35 25 L35 20 Q35 5 50 5" fill="#228B22"/>
              </svg>`,
              label: "Apple"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 L80 60 L50 95 L20 60 Z" fill="#FFA500"/>
                <path d="M50 5 Q65 5 65 20 L65 25" fill="#228B22"/>
              </svg>`,
              label: "Orange"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M10 40 Q50 0 90 40 L50 95 Z" fill="#FFE135"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Banana"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 Q80 30 50 95 Q20 30 50 5" fill="#90EE90"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Pear"
            }
          ],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Je m'appelle Léa et j'adore les livres et les films",
            lang: "fr-FR"
          },
          options: ["Je", "m'appelle", "Léa", "et", "j'adore", "les", "livres", "et", "les", "films"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "J'aime aller au parc avec mes amis",
            lang: "fr-FR"
          },
          options: ["J'aime", "aller", "au", "parc", "avec", "mes", "amis", "la", "plage", "le", "cinéma"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "J'adore lire des livres d'histoire",
            lang: "fr-FR"
          },
          options: ["J'adore", "lire", "des", "livres", "d'histoire", "de", "science", "fiction", "romance"],
          correctOrder: [0, 1, 2, 3, 4]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            en: "Translate: 'I want to eat'",
            es: "Traduce: 'Quiero comer'",
            fr: "Traduisez: 'Je veux manger'",
            de: "Übersetze: 'Ich will essen'",
            it: "Traduci: 'Voglio mangiare'",
            pt: "Traduza: 'Eu quero comer'"
          },
          options: ["Je veux manger", "Je mange", "J'ai faim", "J'ai besoin"],
          correctIndex: 0
        },
        {
          type: "text",
          prompt: {
            en: "What is 'computer' in this language?",
            es: "¿Cómo se dice 'ordenador' en este idioma?",
            fr: "Comment dit-on 'ordinateur' dans cette langue?",
            de: "Wie sagt man 'Computer' in dieser Sprache?",
            it: "Come si dice 'computer' in questa lingua?",
            pt: "Como se diz 'computador' nesta língua?"
          },
          options: ["Computer", "Television", "Phone", "Tablet"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "J'aime aller au parc avec mes amis et ma famille",
            lang: "fr-FR"
          },
          options: ["J'aime", "aller", "au", "parc", "avec", "mes", "amis", "et", "ma", "famille"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      ]
    }
  },
  de: {
    name: {
      en: "German",
      es: "Alemán",
      fr: "Allemand",
      de: "Deutsch",
      it: "Tedesco",
      pt: "Alemão"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "Haus",
          translation: {
            es: "casa",
            fr: "maison",
            de: "Haus",
            it: "casa",
            pt: "casa",
            en: "house"
          },
          expectedLanguage: "de-DE"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "Katze",
          translation: {
            es: "gato",
            fr: "chat",
            de: "Katze",
            it: "gatto",
            pt: "gato",
            en: "cat"
          },
          expectedLanguage: "de-DE"
        },
        {
          type: "text",
          prompt: {
            en: "What is 'apple' in German?",
            es: "¿Cómo se dice 'manzana' en alemán?",
            fr: "Comment dit-on 'pomme' en allemand?",
            de: "Wie sagt man 'Apfel' auf Deutsch?",
            it: "Come si dice 'mela' in tedesco?",
            pt: "Como se diz 'maçã' em alemão?"
          },
          options: ["Apfel", "Birne", "Orange", "Banane"],
          correctIndex: 0
        },
        {
          type: "image",
          prompt: {
            en: "Which one is an apple?",
            es: "¿Cuál es una manzana?",
            fr: "Laquelle est une pomme?",
            de: "Welches ist ein Apfel?",
            it: "Quale è una mela?",
            pt: "Qual é uma maçã?"
          },
          options: [
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#ff0000"/>
                <path d="M50 5 Q65 5 65 20 L65 25 Q80 25 80 40 L50 95 L20 40 Q20 25 35 25 L35 20 Q35 5 50 5" fill="#228B22"/>
              </svg>`,
              label: "Apple"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 L80 60 L50 95 L20 60 Z" fill="#FFA500"/>
                <path d="M50 5 Q65 5 65 20 L65 25" fill="#228B22"/>
              </svg>`,
              label: "Orange"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M10 40 Q50 0 90 40 L50 95 Z" fill="#FFE135"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Banana"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 Q80 30 50 95 Q20 30 50 5" fill="#90EE90"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Pear"
            }
          ],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Ich heiße Hannah und ich liebe Hunde und Katzen",
            lang: "de-DE"
          },
          options: ["Ich", "heiße", "Hannah", "und", "ich", "liebe", "Hunde", "und", "Katzen"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Ich gehe gerne ins Kino mit meinen Freunden",
            lang: "de-DE"
          },
          options: ["Ich", "gehe", "gerne", "ins", "Kino", "mit", "meinen", "Freunden", "die", "Strand", "den", "Park"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Ich liebe es, Bücher über Geschichte zu lesen",
            lang: "de-DE"
          },
          options: ["Ich", "liebe", "es", "Bücher", "über", "Geschichte", "zu", "lesen", "Wissenschaft", "Fiktion", "Romane"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            en: "Translate: 'I want to eat'",
            es: "Traduce: 'Quiero comer'",
            fr: "Traduisez: 'Je veux manger'",
            de: "Übersetze: 'Ich will essen'",
            it: "Traduci: 'Voglio mangiare'",
            pt: "Traduza: 'Eu quero comer'"
          },
          options: ["Ich will essen", "Ich esse", "Ich habe Hunger", "Ich brauche"],
          correctIndex: 0
        },
        {
          type: "text",
          prompt: {
            en: "What is 'computer' in this language?",
            es: "¿Cómo se dice 'ordenador' en este idioma?",
            fr: "Comment dit-on 'ordinateur' dans cette langue?",
            de: "Wie sagt man 'Computer' in dieser Sprache?",
            it: "Come si dice 'computer' in questa lingua?",
            pt: "Como se diz 'computador' nesta língua?"
          },
          options: ["Computer", "Television", "Phone", "Tablet"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Ich gehe gerne ins Kino mit meinen Freunden und meiner Familie",
            lang: "de-DE"
          },
          options: ["Ich", "gehe", "gerne", "ins", "Kino", "mit", "meinen", "Freunden", "und", "meiner", "Familie"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      ]
    }
  },
  it: {
    name: {
      en: "Italian",
      es: "Italiano",
      fr: "Italien",
      de: "Italienisch",
      it: "Italiano",
      pt: "Italiano"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "casa",
          translation: {
            es: "casa",
            fr: "maison",
            de: "Haus",
            it: "casa",
            pt: "casa",
            en: "house"
          },
          expectedLanguage: "it-IT"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "gatto",
          translation: {
            es: "gato",
            fr: "chat",
            de: "Katze",
            it: "gatto",
            pt: "gato",
            en: "cat"
          },
          expectedLanguage: "it-IT"
        },
        {
          type: "text",
          prompt: {
            en: "What is 'apple' in Italian?",
            es: "¿Cómo se dice 'manzana' en italiano?",
            fr: "Comment dit-on 'pomme' en italien?",
            de: "Wie sagt man 'Apfel' auf Italienisch?",
            it: "Come si dice 'mela' in italiano?",
            pt: "Come se dice 'maçã' in italiano?"
          },
          options: ["Mela", "Pera", "Arancia", "Banana"],
          correctIndex: 0
        },
        {
          type: "image",
          prompt: {
            en: "Which one is an apple?",
            es: "¿Cuál es una manzana?",
            fr: "Laquelle est une pomme?",
            de: "Welches ist ein Apfel?",
            it: "Quale è una mela?",
            pt: "Qual é uma maçã?"
          },
          options: [
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#ff0000"/>
                <path d="M50 5 Q65 5 65 20 L65 25 Q80 25 80 40 L50 95 L20 40 Q20 25 35 25 L35 20 Q35 5 50 5" fill="#228B22"/>
              </svg>`,
              label: "Apple"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 L80 60 L50 95 L20 60 Z" fill="#FFA500"/>
                <path d="M50 5 Q65 5 65 20 L65 25" fill="#228B22"/>
              </svg>`,
              label: "Orange"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M10 40 Q50 0 90 40 L50 95 Z" fill="#FFE135"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Banana"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 Q80 30 50 95 Q20 30 50 5" fill="#90EE90"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Pear"
            }
          ],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Mi chiamo Giulia e amo i gatti e i cani",
            lang: "it-IT"
          },
          options: ["Mi", "chiamo", "Giulia", "e", "amo", "i", "gatti", "e", "i", "cani"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Vado volentieri al cinema con i miei amici",
            lang: "it-IT"
          },
          options: ["Vado", "volentieri", "al", "cinema", "con", "i", "miei", "amici", "la", "spiaggia", "il", "parco"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Adoro leggere libri di storia",
            lang: "it-IT"
          },
          options: ["Adoro", "leggere", "libri", "di", "storia", "scienza", "fantascienza", "romanzo"],
          correctOrder: [0, 1, 2, 3, 4]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            en: "Translate: 'I want to eat'",
            es: "Traduce: 'Quiero comer'",
            fr: "Traduisez: 'Je veux manger'",
            de: "Übersetze: 'Ich will essen'",
            it: "Traduci: 'Voglio mangiare'",
            pt: "Traduza: 'Eu quero comer'"
          },
          options: ["Voglio mangiare", "Mangio", "Ho fame", "Ho bisogno"],
          correctIndex: 0
        },
        {
          type: "text",
          prompt: {
            en: "What is 'computer' in this language?",
            es: "¿Cómo se dice 'ordenador' en este idioma?",
            fr: "Comment dit-on 'ordinateur' dans cette langue?",
            de: "Wie sagt man 'Computer' in dieser Sprache?",
            it: "Come si dice 'computer' in questa lingua?",
            pt: "Como se diz 'computador' nesta língua?"
          },
          options: ["Computer", "Television", "Phone", "Tablet"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Vado volentieri al cinema con i miei amici e la mia famiglia",
            lang: "it-IT"
          },
          options: ["Vado", "volentieri", "al", "cinema", "con", "i", "miei", "amici", "e", "la", "mia", "famiglia"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
      ]
    }
  },
  pt: {
    name: {
      en: "Portuguese",
      es: "Portugués",
      fr: "Portugais",
      de: "Portugiesisch",
      it: "Portoghese",
      pt: "Português"
    },
    levels: {
      basic: [
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "casa",
          translation: {
            es: "casa",
            fr: "maison",
            de: "Haus",
            it: "casa",
            pt: "casa",
            en: "house"
          },
          expectedLanguage: "pt-PT"
        },
        {
          type: "speaking",
          prompt: {
            en: "Pronounce this word",
            es: "Pronuncia esta palabra",
            fr: "Prononcez ce mot",
            de: "Sprechen Sie dieses Wort aus",
            it: "Pronuncia questa parola",
            pt: "Pronuncie esta palavra"
          },
          word: "gato",
          translation: {
            es: "gato",
            fr: "chat",
            de: "Katze",
            it: "gatto",
            pt: "gato",
            en: "cat"
          },
          expectedLanguage: "pt-PT"
        },
        {
          type: "text",
          prompt: {
            en: "What is 'apple' in Portuguese?",
            es: "¿Cómo se dice 'manzana' en portugués?",
            fr: "Comment dit-on 'pomme' en portugais?",
            de: "Wie sagt man 'Apfel' auf Portugiesisch?",
            it: "Come si dice 'mela' in portoghese?",
            pt: "Como se diz 'maçã' em português?"
          },
          options: ["Maçã", "Pêra", "Laranja", "Banana"],
          correctIndex: 0
        },
        {
          type: "image",
          prompt: {
            en: "Which one is an apple?",
            es: "¿Cuál es una manzana?",
            fr: "Laquelle est une pomme?",
            de: "Welches ist ein Apfel?",
            it: "Quale è una mela?",
            pt: "Qual é uma maçã?"
          },
          options: [
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#ff0000"/>
                <path d="M50 5 Q65 5 65 20 L65 25 Q80 25 80 40 L50 95 L20 40 Q20 25 35 25 L35 20 Q35 5 50 5" fill="#228B22"/>
              </svg>`,
              label: "Apple"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 L80 60 L50 95 L20 60 Z" fill="#FFA500"/>
                <path d="M50 5 Q65 5 65 20 L65 25" fill="#228B22"/>
              </svg>`,
              label: "Orange"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M10 40 Q50 0 90 40 L50 95 Z" fill="#FFE135"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Banana"
            },
            {
              image: `<svg viewBox="0 0 100 100" width="80" height="80">
                <path d="M50 5 Q80 30 50 95 Q20 30 50 5" fill="#90EE90"/>
                <path d="M50 5 Q65 5 65 20" fill="#228B22"/>
              </svg>`,
              label: "Pear"
            }
          ],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Eu me chamo Luana e amo cachorros e gatos",
            lang: "pt-PT"
          },
          options: ["Eu", "me", "chamo", "Luana", "e", "amo", "cachorros", "e", "gatos"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Eu gosto de ir ao cinema com meus amigos",
            lang: "pt-PT"
          },
          options: ["Eu", "gosto", "de", "ir", "ao", "cinema", "com", "meus", "amigos", "a", "praia", "o", "parque"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Eu adoro ler livros de história",
            lang: "pt-PT"
          },
          options: ["Eu", "adoro", "ler", "livros", "de", "história", "ciência", "ficção", "romance"],
          correctOrder: [0, 1, 2, 3, 4]
        }
      ],
      intermediate: [
        {
          type: "text",
          prompt: {
            en: "Translate: 'I want to eat'",
            es: "Traduce: 'Quiero comer'",
            fr: "Traduisez: 'Je veux manger'",
            de: "Übersetze: 'Ich will essen'",
            it: "Traduci: 'Voglio mangiare'",
            pt: "Traduza: 'Eu quero comer'"
          },
          options: ["Eu quero comer", "Eu como", "Eu tenho fome", "Eu preciso"],
          correctIndex: 0
        },
        {
          type: "text",
          prompt: {
            en: "What is 'computer' in this language?",
            es: "¿Cómo se dice 'ordenador' en este idioma?",
            fr: "Comment dit-on 'ordinateur' dans cette langue?",
            de: "Wie sagt man 'Computer' in dieser Sprache?",
            it: "Come si dice 'computer' in questa lingua?",
            pt: "Como se diz 'computador' nesta língua?"
          },
          options: ["Computer", "Television", "Phone", "Tablet"],
          correctIndex: 0
        },
        {
          type: "audio",
          prompt: {
            en: "Arrange the words to form the sentence you hear",
            es: "Ordena las palabras para formar la frase que escuchas",
            fr: "Organisez les mots pour former la phrase que vous entendez",
            de: "Ordnen Sie die Wörter, um den Satz zu bilden, den Sie hören",
            it: "Ordina le parole per formare la frase che senti",
            pt: "Organize as palavras para formar a frase que você ouve"
          },
          audio: {
            text: "Eu gosto de ir ao cinema com meus amigos e minha família",
            lang: "pt-PT"
          },
          options: ["Eu", "gosto", "de", "ir", "ao", "cinema", "com", "meus", "amigos", "e", "minha", "família"],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
      ]
    }
  }
};