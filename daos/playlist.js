import models from '../models';

export class BadDataError extends Error { }

export const getPlaylistById = async (id) => models.Playlist.findOne({ _id: id })

export const getPlaylistsForUser = async (userId) =>
    models.Playlist.find({ userId }).select({ __v: 0, userId: 0 });

export const seachUsersPlaylistsByName = async (userId, playlistName) =>
    models.Playlist.find({ userId, $text: { $search: playlistName } },
        { score: { $meta: "textScore" } },)
        .sort({ score: { $meta: "textScore" } })
        .select({ __v: 0, userId: 0 });

export const createPlaylist = async (playlistData) => {
    try {
        const created = await models.Playlist.create(playlistData);
        return created;
    } catch (e) {
        if (e.message.includes('validation failed')) {
            throw new BadDataError(e.message);
        }
        throw e;
    }
}