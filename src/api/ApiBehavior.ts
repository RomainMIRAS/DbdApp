const baseURL = 'https://dbd.tricky.lol/api';

// use overwolf.web.sendHttpRequest
export const ApiBehavior = {
    get: async (path: string) => {
        const url = `${baseURL}${path}`;
        console.log(`GET ${url}`);
        return overwolf.web.sendHttpRequest(url, overwolf.web.enums.HttpRequestMethods.GET, null, null, (res) => {
            console.log(`GET ${url} response: ${res.statusCode} ${res.data}`);
            return res;
        });
    },
    post: async (path: string, data: any) => {
        const url = `${baseURL}${path}`;
        console.log(`POST ${url}`);
        return overwolf.web.sendHttpRequest(url, overwolf.web.enums.HttpRequestMethods.POST, null, data, (res) => {
            console.log(`POST ${url} response: ${res.statusCode} ${res.data}`);
            return res;
        });
    }
};


