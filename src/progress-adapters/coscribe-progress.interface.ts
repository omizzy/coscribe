import { FORMAT } from './format-type.enum';
import { StartConfig } from './start-config.type';
import { UpdateConfig } from './update-config.type';

/**
 *
 */
export default interface CoscribeProgressInterface {
    /**
     *
     * @param config
     */
    start(config: StartConfig): void;

    /**
     *
     * @param format
     */
    reset(format: FORMAT): void;

    /**
     *
     * @param config
     */
    update(config: UpdateConfig): void;

    /**
     *
     */
    complete(): void;
}
