import { AI_CONFIG } from './config.js';

export async function generateIcebergData(topic, type, levels) {
  try {
    const prompt = generateIcebergPrompt(topic, type, levels);
    
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: AI_CONFIG.systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      json: true
    });
    
    // Parse the JSON response
    return JSON.parse(completion.content);
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate iceberg data');
  }
}

function generateIcebergPrompt(topic, type, levels) {
  let specificInstructions = '';

  if (type === 'custom') {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes('food') || lowerTopic.includes('cooking') || lowerTopic.includes('cuisine')) {
      specificInstructions = `
      Focus on actual findings in food like:
      - Foreign objects found (hair, plastic, metal)
      - Surprising ingredients or contaminants
      - Manufacturing errors or quality control issues
      - Storage or handling incidents
      - Unexpected color changes or reactions
      - Packaging mishaps
      Avoid focusing on deliberately dangerous foods or toxic ingredients.`;
    } else if (lowerTopic.includes('tech') || lowerTopic.includes('technology')) {
      specificInstructions = `
      Focus on actual technology issues like:
      - Software glitches and bugs
      - Hardware malfunctions
      - User interface mistakes
      - Data storage failures
      - Network problems
      - Security vulnerabilities
      Avoid focusing on hypothetical or future technology.`;
    } else if (lowerTopic.includes('school') || lowerTopic.includes('education')) {
      specificInstructions = `
      Focus on actual school incidents like:
      - Unusual classroom events
      - Strange school rules or policies
      - Odd teaching methods
      - Peculiar student traditions
      - Unexpected school facilities
      - Administrative mishaps
      - Focus on dangerous or harmful incidents.`;
    }
  }

  return `Generate a ${levels}-level research iceberg for the topic: "${topic}". Each level should have EXACTLY 3 facts/items/examples, getting progressively more ${type === 'danger' ? 'dangerous and disturbing' : type === 'mystery' ? 'mysterious and enigmatic' : 'obscure and unusual'}.

  ${specificInstructions}

  Requirements:
  - All information must always be factually accurate and verifiable. Provide citations if possible, if unable to do this use best documented conspiracies or theories or info.
  - Each fact must include an imagePrompt field to generate an image related to the fact.
  - Each fact must include 2-3 sentences for each of the following sections: description, significance, and controversy (if any). Be detailed.
  - If the user's topic includes "DO NOT" or similar negative instructions, those elements must be completely omitted.
  - Facts should be real, documented cases or findings from the most well-known (level 1) down to the most obscure and controversial (last level).
  - Each entry should be a specific, concrete example rather than a general category or abstract information.
  - Focus on actual occurrences and findings rather than theories or possibilities.

  Guidelines for ${type === 'custom' ? 'Standard' : type.charAt(0).toUpperCase() + type.slice(1)} Mode:
  ${generateLevelGuidelines(type, levels)}

  Return the response directly as JSON following this schema exactly, with no additional text:
  {
    "levels": [
      {
        "depth": 1,
        "title": "Surface Level",
        "facts": [
          {
            "name": "Specific Example Name",
            "description": "Detailed description of actual finding (2-3 sentences).",
            "significance": "Real-world impact (2-3 sentences).",
            "controversy": "Controversy surrounding this fact (2-3 sentences).",
            "imagePrompt": "An image of..."
          }
        ]
      }
    ]
  }`;
}

function generateLevelGuidelines(type, levels) {
  let guidelines = '';
  for (let i = 1; i <= levels; i++) {
    const title = getLevelTitle(i, type);
    guidelines += `- ${type === 'custom' ? title : `Level ${i} (${title})`}: ${getLevelDescription(i, type, levels)}\n`;
  }
  return guidelines;
}

