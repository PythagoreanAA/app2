import AsyncStorage from '@react-native-async-storage/async-storage';

export const EPISODE_DOMAINS = [
  'Work',
  'Relationship',
  'Family',
  'Conflict',
  'Uncertainty',
  'Leadership',
  'Learning',
  'Creativity',
  'Resources',
  'Self-regulation',
  'Other',
] as const;

export type EpisodeDomain = typeof EPISODE_DOMAINS[number];
export type EvidenceEffect = 'supports' | 'contradicts' | 'ambiguous';

export type EpisodeRecord = {
  id: string;
  createdAt: string;
  condition: string;
  object: string;
  action: string;
  transformation: string;
  result: string;
  /** Primary classification. Retained as `operator` for V0.3 compatibility. */
  operator: number;
  competingOperator?: number | null;
  confidence: 1 | 2 | 3 | 4 | 5;
  domain?: EpisodeDomain;
  /** Optional explicit test of an emerging operator hypothesis. */
  testedOperator?: number | null;
  evidenceEffect?: EvidenceEffect;
  note?: string;
};

const KEY = 'paa:episodes:v04';
const LEGACY_KEY = 'paa:episodes:v03';

function normalizeEpisode(value: EpisodeRecord): EpisodeRecord {
  return {
    ...value,
    competingOperator: value.competingOperator ?? null,
    testedOperator: value.testedOperator ?? null,
    evidenceEffect: value.evidenceEffect ?? 'ambiguous',
    domain: value.domain ?? 'Other',
  };
}

export async function loadEpisodes(): Promise<EpisodeRecord[]> {
  const raw = (await AsyncStorage.getItem(KEY)) ?? (await AsyncStorage.getItem(LEGACY_KEY));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as EpisodeRecord[];
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed.map(normalizeEpisode);
    // Opportunistic migration: once V0.4 reads a V0.3 record, preserve it under the new key.
    if (!(await AsyncStorage.getItem(KEY))) {
      await AsyncStorage.setItem(KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return [];
  }
}

export async function saveEpisode(episode: EpisodeRecord): Promise<void> {
  const current = await loadEpisodes();
  await AsyncStorage.setItem(KEY, JSON.stringify([normalizeEpisode(episode), ...current]));
}

export async function deleteEpisode(id: string): Promise<void> {
  const current = await loadEpisodes();
  await AsyncStorage.setItem(KEY, JSON.stringify(current.filter((e) => e.id !== id)));
}

export function makeEpisodeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function summarizeEpisodes(episodes: EpisodeRecord[]) {
  const counts = Array.from({ length: 9 }, (_, i) => ({
    operator: i + 1,
    count: 0,
    weighted: 0,
    contested: 0,
    counterevidence: 0,
  }));

  for (const episode of episodes) {
    const slot = counts[episode.operator - 1];
    if (slot) {
      slot.count += 1;
      slot.weighted += episode.confidence;
      if (episode.competingOperator) slot.contested += 1;
    }
    if (episode.testedOperator && episode.evidenceEffect === 'contradicts') {
      const tested = counts[episode.testedOperator - 1];
      if (tested) tested.counterevidence += 1;
    }
  }

  return counts.sort((a, b) => b.weighted - a.weighted || b.count - a.count || a.operator - b.operator);
}

export function summarizeDomains(episodes: EpisodeRecord[]) {
  return EPISODE_DOMAINS.map((domain) => {
    const inDomain = episodes.filter((episode) => (episode.domain ?? 'Other') === domain);
    if (!inDomain.length) return null;
    const top = summarizeEpisodes(inDomain).find((item) => item.count > 0);
    return top ? { domain, episodes: inDomain.length, operator: top.operator, weighted: top.weighted } : null;
  }).filter(Boolean) as Array<{ domain: EpisodeDomain; episodes: number; operator: number; weighted: number }>;
}

export function mostCommonConfusions(episodes: EpisodeRecord[]) {
  const map = new Map<string, { primary: number; competitor: number; count: number }>();
  for (const episode of episodes) {
    if (!episode.competingOperator || episode.competingOperator === episode.operator) continue;
    const low = Math.min(episode.operator, episode.competingOperator);
    const high = Math.max(episode.operator, episode.competingOperator);
    const key = `${low}:${high}`;
    const current = map.get(key) ?? { primary: low, competitor: high, count: 0 };
    current.count += 1;
    map.set(key, current);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.primary - b.primary);
}
