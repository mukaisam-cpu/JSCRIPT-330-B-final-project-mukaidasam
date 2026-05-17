import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    return res.status(200).send("Playlists get");
})

router.post('/', async (req, res) => {
    return res.status(200).send("Playlists post");
})

router.delete('/:id', async (req, res) => {
    return res.status(200).send("Playlists delete");
})

export default router;