function getLevelTitle(depth, type) {
  if (type === 'danger') {
    const titles = {
      1: 'Safe',
      2: 'Caution',
      3: 'Warning',
      4: 'Danger',
      5: 'Extreme Danger',
      6: 'Critical',
      7: 'Deadly'
    };
    return titles[depth] || `Level ${depth}`;
  } else if (type === 'mystery') {
    const titles = {
      1: 'Common Knowledge',
      2: 'Lesser Known',
      3: 'Hidden Truth',
      4: 'Obscure',
      5: 'Enigmatic',
      6: 'Forbidden',
      7: 'Ancient Secret'
    };
    return titles[depth] || `Level ${depth}`;
  } else {
    const category = 'custom';
    let titles;
    if (category.includes('food') || category.includes('cooking') || category.includes('cuisine')) {
      titles = {
        1: 'Mostly Found',
        2: 'Sometimes Found',
        3: 'Rarely Found',
        4: 'Strangely Found',
        5: 'Unexpectedly Found',
        6: 'Surprisingly Found',
        7: 'Shockingly Found'
      };
    } else if (category.includes('science') || category.includes('research') || category.includes('discovery')) {
      titles = {
        1: 'Established Theory',
        2: 'Recent Findings',
        3: 'Ongoing Research',
        4: 'Experimental',
        5: 'Theoretical',
        6: 'Groundbreaking',
        7: 'Revolutionary'
      };
    } else if (category.includes('history') || category.includes('ancient') || category.includes('civilization')) {
      titles = {
        1: 'Documented',
        2: 'Lesser Known',
        3: 'Partially Lost',
        4: 'Forgotten',
        5: 'Mysterious',
        6: 'Legendary',
        7: 'Mythical'
      };
    } else if (category.includes('tech') || category.includes('technology') || category.includes('digital')) {
      titles = {
        1: 'Consumer Grade',
        2: 'Professional',
        3: 'Cutting Edge',
        4: 'Experimental',
        5: 'Prototype',
        6: 'Classified',
        7: 'Future Tech'
      };
    } else if (category.includes('art') || category.includes('culture') || category.includes('creative')) {
      titles = {
        1: 'Mainstream',
        2: 'Underground',
        3: 'Avant-garde',
        4: 'Experimental',
        5: 'Revolutionary',
        6: 'Visionary',
        7: 'Transcendent'
      };
    } else if (category.includes('nature') || category.includes('animal') || category.includes('wildlife')) {
      titles = {
        1: 'Common Species',
        2: 'Rare Finds',
        3: 'Endangered',
        4: 'Near Mythical',
        5: 'Recently Discovered',
        6: 'Unconfirmed',
        7: 'Legendary'
      };
    } else {
      titles = {
        1: 'Surface Level',
        2: 'Intermediate',
        3: 'Advanced',
        4: 'Expert',
        5: 'Specialist',
        6: 'Master',
        7: 'Ultimate'
      };
    }
    return titles[depth] || `Level ${depth}`;
  }
}

function getLevelDescription(depth, type, maxLevels) {
  const progress = depth / maxLevels;

  if (type === 'danger') {
    if (progress < 0.3) return 'Documented incidents with minimal risk';
    if (progress < 0.5) return 'Concerning cases with potential hazards';
    if (progress < 0.7) return 'Severe incidents with documented casualties';
    if (progress < 0.9) return 'Catastrophic events with widespread impact';
    return 'Existential threats and unprecedented disasters';
  }

  if (type === 'mystery') {
    if (progress < 0.3) return 'Intriguing but well-documented phenomena';
    if (progress < 0.5) return 'Unexplained incidents with multiple witnesses';
    if (progress < 0.7) return 'Cryptic discoveries with limited evidence';
    if (progress < 0.9) return 'Ancient enigmas and supernatural theories';
    return 'Reality-defying phenomena and cosmic mysteries';
  }

  if (progress < 0.3) return 'Common knowledge with detailed documentation';
  if (progress < 0.5) return 'Specialist knowledge from academic sources';
  if (progress < 0.7) return 'Obscure findings from verified archives';
  if (progress < 0.9) return 'Rare discoveries with limited documentation';
  return 'Ultra-rare cases with scholarly backing';
}

export async function generateImage(prompt) {
  try {
    const result = await websim.imageGen({
      prompt: prompt,
      aspect_ratio: "1:1"
    });
    return result.url;
  } catch (error) {
    console.error('Image generation error:', error);
    // Fallback to pollinations API
    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt);
    return `${AI_CONFIG.imageApiUrl}${encodedPrompt}?nologo=true&seed=${seed}&width=300&height=300`;
  }
}