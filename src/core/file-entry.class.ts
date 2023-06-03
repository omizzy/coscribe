/**
 *
 */
export default class FileEntry {
    /**
     *
     * @param file
     */
    constructor(
        protected readonly file: string,
        protected authors: Set<string>,
    ) {}

    /**
     *
     * @returns
     */
    getFile(): string {
        return this.file;
    }

    /**
     *
     * @returns
     */
    getAuthors(): Set<string> {
        return this.authors;
    }

    /**
     *
     * @returns
     */
    public toString(): string {
        return `${this.file} ${Array.from(this.authors).sort().join(' ')}`;
    }
}
