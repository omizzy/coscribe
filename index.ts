#! /usr/bin/env node
import { Command } from 'commander';
import Branch from './src/core/branch.class';
import CoscribeConfig from './src/core/coscribe-config.class';
import Generator from './src/coscribe-operations/generator.class';
import Updater from './src/coscribe-operations/updater.class';
import ShellJsGitAdapter from './src/git-adapters/shelljs-git-adapter.class';
import CliProgressAdapter from './src/progress-adapters/cli-progress-adapter.class';
import { FORMAT } from './src/progress-adapters/format-type.enum';
import { GenerateCommandConfig } from './src/types/generate-command-config.type';
import { UpdateCommandConfig } from './src/types/update-command-config.type';

const coscribe = new Command();
coscribe
    .command('generate')
    .description('Generate code owners file')
    .option(
        '--coscribe-file <coscribeFile>',
        'Provide another (relative path from command execution dir) location for the config file',
        'coscribe',
    )
    .action(options => {
        executeGenerate(options);
    });
coscribe
    .command('update')
    .description('Update code owners file')
    .argument(
        '<base-branch>',
        'The base branch used for the comparison of changes',
        value => {
            return new Branch(value);
        },
    )
    .option(
        '[target-branch]',
        'The target branch used for comparison of changes ',
        value => {
            return new Branch(value);
        },
    )
    .option(
        '--coscribe-file <coscribeFile>',
        'Provide another (relative path from command execution dir) location for the config file',
        'coscribe',
    )
    .action((baseBranch, options) => {
        executeUpdate(baseBranch, options);
    });

coscribe.parse(process.argv);

/**
 *
 */
function executeGenerate(generateConfig: GenerateCommandConfig): void {
    let progressBar: CliProgressAdapter;
    try {
        const { coscribeFile } = generateConfig;
        const gitAdapter = new ShellJsGitAdapter();
        progressBar = new CliProgressAdapter(FORMAT.DIRECTORIES);
        const coscribeConfig = new CoscribeConfig(coscribeFile);
        const coscribe = new Generator(gitAdapter, coscribeConfig);
        coscribe.execute(progressBar);
    } catch (error: any) {
        progressBar!.complete();
        console.error(`Error: ${error.message}`);
    }
}

/**
 *
 */
function executeUpdate(
    baseBranch: Branch,
    updateConfig: UpdateCommandConfig,
): void {
    let progressBar: CliProgressAdapter;
    try {
        const { coscribeFile, targetBranch } = updateConfig;
        const gitAdapter = new ShellJsGitAdapter();
        progressBar = new CliProgressAdapter(FORMAT.DIRECTORIES);
        const coscribeConfig = new CoscribeConfig(coscribeFile);
        const updater = new Updater(
            gitAdapter,
            coscribeConfig,
            baseBranch,
            targetBranch,
        );
        updater.execute(progressBar);
    } catch (error: any) {
        progressBar!.complete();
        console.error(`Error: ${error.message}`);
    }
}
