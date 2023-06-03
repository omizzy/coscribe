import CoscribeConfig from '../core/coscribe-config.class';
import CoscribeGitInterface from '../git-adapters/coscribe-git.interface';
import TrackedFiles from '../git-operations/tracked-files.class';
import CoscribeProgressInterface from '../progress-adapters/coscribe-progress.interface';
import { CoscribeOperationResult } from '../types/coscribe-operation-result.type';
import CoscribeOperation from './coscribe-operation.class';

/**
 *
 */
export default class Generator extends CoscribeOperation {
    /**
     *
     */
    constructor(
        protected readonly gitAdapter: CoscribeGitInterface,
        coscribeConfig: CoscribeConfig,
    ) {
        super(gitAdapter, coscribeConfig);
    }

    /**
     *
     */
    public execute(
        progressTracker?: CoscribeProgressInterface,
    ): CoscribeOperationResult {
        this.processPresetDirectories(progressTracker);
        const files = new TrackedFiles(this.gitAdapter);
        return this.processFiles(files, progressTracker);
    }
}
