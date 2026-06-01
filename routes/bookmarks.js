import { Router } from 'express';
import { authorizeRA, isAuthorized } from './authMiddleware';
import * as User from '../daos/user'
import { getGame } from '@retroachievements/api';
import { setTimeout } from "timers/promises";

const router = Router();

router.get('/', [isAuthorized, authorizeRA], async (req, res) => {
    const user = await User.getUserById(req.userId);
    const bookmarkIds = user.bookmarks.map(Number);

    // This is too much of a pain to validate so I'm just returning the game ids for now
    // let games = []
    // for (let i = 0; i < bookmarkIds.length; i++) {
    //     const gameData = await getGame(req.raAuth, { gameId: bookmarkIds[i]});
    //     // Rate limiting
    //     await setTimeout(500);
    //     games.push(gameData);
    // }
    return res.status(200).json(bookmarkIds);
})

router.put('/:gameid/add', [isAuthorized], async (req, res) => {
    const gameId = req.params.gameid;
    const user = await User.getUserById(req.userId);
    if(user.bookmarks.includes(gameId)) {
        // Should I return something else to indicate that a repeat bookmark was not added?
        return res.status(200).send("Bookmark already added");
    }
    await User.addBookmarkForUser(req.userId, gameId);
    return res.sendStatus(200);
})

router.put('/:gameid/remove', [isAuthorized], async (req, res) => {
    const gameId = req.params.gameid;
    await User.removeBookmarkForUser(req.userId, gameId);
    return res.sendStatus(200);
})

export default router;