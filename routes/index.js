import { Router } from 'express';
import auth from './auth'
import bookmarks from './bookmarks'
import playlists from './playlists'

const router = Router();

router.use('/auth', auth);
router.use('/bookmarks', bookmarks);
router.use('/playlists', playlists);

export default router;
