import { Router } from 'express';
import * as Playlist from '../daos/playlist'
import { authorizeRA, isAuthorized } from './authMiddleware';

const router = Router();

router.get('/', [isAuthorized, authorizeRA], async (req, res) => {
    const playlists = await Playlist.getPlaylistsForUser(req.userId);
    return res.status(200).send(playlists);
})

router.post('/', [isAuthorized], async (req, res) => {
    const playlist = req.body;
    await Playlist.createPlaylist({userId: req.userId, ...playlist})
    return res.status(200).send("Playlists post");
})

router.delete('/:id', [isAuthorized], async (req, res) => {
    return res.status(200).send("Playlists delete");
})

export default router;