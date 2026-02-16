---
layout: post
title: "Grow Your Own Multi-Agent Workflow"
published: true
hidden: true
category:
tags: []
---

# Grow Your Own Multi-Agent Workflow

There's a lot of talk about multi-agent workflows right now. Custom orchestration frameworks, agent-to-agent protocols, specialized routing layers. It's easy to look at all of that and think, "I'll get to it later," especially if you're already productive with Claude Code in a single terminal.

I was already using multiple Claude Code terminals, but it felt scattered. It was hard to track what each one was doing. I wasn't really leveraging the tools available to me—I was just running the same workflow in more windows. Then I made a small shift that pulled it all together. No new tools. No framework. Just a shared task list.

Here's the problem. Claude Code is great at implementing things. It's also great at exploring codebases and thinking through designs. But those are different modes of thinking, and cramming them into one conversation makes both worse. Exploration clutters the context. Implementation loses the thread. You end up babysitting instead of thinking.

The fix starts with two terminals.

---

## The Setup

You need one thing: a shared task list between Claude Code instances. I wrote a tiny wrapper called `claudet` that does this:

```bash
#!/usr/bin/env bash
# claudet - Claude Code with task list persistence
if [[ -z "$1" ]]; then
  echo "Usage: claudet <task-list-id> [claude args...]"
  exit 1
fi
CLAUDE_CODE_TASK_LIST_ID="$1" exec claude "${@:2}"
```

That's it. Save it somewhere on your path. All it does is set an environment variable that tells Claude Code which task list to use. When two instances share the same ID, they share the same task list.

Open two terminals:

```
# Terminal 1 - your thinking space
claudet my-project

# Terminal 2 - your build loop
claudet my-project
```

At this point you effectively have a multi-agent setup. No framework. No orchestration layer. Just two instances of a tool you already know, connected by a shared to-do list.

What I'm showing here is a simplified starting point—it's where I started, not what I'm actually using today. My setup has evolved, but the core principle is the same. This is intended to be adapted to what works for you.

---

## Let's Build Something

Let's build a CLI tool called `quoth`—a quote manager for your terminal. You can add quotes, tag them, search them, and get a random one to start your day.

---

### Terminal 1: The Designer

This is where you think.

Start by telling Claude what you want:

```
I want to build a CLI tool called "quoth" in Babashka.
It should:
- Store quotes with author and tags in a .edn file
- Add new quotes from the command line
- Show a random quote (the default action)
- Search quotes by text or tag
- Display quotes nicely formatted in the terminal

Design the core data model and CLI interface, then create tasks
for each feature. Each task will be implemented by a separate agent
with no prior context, so include all the relevant details. Start
with the simplest thing that works.
```

Claude will explore the problem, think through the design, and create tasks:

```
Task #1: Set up project structure with CLI skeleton
Task #2: Implement quote storage and the "add" command
Task #3: Implement random quote display (default action)
Task #4: Implement search by text and tag
Task #5: Add formatted terminal output with colors
```

Each task gets a detailed description—the data format, CLI flags, and edge cases. This is the design work.

You can review the tasks, adjust them, or ask Claude to rethink the approach. Ask about tradeoffs. Say you don't like the CLI flag names. Ask why it chose JSON over SQLite. Rework the task breakdown until it feels right. Nothing gets built until you're ready.

---

### Terminal 2: The Builder

Now switch to Terminal 2 and say:

```
Work through the task list. For each task, implement it
by calling the Task tool with subagent_type="general-purpose",
verify it works, and commit.
```

That's the entire instruction. The important part is *"by calling the Task tool with subagent_type='general-purpose'."* Make sure Claude is delegating each task to a child agent, not implementing it inline.

You'll know it's working when you see something like:

```
⏺ 2 Task agents finished (ctrl+o to expand)
  ├─ Set up project structure · 8 tool uses · 32.1k tokens
  │  ⎿  Done
  └─ Implement quote storage · 12 tool uses · 41.5k tokens
     ⎿  Done
```

The tool calls should appear as children of the task, not in the main conversation. This keeps the builder's context lean. All the implementation churn happens inside short-lived agents that disappear when they're done. The builder sees the result and moves on.

Without this, the builder's context fills up with file reads and edits from previous tasks, and by task eight it's drowning in its own history.

You can watch it work, or you can switch back to Terminal 1 and keep thinking.

---

### Back to Terminal 1: Keep Designing

While the builder is grinding through tasks one through three, you're free to think ahead:

```
Now let's think about some more interesting features.
I want a "quoth import" command that reads quotes from
a markdown file. Design the markdown format and create
tasks for it.
```

