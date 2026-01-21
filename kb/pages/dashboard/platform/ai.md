---
title: AI Features Dashboard
description: Monitor AI usage and performance
owner: Platform Team
lastUpdated: 2026-01-20
tags: [ai, monitoring, usage, performance, costs]
---

# AI Features Dashboard

Monitor AI assistant usage, performance, and costs across your PS-Edge instance.

## Metrics Explained

- **Total AI Requests** - All API calls to AI services (OpsChief, AskPS, Pulse, etc.)
- **Success Rate** - Percentage of successful AI responses
- **Avg Response Time** - How fast AI assistants respond
- **Models Active** - Number of AI models currently in use
- **Cost This Month** - AI API costs (tracks AICR + Claude usage)

## AI Stack

PS-Edge uses a **fallback chain** for reliability:

1. **AICR Platform** (Primary) - Expert hierarchy routing
2. **Rally LLM** (Secondary) - Local fallback for offline scenarios
3. **Claude API** (Tertiary) - Cloud fallback when local unavailable

## The 5 AI Orbs

### OpsChief (Purple, Bottom-Left)
Business health insights. Analyzes:
- Client satisfaction trends
- Team utilization patterns
- Revenue forecasts
- Operational efficiency

### Pulse (Pink, Bottom-Left Middle)
Urgent operational notifications:
- Capacity constraints
- Deadline risks
- Opportunities

### PageKB (Fuchsia, Bottom-Left Top)
Context-aware help. Auto-loads documentation for the current page.

### Tasks (Orange, Bottom-Right Middle)
Task management synced with AICR platform. Shows work items across engagements, deliverables, support.

### AskPS (Gradient, Bottom-Right)
Conversational AI assistant. Ask questions in natural language about:
- Client status
- Team availability
- Process guidance
- Metrics interpretation

## Configuration

Go to **Settings → AI Features** to:
- Toggle master AI switch
- Enable/disable individual orbs
- Respect client AI policies

## Best Practices

- Disable AI features during client demos if they have AI restrictions
- Monitor costs weekly (target: <$1K/month for typical usage)
- Review success rate (should be >98%)
- Check response times (target: <2 seconds)
