import shell from 'shelljs';
import CoscribeGitInterface from './coscribe-git.interface';

/**
 *
 */
export default class ShellJsGitAdapter implements CoscribeGitInterface {
    /**
     *
     */
    private static commandDependencies = [
        'git',
        'sort',
        'grep',
        'sed',
        'awk',
        'tr',
    ];
    /**
     *
     */
    constructor() {
        shell.config.silent = true;
        for (const dependency of ShellJsGitAdapter.commandDependencies) {
            const which = `which ${dependency}`;
            const changedFilesResult = shell.exec(which);
            if (changedFilesResult.code !== 0) {
                throw new Error(`Dependecy ${dependency} not found, exiting..`);
            }
        }
    }

    /**
     *
     * @returns
     */
    getTrackedFiles(): string[] {
        const lsFilesCommand = `git ls-files | sort`;
        const fileListResult = shell.exec(lsFilesCommand);
        if (fileListResult.code !== 0) {
            throw new Error(`Command failed \`${lsFilesCommand}\``);
        }
        return fileListResult.split('\n').filter(line => line.trim() !== '');
    }

    /**
     *
     * @param baseBranch
     * @param targetBranch
     * @returns
     */
    getChangedFiles(baseBranch: string, targetBranch: string): string[] {
        const changedFilesCommand = `git diff --name-only ${baseBranch}...${targetBranch}`;
        const changedFilesResult = shell.exec(changedFilesCommand);
        if (changedFilesResult.code !== 0) {
            throw new Error(`Command failed \`${changedFilesCommand}\``);
        }
        return changedFilesResult
            .split('\n')
            .filter(line => line.trim() !== '');
    }

    /**
     *
     * @param file
     * @returns
     */
    getTrackedFileAuthors(file: string): string[] {
        const authorsCommand = `git blame --porcelain ${file} | grep -a author-mail | grep -v 'not.committed.yet' | sed 's/\<//g; s/\>//g' | awk '{print $2}' | sort -u | tr '\\n' ' '`;
        const authors = shell.exec(authorsCommand);
        if (authors.code !== 0) {
            throw new Error(`Command failed \`${authorsCommand}\``);
        }
        return authors
            .split(' ')
            .map(author => author.trim())
            .filter(author => !!author);
    }

    /**
     *
     */
    getCurrentBranch(): string {
        const currentBranchCommand = `git rev-parse --abbrev-ref HEAD`;
        const currentBranchResult = shell.exec(currentBranchCommand);
        if (currentBranchResult.code !== 0) {
            throw new Error(`Command failed \`${currentBranchCommand}\``);
        }
        const currentBranch = currentBranchResult.split('\n').shift();
        if (currentBranch === undefined) {
            throw new Error(
                `Command failed \`${currentBranchCommand}\` returned undefined value`,
            );
        }
        return currentBranch;
    }
}
