/**
 *
 */
export default interface CoscribeGitInterface {
    /**
     *
     */
    getTrackedFiles(): string[];

    /**
     *
     * @param baseBranch
     * @param targetBranch
     */
    getChangedFiles(baseBranch: string, targetBranch: string): string[];

    /**
     *
     * @param file
     */
    getTrackedFileAuthors(file: string): string[];

    /**
     *
     */
    getCurrentBranch(): string;
}
