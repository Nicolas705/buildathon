# Signal Code Ontology

## Overview
This document defines the coding vernacular and terminal-style conventions used throughout the Signal website. All commands, functions, and technical references follow a consistent pattern that reinforces Signal's developer-focused brand identity.

## Core Principles
1. **Unix/Terminal Aesthetic**: All interactive elements are styled as terminal commands
2. **Functional Programming**: Methods are presented as functions with clear inputs/outputs
3. **Developer-First Language**: Technical accuracy while remaining accessible
4. **Consistency**: Same patterns across all features

## Command Syntax

### Primary Actions

#### `./apply.sh`
- **Usage**: Main CTA button for applications
- **Context**: Hero section
- **Implies**: Executable script that initiates the application process
- **Real-world equivalent**: Running a shell script to start an application

#### `signal.share()`
- **Usage**: Share modal trigger and terminal output
- **Context**: Share button and modal initialization
- **Variants**:
  - `signal.share --method sms`
  - `signal.share --method email`
  - `signal.share --method clipboard`
  - `signal.share --method twitter`
  - `signal.share --method whatsapp`
  - `signal.share --method linkedin`
- **Implies**: Object method with options parameter

#### `signal.apply()`
- **Usage**: Contact form terminal prompt
- **Context**: Application modal
- **Implies**: Method call that returns application form

### Terminal Prompts

#### `signal@yale:~`
- **Usage**: Terminal prompt prefix
- **Context**: Loading sequences, terminal outputs
- **Format**: `[program]@[location]:~`
- **Implies**: User is in Signal's Yale environment

#### `$` Prefix
- **Usage**: Command line indicator
- **Examples**:
  - `$ initializing signal...`
  - `$ signal ready`
  - `$ signal.share()`
  - `$ select method:`
- **Implies**: Ready for command input

#### `✓` Success Indicator
- **Usage**: Completed action confirmation
- **Examples**:
  - `✓ connecting to yale network`
  - `✓ establishing secure connection`
  - `✓ ready`
  - `✓ transmission complete`
- **Implies**: Successful completion of async operation

### File/Directory References

#### `cd /yale/signal && ls -la`
- **Usage**: Hero section terminal header
- **Context**: Shows navigation to Signal directory
- **Implies**: Exploring Signal's presence at Yale

### Status Messages

#### Loading States
```
$ initializing signal...
✓ connecting to yale network
✓ establishing secure connection
$ signal ready
```

#### Share States
```
$ signal.share()
✓ ready
$ select method:
```

#### Success States
```
✓ transmission complete
✓ application submitted
```

### Method Signatures

#### Application Form Fields
- Each form field presented as a function parameter:
  - `name: string`
  - `email: string`
  - `linkedin: string`
  - `github: string`
  - `accomplishments: string`

### Interactive Elements

#### Keyboard Shortcuts
- `[1-6]` - Select share method by number
- `ESC` - Close modal
- `Cmd/Ctrl + S` - Open share modal (if implemented)

#### Progress Indicators
- Loading bars with percentage
- Typewriter effect with blinking cursor `_`
- Animated dots for processing states

## Consistency Rules

1. **Always lowercase** for commands and methods
2. **Use dots** for object methods: `signal.share()`, `signal.apply()`
3. **Use hyphens** for command options: `--method email`
4. **Use forward slashes** for paths: `/yale/signal`
5. **Executable scripts** use `.sh` extension: `./apply.sh`
6. **Success messages** always start with `✓`
7. **Commands** always start with `$`
8. **Monospace font** (JetBrains Mono) for all code elements

## Color Coding
- **Accent (Green #00ff88)**: Commands, success states, interactive elements
- **Foreground (Light Gray)**: Regular text output
- **Foreground/50**: System prompts and metadata

## Animation Patterns
- **Typewriter effect**: For terminal output sequences
- **Blinking cursor**: Active input states
- **Fade in**: Success messages
- **Scale on hover**: Interactive buttons
- **Glow effects**: Important CTAs

## Error States (Future Implementation)
- `✗ error:` prefix for errors
- Red color (#ff0040) for error messages
- Descriptive error codes: `ERR_NETWORK`, `ERR_VALIDATION`

## Examples in Context

### Full Application Flow
```
$ ./apply.sh
> Redirecting to application form...

signal@yale:~ $ signal.apply()
> what's your name?
> alex chen
✓ validated

> what's your email?
> alex@yale.edu
✓ validated

...

✓ application submitted!
```

### Share Flow
```
signal@yale:~ $ signal.share()
✓ ready
$ select method:
> signal.share --method twitter
✓ transmission complete
```

## Future Expansions
- `signal.connect()` - For networking features
- `signal.events()` - For viewing upcoming dinners
- `signal.members()` - For member directory
- `./install-signal.sh` - For adding to calendar/contacts

This ontology ensures that all current and future features maintain a consistent, developer-friendly language that reinforces Signal's identity as a high-tech, builder-focused community. 