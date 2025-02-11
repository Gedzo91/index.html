// API endpoint to check if the given answer is correct for the sentence
app.post('/api/ai_completion', async (req, res) => {
  try {
    const { prompt, data } = req.body;
    const answer = data.answer;
    const correctOrder = data.correctOrder;

    // Use a language model to check if the answer is correct
    const languageModel = await import('language-model');
    const result = languageModel.checkAnswer(answer, correctOrder);
    res.json({ isCorrect: result });
  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});