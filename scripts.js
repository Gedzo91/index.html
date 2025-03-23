import { generateIcebergData, generateImage } from './ai-service.js';
import { AI_CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const categoryInput = document.getElementById('categoryInput');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const progressBar = document.getElementById('progressBar');
  const icebergChart = document.getElementById('icebergChart');
  const topicType = document.getElementById('topicType');
  const levelCount = document.getElementById('levelCount');
  const researchTextEl = document.createElement('div'); // Hidden element to store research
  researchTextEl.id = 'researchText';
  researchTextEl.style.display = 'none';
  document.body.appendChild(researchTextEl);

  let icebergData = [];

  generateBtn.addEventListener('click', () => generateIceberg(categoryInput.value.trim()));
  downloadBtn.addEventListener('click', downloadAllResearch);
  topicType.addEventListener('change', updatePlaceholder);

  import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm')
    .then(module => window.JSZip = module.default)
    .catch(error => console.error("Error loading JSZip:", error));

  function updatePlaceholder() {
    const type = topicType.value;
    categoryInput.placeholder = type === 'custom'
      ? 'Enter your topic...'
      : type === 'mystery'
        ? 'e.g., Ancient Civilizations, UFO Sightings...'
        : 'e.g., Natural Disasters, Deep Sea Exploration...';
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
      const category = categoryInput.value.toLowerCase();
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

  async function generateIceberg(topic) {
    if (!topic) return;

    const type = topicType.value;
    const levels = parseInt(levelCount.value);

    if (levels < 3 || levels > 7) {
      alert('Please select between 3 and 7 levels');
      return;
    }

    toggleButtonState(generateBtn, true, 'Generating...');
    resetProgress();
    icebergChart.innerHTML = '';

    try {
      localStorage.setItem('lastTopic', topic);
      setProgress(20); // AI generation started
      
      // Use the new AI service
      const data = await generateIcebergData(topic, type, levels);
      icebergData = data.levels;
      
      setProgress(50); // AI generation completed
      
      await fetchAllImages(icebergData);
      displayIceberg(icebergData, type);
      
      // Generate research text
      generateResearchText(icebergData, topic);
    } catch (error) {
      console.error('Error generating iceberg:', error);
      alert('Error generating iceberg: ' + error.message);
    } finally {
      toggleButtonState(generateBtn, false, 'Generate');
      setProgress(100);
    }
  }

  function generateResearchText(levels, topic) {
    const researchContent = levels.reduce((acc, level) => {
      acc += `\n=== Level ${level.depth} - ${getLevelTitle(level.depth, topicType.value)} ===\n\n`;
      level.facts.forEach(fact => {
        acc += `--- ${fact.name} ---\n`;
        acc += `Description: ${fact.description}\n`;
        acc += `Significance: ${fact.significance}\n`;
        if (fact.controversy) acc += `Controversy: ${fact.controversy}\n`;
        acc += '\n';
      });
      return acc;
    }, `COMPLETE RESEARCH: ${topic.toUpperCase()}\n\n`);
    
    researchTextEl.textContent = researchContent;
  }

  async function fetchAllImages(levels) {
    let totalFacts = 0;
    let completedFacts = 0;
    
    // Count total facts
    levels.forEach(level => totalFacts += level.facts.length);
    
    const progressIncrement = 50 / totalFacts; // 50% of the progress bar for images (50-100%)
    
    // Process each level and fact
    for (const level of levels) {
      for (const fact of level.facts) {
        await generateImageForFact(fact);
        completedFacts++;
        setProgress(50 + (completedFacts * progressIncrement));
      }
    }
  }

  async function generateImageForFact(fact) {
    try {
      // Use the new AI image generation service
      fact.imageURL = await generateImage(fact.imagePrompt);
    } catch (error) {
      console.error(`Error generating image for "${fact.name}":`, error);
      // Fallback
      const seed = Math.floor(Math.random() * 1000000);
      const encodedPrompt = encodeURIComponent(fact.imagePrompt);
      fact.imageURL = `${AI_CONFIG.imageApiUrl}${encodedPrompt}?nologo=true&seed=${seed}&width=300&height=300`;
    }
  }

  function displayIceberg(levels, type) {
    icebergChart.innerHTML = '';
    levels.forEach((level) => {
      const levelDiv = document.createElement('div');
      levelDiv.className = 'level';
      levelDiv.setAttribute('data-depth', level.depth);

      const titleEl = document.createElement('h2');
      titleEl.className = 'level-title';
      titleEl.textContent = `Level ${level.depth} - ${getLevelTitle(level.depth, type)}`;
      levelDiv.appendChild(titleEl);

      const entriesList = document.createElement('ul');
      entriesList.className = 'entries';
      level.facts.forEach((fact, i) => {
        const li = document.createElement('li');
        li.textContent = fact.name;
        li.addEventListener('click', () => toggleFactDetails(fact, li));
        li.style.animationDelay = `${(i * 0.1)}s`;
        entriesList.appendChild(li);
      });
      levelDiv.appendChild(entriesList);
      icebergChart.appendChild(levelDiv);
    });
  }

  function toggleFactDetails(fact, element) {
    const existingPanel = element.nextElementSibling;
    if (existingPanel && existingPanel.classList.contains('panel-content')) {
      existingPanel.classList.toggle('active');
    } else {
      const panel = document.createElement('div');
      panel.className = 'panel-content active';
      panel.innerHTML = generateEntryContent(fact);
      element.parentNode.insertBefore(panel, element.nextSibling);
    }
  }

  function generateEntryContent(fact) {
    return `<img src="${fact.imageURL}" alt="${fact.imagePrompt}" width="300" height="300" class="float-left"/>
            <h3>${fact.name}</h3>
            <p><strong>Description</strong>: ${fact.description}</p>
            <p><strong>Significance</strong>: ${fact.significance}</p>
            ${fact.controversy ? `<p><strong>Controversy</strong>: ${fact.controversy}</p>` : ''}
            <div style="clear: both;"></div>`;
  }

  async function downloadAllResearch() {
    const category = categoryInput.value.trim();
    if (!category || !icebergData.length) {
      alert('Please generate an iceberg chart first!');
      return;
    }
    toggleButtonState(downloadBtn, true, 'Downloading...');
    resetProgress();
    try {
      const zip = new JSZip();
      const imgFolder = zip.folder('images');
      let totalFacts = 0;
      let processedFacts = 0;
      const researchContent = icebergData.reduce((acc, level) => {
        acc += `\n=== Level ${level.depth} - ${getLevelTitle(level.depth, topicType.value)} ===\n\n`;
        level.facts.forEach(fact => {
          totalFacts++;
          const content = stripHTML(generateEntryContent(fact));
          acc += `--- ${fact.name} ---\n${content}\n\n`;
        });
        return acc;
      }, `COMPLETE RESEARCH: ${category.toUpperCase()}\n\n`);
      zip.file(`${sanitizeFilename(category)}_research.txt`, researchContent);
      for (const level of icebergData) {
        for (const fact of level.facts) {
          await addImageToZip(imgFolder, fact);
          processedFacts++;
          setProgress((processedFacts / totalFacts) * 100);
        }
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      triggerDownload(zipBlob, `${sanitizeFilename(category)}_research.zip`);
    } catch (error) {
      console.error('Error downloading research:', error);
      alert('Error downloading research');
    } finally {
      toggleButtonState(downloadBtn, false, 'Download All');
      setProgress(100);
    }
  }

  async function addImageToZip(imgFolder, fact) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const imageLoaded = new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image for "${fact.name}"`));
        img.src = fact.imageURL + (fact.imageURL.includes('?') ? '&' : '?') + 'cachebust=' + new Date().getTime();
      });
      
      await imageLoaded;
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      imgFolder.file(`${sanitizeFilename(fact.name)}.jpg`, blob);
    } catch (error) {
      console.error(`Error downloading image for "${fact.name}":`, error);
      imgFolder.file(`${sanitizeFilename(fact.name)}_image_url.txt`, fact.imageURL);
    }
  }

  function toggleButtonState(button, isLoading, text) {
    button.classList.toggle('generating', isLoading);
    button.textContent = text;
  }

  function resetProgress() {
    setProgress(0);
  }

  function setProgress(percentage) {
    progressBar.style.width = `${percentage}%`;
  }

  function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
});