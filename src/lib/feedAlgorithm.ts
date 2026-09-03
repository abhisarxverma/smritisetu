import { FeedActivity, ActivityAttempt, CognitiveDomain, ActivityDifficulty, MemoryItem } from '../data/types';

export interface FeedEngineContext {
  attempts: ActivityAttempt[];
  availableActivities: FeedActivity[];
  memories: MemoryItem[];
  currentDifficulty: ActivityDifficulty;
  sessionMinutes: number;
  sessionLimitMinutes: number;
  completedActivityIds: string[];
}

export interface RecommendationResult {
  nextActivity: FeedActivity;
  reason: string;
  adaptedDifficulty: ActivityDifficulty;
  isRestRecommended: boolean;
}

export class CognitiveFeedEngine {
  /**
   * Evaluates the user's active session trajectory and selects the optimal next therapeutic activity.
   */
  public static selectNextActivity(ctx: FeedEngineContext): RecommendationResult {
    const { attempts, availableActivities, sessionMinutes, sessionLimitMinutes, completedActivityIds } = ctx;

    // 1. Session Boundary & Cognitive Fatigue Check
    const completedCount = completedActivityIds.length;
    const isOverTimeLimit = sessionMinutes >= sessionLimitMinutes;
    const isCompletedBatch = completedCount >= 6 && completedCount % 5 === 0;

    // If session boundary reached or fatigue detected, recommend Rest Break
    if (isOverTimeLimit || isCompletedBatch) {
      const restActivity = availableActivities.find(a => a.type === 'rest_break');
      if (restActivity) {
        return {
          nextActivity: restActivity,
          reason: `Recommended Rest & River Breeze Pause: ${sessionMinutes} minutes of mindful engagement reached. Protecting cognitive stamina through restorative pacing.`,
          adaptedDifficulty: 'gentle',
          isRestRecommended: true
        };
      }
    }

    // 2. Recent Performance and Hesitation Analysis
    const recentAttempts = attempts.slice(-4);
    let recentAccuracy = 0.8;
    let avgHesitation = 3.5;

    if (recentAttempts.length > 0) {
      const successfulRecalls = recentAttempts.filter(a => a.outcome === 'recalled').length;
      recentAccuracy = successfulRecalls / recentAttempts.length;
      avgHesitation = recentAttempts.reduce((sum, a) => sum + a.hesitationSeconds, 0) / recentAttempts.length;
    }

    // 3. Adaptive Difficulty Calculation (Prototype Adaptive Engine)
    let adaptedDifficulty: ActivityDifficulty = ctx.currentDifficulty;
    if (recentAccuracy > 0.85 && avgHesitation < 4.0) {
      adaptedDifficulty = 'moderate';
    } else if (recentAccuracy < 0.60 || avgHesitation > 8.0) {
      adaptedDifficulty = 'gentle';
    }

    // 4. Cognitive Domain Balancing (Prevent Memory -> Memory -> Memory repetition)
    const recentDomains = recentAttempts.map(a => a.domain);
    const lastDomain = recentDomains[recentDomains.length - 1];

    // Candidate selection: activities not yet completed in this cycle (or least recently completed)
    let candidates = availableActivities.filter(
      a => !completedActivityIds.slice(-5).includes(a.id) && a.type !== 'rest_break'
    );

    if (candidates.length === 0) {
      candidates = availableActivities.filter(a => a.type !== 'rest_break');
    }

    // Filter out the exact same domain if other domains are available
    let domainBalanced = candidates.filter(a => a.domain !== lastDomain);
    if (domainBalanced.length === 0) {
      domainBalanced = candidates;
    }

    // Prioritize personal memory integration if available
    const hasUnusedPersonalPhoto = domainBalanced.find(a => a.type === 'photo_memory' && !completedActivityIds.includes(a.id));
    const nextActivity = hasUnusedPersonalPhoto || domainBalanced[Math.floor(Math.random() * domainBalanced.length)] || availableActivities[0];

    // 5. Generate Transparent Clinical/AI Explainability
    let domainReason = `Selected ${nextActivity.domain.toUpperCase()} domain to foster cross-network cognitive engagement.`;
    if (lastDomain) {
      domainReason = `Shifted from ${lastDomain.toUpperCase()} to ${nextActivity.domain.toUpperCase()} to prevent neural habituation and sensory fatigue.`;
    }

    const difficultyReason = adaptedDifficulty === 'gentle' 
      ? 'Adapted to gentle pacing with maximum visual and voice scaffolding.' 
      : 'Calibrated to steady engagement pace.';

    const reason = `${domainReason} ${difficultyReason} Personalized for Aita’s regional Tezpur heritage.`;

    return {
      nextActivity,
      reason,
      adaptedDifficulty,
      isRestRecommended: false
    };
  }
}
