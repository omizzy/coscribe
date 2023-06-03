import Branch from '../core/branch.class';
import CoscribeConfig from '../core/coscribe-config.class';
import CoscribeGitInterface from '../git-adapters/coscribe-git.interface';
import ChangedFiles from '../git-operations/changed-files.class';
import CurrentBranch from '../git-operations/current-branch.class';
import CoscribeProgressInterface from '../progress-adapters/coscribe-progress.interface';
import { CoscribeOperationResult } from '../types/coscribe-operation-result.type';
import CoscribeOperation from './coscribe-operation.class';

/**
 *
 */
export default class Updater extends CoscribeOperation {
    /**
     *
     * @param coscribeConfig
     * @param baseBranch
     * @param targetBranch
     */
    constructor(
        gitAdapter: CoscribeGitInterface,
        coscribeConfig: CoscribeConfig,
        private readonly baseBranch: Branch,
        private targetBranch?: Branch,
    ) {
        super(gitAdapter, coscribeConfig);
        this.targetBranch = this.targetBranch ?? new CurrentBranch(gitAdapter);
    }

    /**
     *
     */
    public execute(
        progressTracker?: CoscribeProgressInterface,
    ): CoscribeOperationResult {
        this.processPresetDirectories(progressTracker);
        const files = new ChangedFiles(
            this.gitAdapter,
            this.baseBranch,
            this.targetBranch!,
        );
        this.codeOwnersFile.loadEntries();
        return this.processFiles(files, progressTracker);
    }
}
