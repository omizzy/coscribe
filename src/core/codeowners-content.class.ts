import FileEntry from './file-entry.class';

/**
 *
 */
export default class CodeOwnersContent {
    /**
     *
     * @param entries
     * @param content
     */
    constructor(
        private readonly entries: Map<string, FileEntry>,
        private content = '',
    ) {
        for (const [file, entry] of this.entries) {
            this.content += `${file} ${Array.from(entry.getAuthors()).join(
                ' ',
            )}\n`;
        }
    }

    /**
     *
     * @returns
     */
    toString(): string {
        return `${this.content}`;
    }
}
