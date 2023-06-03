# Coscribe

## About

This package provides commands to generate and update `CODEOWNERS` file entries. Currently, this is done by invoking shell commands with [shelljs](https://github.com/shelljs/shelljs).

Each git-tracked file (that does not have preset pattern in the configuration file) will be examined for authors via the `git blame --porcelain` shell command (We define the `author-mail` field output by the `git blame --porcelain` command as an author here). All authors will added as owners for that file in `CODEOWNERS`. Note that if no authors are resolved for a file or pattern, it will be omitted as a `CODEOWNERS` entry.

## Configuration (coscribe.yml | coscribe.yaml)

A configuration file can be optionally provided (`coscribe.yaml` or `coscribe.yml`) to override some behavior. Commands will, by default, look for this file in the directory where they were invoked. See [Usage](#usage)

```yaml
# The relative path to the CODEOWNERS file.
# If not defined, default to the current directory where the command is invoked
codeOwnersFile: <relativePathtoCodeOwnersFile>

# During examination of a file, if an author is in the set of keys
# in this configuration, the command will remap it to the value.
authorRemap:
    'jdoe123@personalemail.com': 'jdoe@team.com'
    'janedoe321@otheremail.com': 'janedoe@team.com'
    # ...

# During examination of a file, if an author is in this set,
# the author will be omitted from any set of authors.
omittedAuthors:
    - 'email1@something.com'
    - 'email2@something.com'
    # ...

# These items will be converted into entries and added to the CODEOWNERS file first.
# Any file that matches any of these patterns will be omitted.
# Patterns need to be well-formed relative to the CODEOWNER rules.
presetDirectories:
    # Will convert to in CODEOWNERS file: `pattern1 author1`
    'pattern1':
        - 'author1'
    # Will convert to in CODEOWNERS file: `pattern2 author1 author2`
    'pattern2':
        - 'author1'
        - 'author2'
    # Will convert to in CODEOWNERS file: `pattern3  author2`
    'pattern3':
        - 'author2'
    # ...

# These items will be converted into entries and added to the CODEOWNERS file
# instead the entries that would have resolved from the examination process.
# These items are not patterns, just relative-path'ed files
presetFiles:
    'file1.txt':
        - 'author1'
        - 'author2'
        - 'author3'
    'a/b/c.json':
        - 'author1'
        - 'author5'
        - 'author6'
    # ...

# These pattern items will be used to filter out entries.
omittedPatterns:
    - file1.json
    - a/d/e.cpp
    # ...
```

## Installation

Install it globally on your system.

```sh
> yarn add global coscribe
```

Install locally in a project

```sh
> yarn add coscribe
```

## Usage

Run this command in the root directory of a git project.
Once installed, there are two commands that can be invoked, [Generate](#generate), and [Update](#update).
Both commands use the currently checked out git branch.

When installed globally, you can invoke the help command with:

```sh
> coscribe -h
```

Or, when installed locally:

```sh
> ./node_modules/.bin/coscribe -h
```

Both should provide the following output

```sh
Usage: coscribe [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  generate [options]              Generate code owners file
  update [options] <base-branch>  Update code owners file
  help [command]                  display help for command
```

### Generate

When installed globally, you can invoke the help command with:

```sh
> coscribe generate -h
```

Or, when installed locally:

```sh
> ./node_modules/.bin/coscribe generate -h
```

Both should provide the following output

```sh
Usage: coscribe generate [options]

Generate code owners file

Options:
  --coscribe-file <coscribeFile>  Provide another (relative path from command execution dir) location for the config file (default: "coscribe")
  -h, --help                    display help for command
```

To invoke the command when installed globally:

```sh
> coscribe generate
```

Or, locally:

```sh
> ./node_modules/.bin/coscribe generate

```

### Update

When installed globally, you can invoke the help command with:

```sh
> coscribe update -h
```

Or, when installed locally:

```sh
> ./node_modules/.bin/coscribe update -h
```

Both should provide the following output

```sh
Usage: coscribe update [options] <base-branch>

Update code owners file

Arguments:
  base-branch                   The base branch used for the comparison of changes

Options:
  [target-branch]               The target branch used for comparison of changes
  --coscribe-file <coscribeFile>  Provide another (relative path from command execution dir) location for the config file (default: "coscribe")
  -h, --help                    display help for command
```

If you want to use the currently checked out branch to derive the entry changes, relative to a base branch, Invoke the command in the following manner when the package was installed globally:

```sh
> coscribe update base-branch-name
```

Or when it was installed locally

```sh
> ./node_modules/.bin/coscribe update base-branch-name
```

If you don't want to use the currently checked out branch to derive the entry changes, relative to a base branch, Invoke the command in the following manner when the package was installed globally:

```sh
> coscribe update base-branch-name target-branch
```

Or when it was installed locally

```sh
> ./node_modules/.bin/coscribe update base-branch-name target-branch
```

## Dependencies

The following OS command line programs are required to run the commands:

-   git
-   tr
-   sort
-   grep
-   sed
-   awk

## Environments

This package has been tested on the following software versions

| OS                    | node    | git                                | sort            | grep                                          | sed                   | awk                  | tr                    |
| --------------------- | ------- | ---------------------------------- | --------------- | --------------------------------------------- | --------------------- | -------------------- | --------------------- |
| Mac OS Version 13.3.1 | v19.9.0 | git version 2.39.2 (Apple Git-143) | 2.3-Apple (154) | grep (BSD grep, GNU compatible) 2.6.0-FreeBSD | PROJECT:text_cmds-154 | awk version 20200816 | PROJECT:text_cmds-154 |

## TODO

-   better validation throughout the process
-   Adapter for [nodegit](https://github.com/nodegit/nodegit)
-   More strategies to create file entries
-   testing
