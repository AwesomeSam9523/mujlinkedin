import { Router } from 'express';
import db from '../utils/db.js';
import { verifyToken } from '../utils/tokenValidator.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/create', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const { description, mentions, mediaUrl } = req.body;
        await db.query(`BEGIN`);
        const query = `INSERT INTO "Posts" ("postId", "description", "mentions", "mediaUrl", "authorId", "createdAt")
        VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`;
        const data = await db.query(query, [uuidv4(), description, mentions, mediaUrl, sub.userId]);

        const post = data.rows[0];
        // TODO: Add mentions
        await db.query(`COMMIT`);
        res.status(201).json({
            message: 'Post created successfully',
            post,
        });
    } catch (error) {
        await db.query(`ROLLBACK`);
        res.status(500).json({ message: 'Unknown error occured' });
        next(error);
    }
});

router.get('/feed', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const query = `
        SELECT 
            "Posts".*,
            "Users".*,
            CASE WHEN "Likes"."userId" IS NOT NULL THEN 1 ELSE 0 END AS "likedByMe"
        FROM 
            "Posts"
        INNER JOIN 
            "Users" ON "Posts"."authorId" = "Users"."userId"
        LEFT JOIN 
            "Likes" ON "Posts"."postId" = "Likes"."postId" AND "Likes"."userId" = $1
        ORDER BY 
            "Posts"."createdAt" DESC
        LIMIT 10;`;
        const data = await db.query(query, [sub.userId]);
        console.log(data.rows);
        res.json({ posts: data.rows });
    } catch (error) {
        res.status(500).json({ message: 'Unknown error occured' });
        next(error);
    }
});

router.post('/like', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const { postId } = req.body;
        const query = `INSERT INTO "Likes" ("postId", "userId") VALUES ($1, $2)`;
        await db.query(query, [postId, sub.userId]);
        const query2 = `UPDATE "Posts" SET "likeCount" = "likeCount" + 1 WHERE "postId" = $1`;
        await db.query(query2, [postId]);
        res.json({ message: 'Post liked' });
    } catch (error) {
        res.status(500).json({ message: 'Unknown error occured' });
        next(error);
    }
});

router.post('/unlike', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const sub = verifyToken(token);
    if (!sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const { postId } = req.body;
        const query = `DELETE FROM "Likes" WHERE "postId" = $1 AND "userId" = $2`;
        await db.query(query, [postId, sub.userId]);
        const query2 = `UPDATE "Posts" SET "likeCount" = "likeCount" - 1 WHERE "postId" = $1`;
        await db.query(query2, [postId]);
        res.json({ message: 'Post unliked' });
    } catch (error) {
        res.status(500).json({ message: 'Unknown error occured' });
        next(error);
    }
});

export default router;
