# Signal Developer Quick Reference

## Quick Command Reference

### Button Text Patterns
```tsx
// Primary CTAs
<span>./apply.sh</span>

// Secondary Actions
<span>share signal</span>
<span>contact</span>

// Terminal Commands in UI
<span>$ signal.share()</span>
<span>$ select method:</span>
```

### Terminal Output Components
```tsx
// Basic terminal prompt
<span className="text-foreground/50">signal@yale:~</span>

// Command with prompt
<span className="text-foreground/50">$ </span>
<span className="text-accent">signal.share()</span>

// Success message
<Check className="w-4 h-4 text-accent" />
<span className="text-accent">transmission complete</span>

// Loading with cursor
<motion.span
  animate={{ opacity: [1, 0, 1] }}
  transition={{ duration: 0.8, repeat: Infinity }}
  className="text-accent ml-1"
>
  _
</motion.span>
```

### Animation Patterns
```tsx
// Typewriter effect for terminal
terminalLines.forEach((_, index) => {
  setTimeout(() => {
    setTerminalProgress(index + 1);
  }, terminalLines[index].delay);
});

// Glow effect
<motion.div
  className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"
  animate={{
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>

// Pulsing dots
<motion.div
  className="w-1.5 h-1.5 bg-accent rounded-full"
  animate={{ opacity: [0.3, 1, 0.3] }}
  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
/>
```

### Color Classes
```tsx
// Text colors
className="text-accent"           // Green for commands/success
className="text-foreground"       // Primary text
className="text-foreground/50"    // Muted text
className="text-background"       // Dark text on light bg

// Background colors
className="bg-accent"             // Green backgrounds
className="bg-background"         // Main dark background
className="bg-card-bg"           // Card backgrounds
className="border-accent"         // Green borders
```

### Common Patterns

#### Terminal Window
```tsx
<div className="bg-card-bg border border-card-border rounded-lg p-4 font-mono text-sm">
  <div className="flex items-center space-x-2 mb-3">
    <Terminal className="w-4 h-4 text-accent" />
    <span className="text-foreground/50">signal@yale:~</span>
  </div>
  {/* Terminal content */}
</div>
```

#### Command Button
```tsx
<button className="font-mono text-sm text-accent hover:text-accent-hover">
  <span className="text-foreground/50">$ </span>
  command_name
</button>
```

#### Status Message
```tsx
<div className="flex items-center space-x-2">
  <Check className="w-4 h-4 text-accent" />
  <span className="text-accent">status message</span>
</div>
```

### State Management Patterns
```tsx
// Loading sequence
const [terminalProgress, setTerminalProgress] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [showSuccess, setShowSuccess] = useState(false);

// Terminal lines structure
const terminalLines = [
  { text: "$ command", delay: 200 },
  { text: "✓ success", delay: 400 },
];
```

### Responsive Design
```tsx
// Mobile-first approach
className="text-5xl sm:text-6xl lg:text-7xl"
className="px-6 sm:px-8 lg:px-12"
className="grid grid-cols-2 sm:grid-cols-3"
```

### Font Usage
```tsx
className="font-mono"    // JetBrains Mono for code/terminal
className="font-sans"    // Space Grotesk for UI text
className="font-bold"    // Bold weight
className="font-medium"  // Medium weight
```

## Copy-Paste Components

### Terminal Loading Sequence
```tsx
{terminalLines.slice(0, terminalProgress).map((line, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-1"
  >
    <span className="text-accent">{line.text}</span>
    {index === terminalProgress - 1 && (
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-accent ml-1"
      >
        _
      </motion.span>
    )}
  </motion.div>
))}
```

### Glowing Button
```tsx
<motion.button className="group relative">
  <motion.div
    className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
  <div className="relative bg-background border border-accent rounded-lg px-4 py-2">
    <span className="font-mono text-accent">button text</span>
  </div>
</motion.button>
```

## Remember
- Always use monospace font for code/commands
- Green accent for interactive elements
- Terminal prompts use `signal@yale:~`
- Success states use `✓` prefix
- Commands use `$` prefix
- Keep animations smooth and purposeful
- Mobile-first responsive design 

## Next.js Config Notes
- Config file is `next.config.mjs` (ESM). TypeScript configs like `next.config.ts` are not supported in Next.js 15.
- Deprecated `experimental.turbo` has been removed; use `turbopack` defaults.