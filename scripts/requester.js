const baseUrl = 'https://spa-exercise.firebaseio.com/';

function makeHeader (type,data){
    const header = {
        method : type,
        headers : {
            "Content-Type" : 'application/json'
        }
        };
        if (!type !=="GET") {
            header.body = JSON.stringify(data);
    }
    return header;
}
function makeRequest (type,url,data){
    const headers = makeHeader(type,data);
    return fetch (baseUrl+url,headers)
    .then(errorHandler)
    .then(deserialize)
    .catch(console.error);
}

function errorHandler(res){
    if(!res.ok){
        throw new Error('somethins is wrong');
    }
    return res;
}
function deserialize(res) {
    return res.json();
}
const get = makeRequest.bind(undefined,"GET");
const post = makeRequest.bind(undefined,"POST");
const put = makeRequest.bind(undefined,"PUT");
const remove = makeRequest.bind(undefined,"DELETE");
const patch = makeRequest.bind(undefined,"PATCH");

export default {
    get,
    post,
    put,
    remove,
    patch
}