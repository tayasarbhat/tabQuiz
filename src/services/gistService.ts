import { Octokit } from '@octokit/rest';

const GIST_ID = import.meta.env.VITE_GIST_ID;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

if (!GIST_ID || !GITHUB_TOKEN) {
  console.warn('GitHub Gist credentials not found. Scores will not be saved.');
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

interface ScoreEntry {
  name: string;
  score: number;
  subject: string;
  timestamp: string;
}

export const saveScore = async (scoreData: ScoreEntry): Promise<void> => {
  if (!GIST_ID || !GITHUB_TOKEN) {
    console.warn('Unable to save score: GitHub credentials not configured');
    return;
  }

  try {
    // Get current scores
    const currentGist = await octokit.gists.get({ gist_id: GIST_ID });
    const content = currentGist.data.files['scores.json']?.content;
    const scores: ScoreEntry[] = content ? JSON.parse(content) : [];

    // Add new score
    scores.push(scoreData);

    // Update Gist
    await octokit.gists.update({
      gist_id: GIST_ID,
      files: {
        'scores.json': {
          content: JSON.stringify(scores, null, 2)
        }
      }
    });
  } catch (error) {
    console.error('Error saving score:', error);
    throw new Error('Failed to save score to leaderboard');
  }
};

export const getScores = async (): Promise<ScoreEntry[]> => {
  if (!GIST_ID || !GITHUB_TOKEN) {
    console.warn('Unable to fetch scores: GitHub credentials not configured');
    return [];
  }

  try {
    const response = await octokit.gists.get({ gist_id: GIST_ID });
    const content = response.data.files['scores.json']?.content;
    return content ? JSON.parse(content) : [];
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch leaderboard data');
  }
};