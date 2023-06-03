/**
 *
 */
export default abstract class GitFileList implements IterableIterator<string> {
    /**
     *
     */
    private pointer = 0;

    /**
     *
     */
    public readonly length: number;

    /**
     *
     * @param fileList
     */
    constructor(protected readonly fileList: string[]) {
        this.length = fileList.length;
    }

    /**
     *
     * @param args
     */
    next(...args: [] | [undefined]): IteratorResult<string, any> {
        if (this.pointer < this.fileList.length) {
            return {
                done: false,
                value: this.fileList[this.pointer++],
            };
        } else {
            return {
                done: true,
                value: null,
            };
        }
    }

    /**
     *
     * @returns
     */
    [Symbol.iterator](): IterableIterator<string> {
        return this;
    }
}
