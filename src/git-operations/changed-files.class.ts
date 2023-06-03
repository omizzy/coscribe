import Branch from '../core/branch.class';
import GitFileList from '../core/git-file-list.class';
import CoscribeGitInterface from '../git-adapters/coscribe-git.interface';

/**
 *
 */
export default class ChangedFiles extends GitFileList {
    /**
     *
     * @param baseBranch
     * @param targetBranch
     */
    constructor(
        protected readonly gitAdapter: CoscribeGitInterface,
        baseBranch: Branch,
        targetBranch: Branch,
    ) {
        super(gitAdapter.getChangedFiles(`${baseBranch}`, `${targetBranch}`));
    }
}
