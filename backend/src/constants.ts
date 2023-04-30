const MONGO_USERNAME = process.env.MONGO_USERNAME || 'ADMIN_USERNAME';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'R43etx50qCDqJpnpzWPs';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
export const MONGO_CONNECTION_STRING = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017`;
