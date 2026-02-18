import { Router } from 'express';
import { db } from '../db/db.js';
import { matches } from '../db/schema.js';
import { createMatchSchema, listMatchesQuerySchema } from '../validation/matches.js';
import { getMatchStatus } from '../utils/match-status.js';

export const matchRouter = Router();

// ─── Routes ────────────────────────────────────────────────────────────────────

matchRouter.get('/', async (req, res) => {
    const parsed = listMatchesQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.format() });
    }

    const limit = parsed.data.limit ?? 50;

    try {
        const rows = await db
            .select()
            .from(matches)
            .orderBy(matches.startTime.desc())
            .limit(limit);

        return res.status(200).json({ data: rows });
    } catch (e) {
        console.error('Failed to fetch matches:', e);
        return res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

matchRouter.post('/', async (req, res) => {
    const parsed = createMatchSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.format() });
    }

    const { homeTeam, awayTeam, sport, startTime, endTime, homeScore, awayScore } = parsed.data;

    try {
        const [event] = await db
            .insert(matches)
            .values({
                homeTeam,
                awayTeam,
                sport,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                homeScore,
                awayScore,
                status: getMatchStatus(startTime, endTime),
            })
            .returning();

        res.status(201).json({ data: event });
    } catch (e) {
        console.error('Failed to create match:', e);
        res.status(500).json({ error: 'Failed to create the match' });
    }
});