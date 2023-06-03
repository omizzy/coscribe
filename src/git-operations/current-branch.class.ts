import Branch from '../core/branch.class';
import CoscribeGitInterface from '../git-adapters/coscribe-git.interface';

/**
 *
 */
export default class CurrentBranch extends Branch {
    /**
     *
     */
    constructor(protected readonly gitAdapter: CoscribeGitInterface) {
        super(gitAdapter.getCurrentBranch());
    }
}
