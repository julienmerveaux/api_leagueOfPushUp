const RIOT_API_KEY = process.env.RIOT_API_KEY;

async function verifyRiotAccount(username, tagline, region) {
    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tagline}?api_key=${RIOT_API_KEY}`;

    const response = await fetch(url, {
        headers: {
            "X-Riot-Token": RIOT_API_KEY
        }
    });

    if (!response.ok) {
        throw new Error("Compte Riot introuvable ou API non accessible.");
    }

    return await response.json();
}

module.exports = {
    verifyRiotAccount
};