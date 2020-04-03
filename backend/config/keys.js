const LINKEDIN_TOKENS = {
    LINKEDIN_ID : "77nbzjih945ien",
    LINKEDIN_SECRET : "VUvfWPHgu81kzyu6"
}

const SESSION = {
    COOKIE_KEY: "mycookie"
}
const DB_USER="joemart";
const DB_PASSWORD="kiko062390";
const MONGODB = {
    MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-lqudq.mongodb.net/test?retryWrites=true&w=majority`
}
//mongodb+srv://joemart:<password>@cluster0-lqudq.mongodb.net/test?retryWrites=true&w=majority
const KEYS = {
    ...LINKEDIN_TOKENS,
    ...SESSION,
    ...MONGODB
}

module.exports = KEYS