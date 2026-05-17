import User from './user'
import Token from './token'
import Playlist from './playlist'

// Future plans: I'm not 100% sure if I'll need a model for games
// I'd be acquiring game data from the RetroAchievements API, but I'm not sure if it'd
// be safer to acquire that seperately (do I need to worry about users implementing false data?)
// or if I'd want to cache that information to decrease the calls I would make

export default {
    User,
    Token,
    Playlist
}