/*
 *  * Usage & Purpose *
 *
 *  `Listener` manages events and hook across the Application.
 */
export const ListenerService = {
    CHANGE_NAMES: {
        TOGGLE_NOTIFICATION: "TOGGLE_NOTIFICATION"
    },
    hooks: {},
    hookOnChange: (changeType, listenerName, callback) => {
        if (!ListenerService.hooks[changeType]) {
            ListenerService.hooks[changeType] = {};
        }

        ListenerService.hooks[changeType][listenerName] = callback;
    },
    unHookFromChange: (changeType, listenerName) => {
        delete ListenerService.hooks[changeType][listenerName];
    },
    triggerHook: (changeType, data, listenerName) => {
        if (!ListenerService.hooks[changeType]) {
            return;
        }
        if (listenerName) {
            if (!ListenerService.hooks[changeType][listenerName]) {
                return;
            }
            // Trigger specific hook.
            return ListenerService.hooks[changeType][listenerName](data);
        }

        for (let listenerCallback in ListenerService.hooks[changeType]) {
            ListenerService.hooks[changeType][listenerCallback](data);
        }
    }
};
