import GitFileList from '../core/git-file-list.class';
import CoscribeGitInterface from '../git-adapters/coscribe-git.interface';

/**
 *
 */
export default class TrackedFiles extends GitFileList {
    /**
     *
     */
    constructor(protected readonly gitAdapter: CoscribeGitInterface) {
        super(gitAdapter.getTrackedFiles());
    }
}
