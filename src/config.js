import { key } from './AutorizationKey.js';
const config = {
    headers: {
        authorization: key,
        contentType: 'application/json'
    }
}
export { config };