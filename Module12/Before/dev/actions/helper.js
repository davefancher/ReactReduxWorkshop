export function createRequestTypes (prefix) {
    return (
        ["REQUEST", "SUCCESS", "FAILURE"]
            .reduce(
                (obj, type) => { obj[type] = `${prefix}_${type}`; return obj; },
                {})
    );
}
