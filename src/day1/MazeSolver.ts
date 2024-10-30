const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // base case
    if (
        curr.x >= maze[0].length ||
        curr.x < 0 ||
        curr.y >= maze.length ||
        curr.y < 0
    ) {
        return false;
    }

    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    // recurse -> pre - recurse - post
    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            return true;
        }
    }

    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = Array.from(new Array(maze.length), () =>
        new Array(maze[0].length).fill(false),
    );
    const path: Point[] = [];

    walk(maze, wall, start, end, seen, path);
    return path;
}
