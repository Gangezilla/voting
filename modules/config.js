module.exports = {
	'facebookAuth': {
	  appID : process.env.fbVoteID,
	  appSecret : process.env.fbVoteSecret,
	  callbackUrl : 'http://localhost:8080/auth/facebook/callback'
	}
};