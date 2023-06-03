import fs from 'fs';
import ignore, { Ignore } from 'ignore';
import YAML from 'yaml';
import {
    AuthorRemapType,
    OmittedAuthors,
    OmittedPatterns,
    PresetDirectories,
    PresetFiles,
} from './coscribe-config.types';

/**
 *
 */
export default class CoscribeConfig {
    private codeOwnersFile = 'CODEOWNERS';
    private authorRemap: AuthorRemapType = {};
    private omittedAuthors: OmittedAuthors = [];
    private presetDirectories: PresetDirectories = {};
    private ignoreForPresetDirectories: Ignore;
    private presetFiles: PresetFiles = {};
    private omittedPatterns: OmittedPatterns = [];
    private ignoreForOmittedFiles: Ignore;
    private cwd: string;

    /**
     * Allow for generic assignment
     */
    [property: string]: any;

    /**
     *
     */
    constructor(coscribeFile?: string) {
        this.cwd = process.cwd();
        this.ignoreForOmittedFiles = ignore();
        this.ignoreForPresetDirectories = ignore();

        const configFile = this.resolveConfigFile(coscribeFile);
        if (!configFile) {
            console.debug('No coscribe file found, continuing with defaults..');
        } else {
            const content = fs.readFileSync(configFile, 'utf8');
            const config = YAML.parse(content);
            if (!config) {
                throw new Error('Config file could not be parsed');
            }
            for (const property of Object.keys(config)) {
                this[property] = config[property];
            }

            this.omittedPatterns.forEach(omittedPattern =>
                this.ignoreForOmittedFiles.add(omittedPattern),
            );
            Object.keys(this.getPresetDirectories()).forEach(directory =>
                this.ignoreForPresetDirectories.add(directory),
            );
        }
    }

    /**
     *
     */
    private resolveConfigFile(coscribeConfig?: string) {
        if (!coscribeConfig) {
            return null;
        }
        if (
            !coscribeConfig.endsWith('.yml') &&
            !coscribeConfig.endsWith('yaml')
        ) {
            // eager search
            for (const extension of ['.yml', '.yaml']) {
                const configFile = `${this.cwd}/${coscribeConfig}${extension}`;
                if (fs.existsSync(configFile)) {
                    return configFile;
                }
            }
        } else {
            const configFile = `${this.cwd}/${coscribeConfig}`;
            if (fs.existsSync(configFile)) {
                return configFile;
            }
        }

        return null;
    }

    /**
     *
     */
    public getCodeOwnersFilePath(): string {
        return `${this.cwd}/${this.codeOwnersFile}`;
    }

    /**
     *
     */
    public isFileOmittedByPattern(file: string): boolean {
        return this.ignoreForOmittedFiles.ignores(file);
    }

    /**
     *
     * @param file
     * @returns
     */
    public isFileOmittedByDirectoryPattern(file: string): boolean {
        return this.ignoreForPresetDirectories.ignores(file);
    }

    /**
     *
     */
    public isOmittedAuthor(author: string): boolean {
        return !!this.omittedAuthors?.includes(author);
    }

    /**
     *
     */
    public isAuthorRemapped(author: string): string | undefined {
        return this.authorRemap[author];
    }

    /**
     *
     */
    public getPresetDirectories(): PresetDirectories {
        return this.presetDirectories;
    }

    /**
     *
     */
    public isPresetFile(file: string): boolean {
        return typeof this.presetFiles[file] !== 'undefined';
    }

    /**
     *
     */
    public getPresetFile(file: string): string[] {
        return this.presetFiles[file] as string[];
    }
}
