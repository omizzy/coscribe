/**
 *
 */
export default class Branch {
    /**
     *
     * @param branch
     */
    constructor(protected readonly branch: string) {}

    /**
     *
     * @returns
     */
    toString(): string {
        return this.branch;
    }
}
