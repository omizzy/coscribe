import fs from 'fs';
import CodeOwnersContent from './codeowners-content.class';
import FileEntry from './file-entry.class';

/**
 *
 */
export default class CodeOwnersFile {
    private entries: Map<string, FileEntry>;

    /**
     *
     * @param codeOwnersFilePath
     */
    constructor(private readonly codeOwnersFilePath: string) {
        if (!fs.existsSync(this.codeOwnersFilePath)) {
            throw new Error(
                `${this.codeOwnersFilePath} file does not exist, exiting..`,
            );
        }
        this.entries = new Map<string, FileEntry>();
    }

    /**
     *
     */
    public loadEntries(): void {
        const data = fs.readFileSync(this.codeOwnersFilePath, 'utf8');
        data.split(/\n/).forEach(line => {
            const parsed = line.split(' ');
            const file = parsed.shift();
            if (file === undefined) {
                console.warn(`Misconfigured line found: ${line}, skipping..`);
                return;
            }
            const authors = new Set<string>(parsed);
            const presetFileEntry = new FileEntry(file, authors);
            this.entries.set(file, presetFileEntry);
        });
    }

    /**
     *
     */
    public clear(): void {
        try {
            fs.truncateSync(this.codeOwnersFilePath);
        } catch (error) {
            throw new Error(
                `Could not clear file contents from ${this.codeOwnersFilePath}`,
            );
        }
    }

    /**
     *
     * @param fileEntry
     */
    public upsertFileEntry(fileEntry: FileEntry): void {
        const file = fileEntry.getFile();
        this.entries.set(file, fileEntry);
    }

    /**
     *
     */
    public commit(): void {
        try {
            const content = new CodeOwnersContent(this.entries);
            fs.writeFileSync(this.codeOwnersFilePath, `${content}`);
        } catch (error) {
            throw new Error(
                `Could not commit file contents to ${this.codeOwnersFilePath}`,
            );
        }
    }
}
