interface setLocalStorageInterface {
    key: string;
    value: unknown;
    expiredInMinutes: number
}
export const setLocalStorageItem = ({key, value, expiredInMinutes}: setLocalStorageInterface) => {
    const now = new Date();

    const item = {
        value,
        expiry: 99
    };

    if (expiredInMinutes)
        item.expiry = now.getTime() + expiredInMinutes * 60 * 1000;

    localStorage.setItem(key, JSON.stringify(item));
};