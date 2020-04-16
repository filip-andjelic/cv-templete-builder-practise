import {ConstantsService} from "./constants.service";
import {Utility} from "./utility.service";

const urlBase = ConstantsService.URL_BASE;
const endpointUrls = {
    loginAttempt: urlBase + 'registration-api.php'
};

/*
 *  * Usage & Purpose *
 *
 *  `ApiService` handles all requests and communication with server.
 */
export const ApiService = {
    returnPromise: (data, timeout) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, timeout ? timeout : 50);
        });
    },
    getRequest: (url) => {
        return fetch(url).then((response) => response.json())
            .then((data) => {
                return ApiService.prettifyResponse(data);
            })
            .catch((error) => {
                console.error('GET request failed! Error -> ', error);
            });
    },
    postRequest: (url, data) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                if (!data) {
                    return false;
                }

                return ApiService.prettifyResponse(data);
            }).catch((error) => {
                console.error('POST request failed. Error -> ', error);
            });
    },
    prettifyResponse: (data, log) => {
        if (!data) {
            return false;
        }
        if (Utility.isNumber(data)) {
            return data;
        }
        if (Utility.isString(data)) {
            data = data
                .replace(/\\"/g, "'").replace(/\\'/g, "'")
                .replace(/""{/g, '{').replace(/"{/g, '{')
                .replace(/}""/g, '}').replace(/}"/g, '}');

            if (data.indexOf('{') >= 0 && data.indexOf('}')) {
                data = JSON.parse(data);

                return ApiService.prettifyResponse(data);
            }

            return data;
        }
        let prettyData = {};

        Utility.loopThroughItems(data, (property, key) => {
            if (Utility.isString(key)) {
                key = key.replace(/\\"/g, '').replace(/\\'/g, '');
            }

            prettyData[key] = ApiService.prettifyResponse(property);
        });

        return prettyData;
    },
    endpoints: {
        loginAttempt: (data) => {
            return ApiService.postRequest(endpointUrls.loginAttempt, {data: data});
        }
    }
};
