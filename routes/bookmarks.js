import { Router } from 'express';
import { authorizeRA } from './authMiddleware';

const router = Router();

router.get('/', [authorizeRA], async (req, res) => {
    console.log(req.raAuth);
    return res.status(503).send("Get bookmarks for user");
})

router.put('/:gameid/add', async (req, res) => {
    return res.status(503).send("Add bookmark");
})

router.put('/:gameid/remove', async (req, res) => {
    return res.status(503).send("Remove bookmark");
})

export default router;