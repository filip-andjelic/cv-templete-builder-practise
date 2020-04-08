import {UtilService} from "./util.service";
import {ListenerService} from "./listener.service";
import {StoreService} from "./store.service";
import {ConstantsService} from "./constants.service";

const urlBase = ConstantsService.URL_BASE;
const endpointUrls = {
    playerSettings: urlBase + 'video/playerSettings',
    getIP: 'https://api.ipify.org?format=json',
    loginAttempt: urlBase + 'loginAttempt'
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
        //console.log('Data -> ', data);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((data) => {
            //console.log('SUCCESS -> ', data);
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
        if (UtilService.isNumber(data)) {
            return data;
        }
        if (UtilService.isString(data)) {
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

        UtilService.loopThroughItems(data, (property, key) => {
            if (UtilService.isString(key)) {
                key = key.replace(/\\"/g, '').replace(/\\'/g, '');
            }

            prettyData[key] = ApiService.prettifyResponse(property);
        });

        return prettyData;
    },
    endpoints: {
        loginAttempt: (data) => {
            return ApiService.returnPromise({
                status: 'OK',
                error: false,
                message: 'SERVER_RESPONSE_LOGIN',
                data: {
                    "user": {
                        "firstName": "Filip",
                        "lastName": "Andjelic"
                    },
                    "data": {
                        "groupName": "Grupa P3-1",
                        "startDate": "24.02.2020.",
                        "endDate": "06.04.2020.",
                        "courseName": "Plavi Kurs",
                        "coursePrice": "240",
                        "paidPrice": "240",
                        "colleagues": [{
                            "name": "Marko Markovic",
                            "progress": "22",
                            "slackUrl": "",
                            "email": "marko@oykos-hub.com",
                            "githubUrl": "",
                            "linkedinUrl": "",
                            "groupName": "Grupa P3-1"
                        }, {
                            "name": "Dunja Zivkovic",
                            "progress": "42",
                            "slackUrl": "",
                            "email": "dunja@oykos-hub.com",
                            "githubUrl": "",
                            "linkedinUrl": "",
                            "groupName": "Grupa P3-1"
                        }, {
                            "name": "Jovan Petrovic",
                            "progress": "22",
                            "slackUrl": "",
                            "email": "jovan@oykos-hub.com",
                            "githubUrl": "",
                            "linkedinUrl": "",
                            "groupName": "Grupa P3-1"
                        }]
                    }
                }
            }, 1000);
            return ApiService.postRequest(endpoints.loginAttempt, data).then((response) => {

            });
        },
        getIP: () => {
            return ApiService.getRequest(endpointUrls.getIP).then((response) => {
                // Store data in localStorage and update cached data.
                StoreService.updateStoreData(response);
            });
        },
        watchBeacon: (data) => {
            navigator.sendBeacon(endpointUrls.watch, data);
        }
    }
};
