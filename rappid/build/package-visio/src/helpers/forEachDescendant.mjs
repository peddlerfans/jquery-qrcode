export default async function forEachDescendant(vel, fn) {
    const descendants = vel.children();
    while (descendants.length > 0) {
        const descendant = descendants.shift();
        if (await fn(descendant)) {
            // use `push` for breadth-first search
            // use `unshift` for depth-first search
            descendants.unshift(...descendant.children());
        }
    }
}
