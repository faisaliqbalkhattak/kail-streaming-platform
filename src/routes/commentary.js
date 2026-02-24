import { Router } from "express";
import { db } from '../db/db.js';
import { commentary } from '../db/schema.js';
import { matchIdParamSchema } from '../validation/matches.js';
import { createCommentarySchema } from '../validation/commentary.js';

export const commentaryRouter = Router();

commentaryRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Commentary list' });
});

commentaryRouter.post('/:id', async (req, res) => {
    // Validate match ID parameter
    const paramsParsed = matchIdParamSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        return res.status(400).json({ 
            errors: paramsParsed.error.format(), 
            details: paramsParsed.error.issues 
        });
    }

    // Validate commentary data
    const bodyParsed = createCommentarySchema.safeParse(req.body);
    if (!bodyParsed.success) {
        return res.status(400).json({ 
            errors: bodyParsed.error.format(), 
            details: bodyParsed.error.issues 
        });
    }

    const matchId = paramsParsed.data.id;
    const { minutes, sequence, period, eventType, actor, team, message, metadata, tags } = bodyParsed.data;

    try {
        const [commentaryEntry] = await db
            .insert(commentary)
            .values({
                matchId,
                actor: actor || 'System',
                message,
                minute: minutes,
                sequenceNo: sequence || 1,
                details: {
                    period,
                    eventType,
                    team,
                    metadata,
                    tags
                }
            })
            .returning();
            if(res.app.locals.broadcastCommentary) {
                res.app.locals.broadcastCommentary(matchId, commentaryEntry);
            }

        res.status(201).json({ data: commentaryEntry });
    } catch (e) {
        console.error('Failed to create commentary:', e);
        res.status(500).json({ 
            error: 'Failed to create commentary', 
            details: e.message 
        });
    }
});