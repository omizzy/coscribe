import colors from 'ansi-colors';
import { SingleBar } from 'cli-progress';
import CoscribeProgressInterface from './coscribe-progress.interface';
import { FORMAT } from './format-type.enum';
import { StartConfig } from './start-config.type';
import { UpdateConfig } from './update-config.type';

/**
 *
 */
export default class CliProgressAdapter implements CoscribeProgressInterface {
    private progressBar: SingleBar;
    private formats = {
        files: [
            `Progress ${colors.cyan('{bar}')}`,
            '{percentage}%',
            '{value}/{total} Files',
            '{status}',
        ],
        directories: [
            `Progress ${colors.cyan('{bar}')}`,
            '{percentage}%',
            '{value}/{total} Directories',
            '{status}',
        ],
    };

    /**
     *
     */
    constructor(format: FORMAT) {
        const f =
            format === FORMAT.FILES
                ? this.formats.files
                : this.formats.directories;
        this.progressBar = new SingleBar({
            format: f.join(' | '),
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
        });
    }

    /**
     *
     */
    reset(format: FORMAT): void {
        const f =
            format === FORMAT.FILES
                ? this.formats.files
                : this.formats.directories;

        this.progressBar = new SingleBar({
            format: f.join(' | '),
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
        });
    }

    /**
     *
     */
    start(config: StartConfig): void {
        this.progressBar.start(config.total, config.start, {
            status: 'Initializing..',
        });
    }

    /**
     *
     */
    update(config: UpdateConfig): void {
        this.progressBar.update(config.progress, {
            status: config.status,
        });
    }

    /**
     *
     */
    complete(): void {
        this.progressBar.stop();
    }
}
