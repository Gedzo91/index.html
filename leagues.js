export const LEAGUE_RANKS = [
  { name: 'Bronze', promotion: 20, color: '#CD7F32' },
  { name: 'Silver', promotion: 15, color: '#C0C0C0' },
  { name: 'Gold', promotion: 10, color: '#FFD700' },
  { name: 'Sapphire', promotion: 10, color: '#0F52BA' },
  { name: 'Ruby', promotion: 7, color: '#E0115F' },
  { name: 'Emerald', promotion: 7, color: '#50C878' },
  { name: 'Amethyst', promotion: 7, color: '#9966CC' },
  { name: 'Pearl', promotion: 7, color: '#F0EAD6' },
  { name: 'Obsidian', promotion: 5, color: '#1B1404' },
  { name: 'Diamond', promotion: 0, color: '#B9F2FF' } // No promotion from Diamond
];

export class LeagueSystem {
  constructor() {
    const room = new WebsimSocket();
    this.room = room;
    this.initializeFromStorage();
    this.checkWeekReset();
    this.initializeLeaderboard();
  }

  initializeFromStorage() {
    const leagueData = JSON.parse(localStorage.getItem('league_data') || '{}');
    this.userRank = leagueData.userRank || 0; // Start at Bronze
    this.weeklyXP = leagueData.weeklyXP || 0;
    this.leagueParticipants = leagueData.leagueParticipants || [];
    this.lastUpdate = leagueData.lastUpdate || new Date().toISOString();
    this.hasCompletedLesson = leagueData.hasCompletedLesson || false;
  }

  saveToStorage() {
    const leagueData = {
      userRank: this.userRank,
      weeklyXP: this.weeklyXP,
      leagueParticipants: this.leagueParticipants,
      lastUpdate: this.lastUpdate,
      hasCompletedLesson: this.hasCompletedLesson
    };
    localStorage.setItem('league_data', JSON.stringify(leagueData));
  }

  checkWeekReset() {
    const now = new Date();
    const lastUpdate = new Date(this.lastUpdate);
    const lastMonday = new Date(lastUpdate);
    lastMonday.setDate(lastUpdate.getDate() - lastUpdate.getDay() + 1);
    lastMonday.setHours(0, 0, 0, 0);

    const nextMonday = new Date(lastMonday);
    nextMonday.setDate(lastMonday.getDate() + 7);

    if (now >= nextMonday) {
      this.processWeekEnd();
      this.resetWeek();
    }
  }

  processWeekEnd() {
    const currentRank = LEAGUE_RANKS[this.userRank];
    if (!currentRank) return;

    // Sort participants by XP
    const sortedParticipants = [...this.leagueParticipants]
      .sort((a, b) => b.weeklyXP - a.weeklyXP);
    
    // Find user's position
    const userPosition = sortedParticipants
      .findIndex(p => p.id === 'user');

    // Check for promotion
    if (userPosition < currentRank.promotion && this.userRank < LEAGUE_RANKS.length - 1) {
      this.userRank++;
    }
  }

  resetWeek() {
    this.weeklyXP = 0;
    this.generateNewParticipants();
    this.lastUpdate = new Date().toISOString();
    this.saveToStorage();
  }

  generateNewParticipants() {
    // Generate 29 bot participants (user makes 30)
    this.leagueParticipants = Array.from({ length: 29 }, (_, i) => ({
      id: `bot_${i}`,
      name: this.generateBotName(),
      weeklyXP: 0,
      avatarUrl: `https://images.websim.ai/avatar/bot_${i}`
    }));
    
    // Add user
    this.leagueParticipants.push({
      id: 'user',
      name: 'You',
      weeklyXP: 0,
      avatarUrl: window.websim.party.client.avatarUrl
    });
  }

  generateBotName() {
    const firstNames = ['Alex', 'Sam', 'Jordan', 'Casey', 'Morgan', 'Taylor', 'Riley', 'Quinn'];
    const lastNames = ['Smith', 'Johnson', 'Lee', 'Garcia', 'Brown', 'Davis', 'Wilson'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }

  async initializeLeaderboard() {
    // Create initial leaderboard if it doesn't exist
    this.leaderboard = await this.room.collection('leaderboard_entry').getList();
    this.room.collection('leaderboard_entry').subscribe((entries) => {
      this.leaderboard = entries;
      this.updateLeaderboardUI();
    });
  }

  async addXP(xp) {
    if (!this.hasCompletedLesson) {
      this.hasCompletedLesson = true;
      this.saveToStorage();
    }

    this.weeklyXP += xp;
    
    // Update bot XPs randomly
    this.leagueParticipants = this.leagueParticipants.map(p => {
      if (p.id === 'user') {
        return { ...p, weeklyXP: this.weeklyXP };
      }
      return {
        ...p,
        weeklyXP: p.weeklyXP + (Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0)
      };
    });

    const existingEntry = this.leaderboard.find(
      entry => entry.username === this.room.party.client.username
    );

    if (existingEntry) {
      // Update existing entry
      await this.room.collection('leaderboard_entry').update(existingEntry.id, {
        xp: existingEntry.xp + xp
      });
    } else {
      // Create new entry
      await this.room.collection('leaderboard_entry').create({
        username: this.room.party.client.username,
        avatar_url: this.room.party.client.avatarUrl,
        xp: xp
      });
    }

    this.saveToStorage();
  }

  updateLeaderboardUI() {
    const leaderboardContainer = document.getElementById('leaderboard');
    if (!leaderboardContainer) return;

    // Sort leaderboard by XP
    const sortedLeaderboard = [...this.leaderboard].sort((a, b) => b.xp - a.xp);

    // Create leaderboard HTML
    leaderboardContainer.innerHTML = `
      <div class="leaderboard-header">
        <h2>Top 50 Learners</h2>
      </div>
      <div class="leaderboard-entries">
        ${sortedLeaderboard.slice(0, 50).map((entry, index) => `
          <div class="leaderboard-entry ${entry.username === this.room.party.client.username ? 'current-user' : ''}">
            <span class="rank">#${index + 1}</span>
            <img class="avatar" src="${entry.avatar_url}" alt="${entry.username}'s avatar">
            <span class="username">${entry.username}</span>
            <span class="xp">${entry.xp} XP</span>
          </div>
        `).join('')}
      </div>
    `;

    // If less than 50 entries, add empty slots
    const remainingSlots = 50 - sortedLeaderboard.length;
    if (remainingSlots > 0) {
      const emptySlots = Array(remainingSlots).fill(0).map((_, index) => `
        <div class="leaderboard-entry empty">
          <span class="rank">#${sortedLeaderboard.length + index + 1}</span>
          <div class="empty-slot">Empty Slot</div>
        </div>
      `).join('');
      leaderboardContainer.querySelector('.leaderboard-entries').innerHTML += emptySlots;
    }
  }

  getCurrentLeagueData() {
    const sortedParticipants = [...this.leagueParticipants]
      .sort((a, b) => b.weeklyXP - a.weeklyXP);
    
    const userPosition = sortedParticipants
      .findIndex(p => p.id === 'user') + 1;

    return {
      rank: LEAGUE_RANKS[this.userRank],
      participants: sortedParticipants,
      userPosition,
      weeklyXP: this.weeklyXP,
      hasCompletedLesson: this.hasCompletedLesson
    };
  }
}