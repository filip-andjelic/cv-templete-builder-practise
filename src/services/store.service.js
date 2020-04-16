// Internal dependencies
import {Utility} from './utility.service';
import {ConstantsService} from "./constants.service";

const localStorageKey = ConstantsService.LOCAL_STORAGE_KEY;
const localStorageAPI = {
    update: (data) => {
        if (localStorage) {
            const localStorageData = data ? data : {};

            localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));

            return true;
        }

        return false;
    },
    get: () => {
        const data = localStorage.getItem(localStorageKey);

        return JSON.parse(data);
    }
};
let cachedData = {};

export const StoreService = {
    initialize: () => {
        // Update data from local storage if existing.
        let storage = localStorageAPI.get();

        if (storage) {
            cachedData = storage;
        } else {
            cachedData = StoreService.getEmptyData();
        }

        localStorageAPI.update(cachedData);

        StoreService.hooks = {};
    },
    getEmptyData: () => {
        return {
            failedLoginAttempts: 0,
            loginSuccess: false,
            user: {
                email: '',
                firstName: '',
                lastName: '',
                token: ''
            }
        };
    },
    getStoreData: () => {
        return Utility.clone(cachedData);
    },
    getStoreProperty: (property) => {
        const currentStore = Utility.clone(cachedData);

        if (!property) return null;

        return currentStore[property];
    },
    updateStoreData: (data) => {
        Utility.loopThroughItems(data, (value, key) => {
            cachedData[key] = value;
        });

        localStorageAPI.update(cachedData);

        const clonedData = StoreService.getStoreData();

        Utility.loopThroughItems(StoreService.hooks, (hookCallback) => {
            hookCallback(clonedData);
        });
    },
    updateStoreProperty: (property, value) => {
        if (!property) return null;

        cachedData[property] = value;

        localStorageAPI.update(cachedData);

        const clonedData = StoreService.getStoreData();

        Utility.loopThroughItems(StoreService.hooks, (hookCallback) => {
            hookCallback(clonedData);
        });
    },
    hookOnStoreUpdate: (hookName, hookCallback) => {
        StoreService.hooks[hookName] = hookCallback;
    },
    deleteHookOnStoreUpdate: (hookName) => {
        delete StoreService.hooks[hookName];
    },
    clearStoreData: () => {
        let emptyData = StoreService.getEmptyData();

        cachedData = emptyData;

        localStorageAPI.update(cachedData);
    }
};