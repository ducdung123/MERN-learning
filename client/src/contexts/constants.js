export const apiUrl = 
process.env.NODE_ENV !== 'production' ? 
'https://young-reaches-78508.herokuapp.com/api' :  'https://young-reaches-78508.herokuapp.com/api';
// http://localhost:5000/api
export const LOCAl_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POST_LOADED_FAILE = 'POST_LOADED_FAILE';
export const POST_LOADED_SUCCESS = 'POST_LOADED_SUCCESS';
export const POST_CREATED = 'POST_CREATED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';