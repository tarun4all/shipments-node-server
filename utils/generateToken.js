//TODO to add company key in the token and ref toke object
module.exports = (user) => {
    let {_id} = user, token = {_id, expire: (new Date((new Date).getTime() + 24*60*60*1000)), type:'access_token'}, refreshToken = {id, expire: (new Date((new Date).getTime() + 24*60*60*30000)), type:'refresh_token'};
    return {access_token: services.encrypt.encode(JSON.stringify(token)), refresh_token: services.encrypt.encod(JSON.stringify(refreshToken)), token_type: 'bearer', expires_in: token.expire.getTime()/1000, password_reset: user.first};
}