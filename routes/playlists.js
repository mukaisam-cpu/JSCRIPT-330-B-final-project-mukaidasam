import { Router } from 'express';
import * as Playlist from '../daos/playlist'
import { authorizeRA, isAuthorized } from './authMiddleware';
import { CastError } from 'mongoose'

const router = Router();

router.get('/:id', [isAuthorized, authorizeRA], async (req, res) => {
    try {
        const playlist = await Playlist.getPlaylistById(req.params.id);
        // Only return playlists created by the user
        if (String(req.userId) !== String(playlist.userId)) {
            return res.sendStatus(404);
        }
        return res.status(200).json(playlist);
    } catch (e) {
        if (e instanceof CastError) {
            return res.sendStatus(404);
        }
        return res.status(500).send(e.message);
    }

})

router.get('/', isAuthorized, authorizeRA, async (req, res) => {
    const queryPlaylistName = req.query.n
    let playlists = [];
    if (queryPlaylistName) {
        playlists = await Playlist.seachUsersPlaylistsByName(req.userId, queryPlaylistName);
    } else {
        playlists = await Playlist.getPlaylistsForUser(req.userId);
    }
    return res.status(200).json(playlists);
})

router.post('/', isAuthorized, async (req, res) => {
    const playlist = req.body;
    const created = await Playlist.createPlaylist({ userId: req.userId, ...playlist })
    return res.status(200).send(created);
})

router.delete('/:id', isAuthorized, async (req, res) => {
    const playlistId = req.params.id

    // Validation, don't let the user delete other users' data
    try {
        
        const playlistToDelete = await Playlist.getPlaylistById(req.params.id);
        if (!playlistToDelete || String(playlistToDelete.userId) !== String(req.userId)) {
            return res.sendStatus(404);
        }
    } catch(e) {
        if (e instanceof CastError) {
            return res.sendStatus(404);
        }
        return res.status(500).send(e.message);
    }
    
    await Playlist.deletePlaylist(req.params.id);
    return res.sendStatus(200);
})

export default router;