export function encodeCursor(id: number): string {
    return Buffer
        .from(JSON.stringify({ id }))
        .toString("base64");
}

export function decodeCursor(cursor: string): number {
    const decoded = Buffer
        .from(cursor, "base64")
        .toString("utf-8");

    const data = JSON.parse(decoded);

    return data.id;
}
