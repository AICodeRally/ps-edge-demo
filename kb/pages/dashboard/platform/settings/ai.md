---
title: AI Features Settings
description: Control AI assistant visibility and behavior
owner: Platform Team
lastUpdated: 2026-01-20
tags: [ai, settings, orbs, configuration, privacy]
---

# AI Features Settings

Control which AI assistants are visible in your PS-Edge session. Useful when working with clients who have policies against AI tools.

## Master Toggle

**AI Assistants** - Master switch that enables/disables ALL AI orbs at once.

When disabled:
- All 5 orbs disappear from the interface
- No AI API calls are made
- Settings persist in your browser (localStorage)

## Individual Orb Controls

When master toggle is ON, you can selectively enable/disable:

### OpsChief Orb
Business health insights and operational analytics. Reviews client health, team utilization, revenue trends, and efficiency. Refreshes hourly.

**Position:** Bottom-left (purple gradient)

### AskPS Orb
AI chat assistant for professional services questions. Ask about processes, client info, metrics, or get help with tasks.

**Position:** Bottom-right (purple/violet gradient)

### Pulse Orb
AI-powered operational insights and urgent notifications. Alerts about capacity issues, deadlines, opportunities.

**Position:** Bottom-left middle (pink gradient)

### Tasks Orb
Task management synced with AICR platform. View in-progress work, blocked items, and priorities.

**Position:** Bottom-right middle (orange gradient)

### PageKB Panel
Context-aware page documentation. Auto-loads help content specific to the page you're viewing.

**Position:** Bottom-left top (fuchsia gradient)

## Client AI Policies

Some clients may prohibit AI assistant usage. **Always disable AI features** before:
- Client demos or screen shares
- Working with client data (if policy requires)
- Meetings where AI tools are restricted

## Reset to Defaults

Click **Reset** to restore all AI features to their default enabled state.

## Privacy Note

AI settings are stored locally in your browser. Each user can configure their own preferences independently.