Claude designs the import format and creates Task #6 and #7. These appear on the shared task list. When the builder finishes Task #5, it automatically picks up Task #6.

You never stopped thinking to manage the build process. The builder never stopped building to ask what to do next. Each terminal does what it's good at.

---

## Why This Works

The key insight is that **the task list is the coordination protocol**. It's not a queue or a message bus. It's a shared to-do list that both instances can read and write. The simplicity is the feature.

A few things fall out of this naturally.

---

**Code changes are serial—and that's fine.**
You might think this would be slow compared to running agents in parallel. In practice, the bottleneck is never the builder; it's keeping the task list full. The builder chews through tasks faster than you can design them.

"Serial" doesn't mean "waiting around." It means everything happens on one branch in one working directory.

I tried the parallel approach—git worktrees, multiple branches, agents running simultaneously on different features. It sounds fast, but managing it divided my attention. I spent energy on git logistics instead of thinking about the actual problem. With this workflow, I'm able to keep my flow. When you're working on a contiguous set of features, the simplicity of serial changes on a single branch is hard to beat.

---

**Fresh context per task.**
Each task is implemented by a subagent that starts with a clean slate—just the task description and the relevant files. No 50k tokens of prior conversation to wade through.

This uses fewer tokens and often produces better results, because the agent is focused entirely on the problem at hand instead of carrying the baggage of everything that came before.

---

**Design context stays clean.**
The designer terminal accumulates deep understanding of the codebase and the design decisions. The builder terminal stays lean—it reads the task, delegates, and moves on. Neither conversation gets polluted with the other's concerns.

---

**You're still in charge.**
You can pause the builder at any time. You can rewrite tasks before the builder gets to them. You can jump into Terminal 2 and say, "Wait, let me rethink task #4," and the builder stops.

This isn't autonomous AI running wild. It's you, with a very capable assistant in each hand.

---

**It grows with you.**
Start with two terminals. When you're comfortable, add more.

I've had as many as eight terminals open, with only one acting as the implementer. Others focused on different concerns: one looping through commits and reviewing each one, adding tasks to the list; another exercising the code being built, looking for gaps and bugs, also adding tasks. Multiple terminals exploring different features in parallel, all feeding the same shared task list that a single builder works through.

---

## The Build Loop

In the builder terminal, I codify the full loop directly in the prompt:

```
Run this loop until all tasks are complete:
1. Pick the highest priority unblocked task, mark it in_progress
2. Call the Task tool with subagent_type="general-purpose" to implement the selected task
3. Verify the change works, run tests
   - If something fails, send the errors back to the subagent to fix
4. Call the Task tool with subagent_type="general-purpose" to review the changes
   - If changes needed, send them back to the subagent
5. Commit with a descriptive message
6. Mark the task completed, go to step 1
```

This isn't a hard-coded bash loop—it's a prompt. The builder agent interprets it with judgment.

When tests fail, it reads the errors and decides how to fix them. When a review comes back with issues, it judges whether to send them back to the subagent or handle them itself. It adapts to surprises, skips steps that don't apply, and makes reasonable decisions along the way.

The loop provides structure. The agent provides judgment.

---

## Tips From a Week of This

**Task descriptions need to stand alone.**
The builder's subagent won't have any of the designer's conversation history. The task description is all it gets.

The good news is you don't have to write these yourself. When you're done designing, tell the designer to create the tasks and remind it that each task will be handled by a separate agent with no prior context. Claude will front-load relevant file paths, expected behavior, and testing steps automatically.

---

**Use the designer to verify.**
Once a feature is implemented, switch back to the designer terminal and have it check the work. It has all the context from the original design conversation, so it knows what "correct" looks like. Read the code, run the tests, and confirm it matches your intent.

---

**Let the designer explore freely.**
The whole point of the designer terminal is that it can dig deep, read lots of files, and think without worrying about "wasting context." That exploration *is* the work.

---

**Keep tasks small.**
A task that takes five subagent tool calls is better than one that takes fifty. Small tasks give you more checkpoints and make it easier to course-correct.

---

**Review before you push, not before you commit.**
Let the builder commit freely. Review the full set of changes at the end. You can always squash and rewrite history. This is exactly what I do—the builder makes many small commits, then I squash them into a summary when I'm ready to push.

---

## Try It

Save the `claudet` script. Open two terminals. Pick something fun to build. Tell one terminal what you want, and tell the other to build it.

The first time you switch back to your design terminal and find tasks already completed while you were thinking about the next feature, it becomes easier to see why this arrangement helps. It feels closer to pair programming where neither side is waiting on the other.

You don't need a framework to start working with multiple agents. You need a shared task list and two terminals. Everything else grows from there.

Give it a try and see whether it fits the way you like to work.
