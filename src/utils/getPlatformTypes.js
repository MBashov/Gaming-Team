export default function getPlatformTypes(type) {
    const types = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

    const platFormTypes = types.map(t => ({
        value: t,
        label: t,
        selected: t === type ? 'selected' : ''
    }));

    return platFormTypes;
}