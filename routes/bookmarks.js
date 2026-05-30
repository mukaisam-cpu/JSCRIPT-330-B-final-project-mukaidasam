import { Router } from 'express';
import { authorizeRA, isAuthorized } from './authMiddleware';

import * as User from '../daos/user'

const router = Router();

router.get('/', [isAuthorized], async (req, res) => {
    return res.status(503).send("Get bookmarks for user");
})

router.put('/:gameid/add', [isAuthorized], async (req, res) => {
    const gameId = req.params.gameid;
    await User.addBookmarkForUser(req.userId, gameId);
    return res.sendStatus(200);
})

router.put('/:gameid/remove', [isAuthorized], async (req, res) => {
    const gameId = req.params.gameid;
    await User.removeBookmarkForUser(req.userId, gameId);
    return res.sendStatus(200);
})

export default router;