import { useEffect, useMemo, useRef, useState } from "react";
import "./BmadDemoPage.css";

type BmadTrack = "method" | "quick" | "enterprise";

type BmadArtifact = {
  name: string;
  description: string;
  content: string;
};

type BmadPhase = {
  id: string;
  eyebrow: string;
  title: string;
  status: string;
  agent: {
    icon: string;
    name: string;
  };
  purpose: string;
  scenario: string;
  workflowSummary: string;
  guide: string;
  workflows: string[];
  inputs: string[];
  outputs: string[];
  artifacts: BmadArtifact[];
  tracks: BmadTrack[];
};

const phases: BmadPhase[] = [
  {
    id: "start",
    eyebrow: "Start",
    title: "Install and Ask BMAD-Help",
    status: "Required",
    agent: { icon: "🧭", name: "BMAD-Help" },
    purpose:
      "Initialize the workspace and choose the right BMAD path.",
    scenario:
      "StormBrief turns trusted NOAA-style hazard data into reviewed operational briefings.",
    workflowSummary:
      "Install BMAD and use BMAD-Help to select the right planning path before any artifacts are created.",
    guide:
      "Next: Run product brief or PRD in a fresh chat.",
    workflows: ["npx bmad-method install", "bmad-help"],
    inputs: ["Project folder", "StormBrief idea", "Preferred AI IDE"],
    outputs: ["_bmad/", "_bmad-output/", "Recommended next workflow"],
    tracks: ["method", "quick", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-bmad-help-guidance.md",
        description: "Initial guidance returned after installation.",
        content: `# BMAD-Help Guidance

Project: StormBrief

Recommended track: BMad Method

Reason:
- Multiple operational user groups
- NOAA weather, coastal, marine, and hydrologic data dependencies
- Human review required before sharing public-safety guidance
- Requirements, architecture, and implementation stories need to stay aligned

Next recommended workflow:
Run bmad-product-brief or bmad-prd in a fresh chat.
`,
      },
    ],
  },
  {
    id: "analysis",
    eyebrow: "Phase 1",
    title: "Analysis",
    status: "Optional",
    agent: { icon: "🕵️", name: "Analyst" },
    purpose:
      "Clarify users, hazards, data sources, and product boundaries.",
    scenario:
      "Emergency managers, harbor operators, and forecasters need concise risk context.",
    workflowSummary:
      "Analysis workflows turn the rough product idea into research, assumptions, and a product brief.",
    guide:
      "Next: Create a product brief, or use PRFAQ to challenge the concept.",
    workflows: [
      "bmad-brainstorming",
      "bmad-market-research",
      "bmad-domain-research",
      "bmad-technical-research",
      "bmad-product-brief",
      "bmad-prfaq",
    ],
    inputs: [
      "Raw product idea",
      "Emergency management workflow notes",
      "NOAA data-source assumptions",
      "Known alerting and briefing pain points",
    ],
    outputs: [
      "brainstorming-report.md",
      "research findings",
      "product-brief.md",
      "prfaq.md",
    ],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-product-brief.md",
        description: "Strategic foundation for the NOAA-related product.",
        content: `# Product Brief: StormBrief

## Problem
Operational teams must synthesize weather alerts, marine forecasts, rainfall outlooks, storm surge guidance, and local vulnerability context into briefings that partners can act on quickly.

## Users
- NOAA/NWS-style forecaster
- Emergency management partner
- Harbor or coastal operations coordinator
- Public works incident lead

## Product Direction
Create an internal briefing workspace that drafts source-backed impact summaries, keeps experts in control, and preserves traceability to source data and reviewer decisions.

## Success Signals
- Faster briefing preparation during severe weather events
- More consistent impact language across offices
- Clearer connection between data inputs and operational recommendations
`,
      },
      {
        name: "stormbrief-prfaq.md",
        description: "Working-backwards challenge document.",
        content: `# PRFAQ: StormBrief

## Press Release
StormBrief helps operational weather teams transform trusted NOAA-style guidance and local risk context into reviewed, impact-focused briefings for emergency managers and coastal operators.

## FAQ
### Does StormBrief publish automatically?
No. Every briefing requires human review and approval.

### What data does it use?
The first release focuses on weather alerts, marine forecast zones, rainfall risk, coastal water level context, and local watch areas.

### What makes it valuable?
It reduces assembly time while improving consistency, auditability, and confidence in briefing language.
`,
      },
    ],
  },
  {
    id: "planning",
    eyebrow: "Phase 2",
    title: "Planning",
    status: "Required",
    agent: { icon: "👩‍💼", name: "Product Manager" },
    purpose:
      "Define users, workflows, constraints, and acceptance boundaries.",
    scenario:
      "The team needs requirements for alerts, maps, briefings, review, and export.",
    workflowSummary:
      "The PRD workflow defines users, requirements, constraints, and success criteria for StormBrief.",
    guide:
      "Next: Run bmad-prd in a fresh chat.",
    workflows: ["bmad-prd"],
    inputs: ["Product brief", "PRFAQ", "Research findings", "Stakeholder constraints"],
    outputs: ["prd.md", "addendum.md", "decision-log.md", "validation-report.html"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-prd.md",
        description: "Requirements for NOAA-related operational users.",
        content: `# PRD: StormBrief

## Goal
Enable operational weather teams to create reviewed, consistent impact briefings from trusted environmental guidance and local context.

## Primary Users
- Forecaster: prepares and edits briefings
- Lead forecaster: reviews and approves briefings
- Emergency manager: receives concise impact summaries
- Harbor operator: monitors marine and coastal hazards

## Requirements
1. Ingest weather alerts, marine forecast zones, rainfall risk, and coastal context.
2. Let users define watch zones and briefing audiences.
3. Generate draft impact language with source traceability.
4. Require human review before export or sharing.
5. Preserve a decision log for each briefing.
6. Meet accessibility expectations for operational dashboards.
`,
      },
      {
        name: "stormbrief-decision-log.md",
        description: "Planning choices that remain visible.",
        content: `# Decision Log

## D-001: Human approval is mandatory
Rationale: Public-safety messaging requires expert judgment.

## D-002: Data provenance must be visible
Rationale: Users need to understand which observations and forecasts shaped the draft.

## D-003: Start with briefings, not automatic alerts
Rationale: A controlled workflow gives the team a measurable first release and avoids premature automation.
`,
      },
    ],
  },
  {
    id: "ux",
    eyebrow: "Optional",
    title: "UX Design",
    status: "Recommended",
    agent: { icon: "👩‍🎨", name: "UX Expert" },
    purpose:
      "Design the dashboard, triage flow, composer, review states, and export path.",
    scenario:
      "Forecasters need a dense workspace that keeps source data visible.",
    workflowSummary:
      "The UX workflow shapes the dashboard, briefing composer, review queue, and export experience.",
    guide:
      "Next: Run UX after PRD because StormBrief is a user-facing tool.",
    workflows: ["bmad-agent-ux-designer", "bmad-ux"],
    inputs: ["PRD", "Primary personas", "Critical user flows", "Accessibility constraints"],
    outputs: ["ux-spec.md", "screen-flow-notes.md", "interaction decisions"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-ux-spec.md",
        description: "Operational interface design notes.",
        content: `# UX Spec: StormBrief

## Primary Views
- Operations dashboard with active hazards, watch zones, and briefing status
- Event detail page with source data, forecast confidence, and local impacts
- Briefing composer with source-linked generated text
- Review queue with approval, requested changes, and export controls

## Interaction Principles
- Keep source timestamps visible
- Make degraded data states explicit
- Separate draft language from approved language
- Avoid decorative UI that slows scanning during events
`,
      },
    ],
  },
  {
    id: "architecture",
    eyebrow: "Phase 3",
    title: "Architecture",
    status: "BMad Method",
    agent: { icon: "👨‍💻", name: "Architect" },
    purpose:
      "Convert requirements into technical decisions before story creation.",
    scenario:
      "StormBrief needs adapters, geospatial services, review controls, and audit logs.",
    workflowSummary:
      "The architecture workflow translates requirements into system components, data boundaries, and technical decisions.",
    guide:
      "Next: Create architecture before epics and stories.",
    workflows: ["bmad-agent-architect", "bmad-create-architecture"],
    inputs: ["PRD", "UX spec", "NOAA data constraints", "Project context"],
    outputs: ["architecture.md", "architecture decision records", "technical risks"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-architecture.md",
        description: "Technical structure for the StormBrief platform.",
        content: `# Architecture: StormBrief

## Components
- Data adapters for alerts, marine zones, rainfall outlooks, and coastal observations
- Geospatial watch-zone service
- Briefing rules engine for local thresholds and impact phrasing
- Review workflow with role-based approval
- Audit log for source data, generated text, edits, and exports

## Key Decisions
- Keep operational users in control of final messaging
- Store source snapshots with each briefing
- Degrade gracefully when a data feed is delayed
- Treat exports as reviewed artifacts, not live data feeds
`,
      },
    ],
  },
  {
    id: "epics",
    eyebrow: "Backlog",
    title: "Epics and Stories",
    status: "Required",
    agent: { icon: "👩‍💼", name: "Product Manager" },
    purpose:
      "Turn the PRD and architecture into implementable work.",
    scenario:
      "First work covers alert ingestion, watch zones, briefings, review, and exports.",
    workflowSummary:
      "The backlog workflow converts planning and architecture into epics, stories, and acceptance criteria.",
    guide:
      "Next: Create stories after architecture decisions are clear.",
    workflows: ["bmad-agent-pm", "bmad-create-epics-and-stories"],
    inputs: ["PRD", "Architecture", "UX spec", "Decision log"],
    outputs: ["epics/", "story files", "acceptance criteria", "implementation sequence"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-epic-alert-ingestion.md",
        description: "First technically informed epic.",
        content: `# Epic 1: Alert and Forecast Ingestion

## Objective
Bring core weather, marine, rainfall, and coastal hazard data into the briefing workspace with clear provenance and freshness indicators.

## Stories
1. Ingest active weather alerts for configured zones.
2. Map marine and coastal zones to user-defined watch areas.
3. Display data freshness and source metadata.
4. Alert the user when required data is stale or unavailable.
`,
      },
      {
        name: "stormbrief-story-watch-zone-alerts.md",
        description: "Example implementation story.",
        content: `# Story: Watch Zone Alerts

## User Story
As a forecaster, I want StormBrief to show active alerts for configured watch zones so that I can quickly decide whether a briefing needs to be drafted or updated.

## Acceptance Criteria
- Given a configured watch zone, active alerts appear in the operations dashboard.
- Each alert shows source, issued time, expiration time, and affected zones.
- Stale or unavailable data is shown as a degraded state.
- The user can open an alert and start a briefing draft from it.
`,
      },
    ],
  },
  {
    id: "readiness",
    eyebrow: "Gate",
    title: "Readiness Check",
    status: "Recommended",
    agent: { icon: "👨‍💻", name: "Architect" },
    purpose:
      "Check that requirements, UX, architecture, and stories align.",
    scenario:
      "The team needs a clear ready, concerns, or blocked decision.",
    workflowSummary:
      "The readiness workflow checks whether the PRD, UX, architecture, and stories are coherent enough to build.",
    guide:
      "Next: Resolve gaps before sprint planning.",
    workflows: ["bmad-agent-architect", "bmad-check-implementation-readiness"],
    inputs: ["PRD", "Architecture", "UX spec", "Epics and stories"],
    outputs: ["readiness-report.md", "PASS / CONCERNS / FAIL decision", "risk list"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-readiness-report.md",
        description: "Implementation readiness gate.",
        content: `# Implementation Readiness Check

Decision: CONCERNS

Strengths:
- PRD, architecture, and first epic align.
- Human approval and audit trail are represented in requirements and architecture.
- Degraded data states are covered in UX and story acceptance criteria.

Concerns:
- Authentication boundary needs confirmation.
- Production data availability expectations need owner review.
- Export retention policy needs a final decision.
`,
      },
    ],
  },
  {
    id: "sprint",
    eyebrow: "Phase 4",
    title: "Sprint Planning",
    status: "Implementation",
    agent: { icon: "👨‍🔧", name: "Developer" },
    purpose:
      "Initialize tracking and choose the first implementation sequence.",
    scenario:
      "The first sprint covers alerts, watch zones, freshness, and draft initiation.",
    workflowSummary:
      "Sprint planning chooses the next implementation sequence and records story status in sprint tracking.",
    guide:
      "Next: Initialize sprint tracking, then select the first story.",
    workflows: ["bmad-agent-dev", "bmad-sprint-planning"],
    inputs: ["Epics", "Story backlog", "Architecture", "Project context"],
    outputs: ["sprint-status.yaml", "selected story sequence", "implementation state"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-sprint-status.yaml",
        description: "Sprint tracking for the demo backlog.",
        content: `project: stormbrief
current_epic: alert-and-forecast-ingestion
stories:
  - id: watch-zone-alerts
    status: ready
  - id: marine-zone-mapping
    status: drafted
  - id: briefing-draft-initiation
    status: backlog
  - id: source-freshness-banner
    status: backlog
`,
      },
    ],
  },
  {
    id: "build",
    eyebrow: "Loop",
    title: "Build Cycle",
    status: "Repeat",
    agent: { icon: "👨‍🔧", name: "Developer" },
    purpose:
      "Build, review, and improve one story at a time.",
    scenario:
      "The team repeats the loop for alerts, maps, briefings, and exports.",
    workflowSummary:
      "The build workflows create one story, implement it, review it, and capture lessons before moving on.",
    guide:
      "Next: Create story, develop story, review, then repeat.",
    workflows: [
      "bmad-create-story",
      "bmad-dev-story",
      "bmad-code-review",
      "bmad-retrospective",
    ],
    inputs: ["Sprint status", "Selected story", "Existing codebase", "Acceptance criteria"],
    outputs: ["story-[slug].md", "working code and tests", "code review notes", "retrospective.md"],
    tracks: ["method", "enterprise"],
    artifacts: [
      {
        name: "stormbrief-code-review.md",
        description: "Example quality validation output.",
        content: `# Code Review: Watch Zone Alerts

Decision: Changes requested

Findings:
- Add tests for stale alert data.
- Expose source timestamps in the alert detail panel.
- Confirm empty-state copy with operational users.
- Ensure keyboard focus returns to the selected alert after closing the detail panel.
`,
      },
      {
        name: "stormbrief-retrospective.md",
        description: "Epic learning captured after implementation.",
        content: `# Retrospective: Alert and Forecast Ingestion

## Worked Well
- Story acceptance criteria were specific enough for implementation.
- Architecture decisions helped avoid source-provenance gaps.

## Improve Next Epic
- Add mock data contracts before implementation.
- Decide export retention rules before story creation.
`,
      },
    ],
  },
  {
    id: "quick-flow",
    eyebrow: "Shortcut",
    title: "Quick Flow",
    status: "Small Scope",
    agent: { icon: "👨‍🔧", name: "Developer" },
    purpose:
      "Use one compact workflow for a small, clear enhancement.",
    scenario:
      "A team wants to add CSV export to an existing approved briefing table.",
    workflowSummary:
      "Quick Flow produces a compact spec and implementation path for one small, well-understood change.",
    guide:
      "Next: Run bmad-quick-dev with clear acceptance criteria.",
    workflows: ["bmad-quick-dev"],
    inputs: ["Clear bug or enhancement", "Existing codebase", "Known acceptance criteria"],
    outputs: ["spec-*.md", "working code", "review summary"],
    tracks: ["quick"],
    artifacts: [
      {
        name: "stormbrief-quick-flow-csv-export.md",
        description: "Compact plan for a small enhancement.",
        content: `# Quick Flow Spec: CSV Export

## Change
Add a CSV export action to the existing approved-briefings table.

## Acceptance Criteria
- Export includes briefing title, event window, zones, impact level, reviewer, and approval timestamp.
- Export is disabled until the briefing is approved.
- CSV output handles commas, quotes, and line breaks safely.
- Export action is keyboard accessible.
`,
      },
    ],
  },
];

const trackLabels: Record<BmadTrack, string> = {
  method: "BMad Method",
  quick: "Quick Flow",
  enterprise: "Enterprise",
};

const trackNotes: Record<BmadTrack, string> = {
  method:
    "Best fit for StormBrief: PRD, UX, architecture, epics, and implementation stories stay connected.",
  quick:
    "Use for a small NOAA-related enhancement when scope and architecture are already settled.",
  enterprise:
    "Extends the same flow with deeper security, DevOps, governance, and compliance artifacts.",
};

function downloadArtifact(artifact: BmadArtifact) {
  const blob = new Blob([artifact.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = artifact.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function BmadDemoPage() {
  const [activeId, setActiveId] = useState(phases[0].id);
  const [track, setTrack] = useState<BmadTrack>("method");
  const [previewArtifactName, setPreviewArtifactName] = useState(phases[0].artifacts[0].name);
  const [controlsVisible, setControlsVisible] = useState(false);
  const controlsSentinelRef = useRef<HTMLDivElement | null>(null);

  const visiblePhases = useMemo(
    () => phases.filter((phase) => phase.tracks.includes(track)),
    [track],
  );

  const activePhase = visiblePhases.find((phase) => phase.id === activeId) ?? visiblePhases[0];
  const activeIndex = visiblePhases.findIndex((phase) => phase.id === activePhase.id);
  const completedPhases = visiblePhases.slice(0, activeIndex + 1);
  const visibleArtifacts = completedPhases.flatMap((phase) => phase.artifacts);
  const previewArtifact =
    activePhase.artifacts.find((artifact) => artifact.name === previewArtifactName) ??
    activePhase.artifacts[0];
  const progress = Math.round(((activeIndex + 1) / visiblePhases.length) * 100);

  useEffect(() => {
    const sentinel = controlsSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setControlsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [activePhase.id]);

  function selectTrack(nextTrack: BmadTrack) {
    setTrack(nextTrack);
    const nextPhase = phases.find((phase) => phase.tracks.includes(nextTrack)) ?? phases[0];
    setActiveId(nextPhase.id);
    setPreviewArtifactName(nextPhase.artifacts[0].name);
  }

  function selectPhase(phase: BmadPhase) {
    setActiveId(phase.id);
    setPreviewArtifactName(phase.artifacts[0].name);
  }

  function goToPrevious() {
    const nextPhase = visiblePhases[Math.max(0, activeIndex - 1)];
    selectPhase(nextPhase);
  }

  function goToNext() {
    const nextPhase = visiblePhases[Math.min(visiblePhases.length - 1, activeIndex + 1)];
    selectPhase(nextPhase);
  }

  return (
    <main className="bmad-demo-shell">
      <section className="bmad-intro" aria-labelledby="bmad-title">
        <div>
          <p className="bmad-kicker">BMAD Method Framework Demo</p>
          <h1 id="bmad-title">StormBrief</h1>
          <p>
            A NOAA-related click-through that shows how BMAD turns an operational
            weather idea into source-backed documents, implementation stories, and
            a repeatable build cycle.
          </p>
        </div>

        <div className="bmad-track-panel" aria-label="Planning track selector">
          <span>Planning track</span>
          <div className="bmad-track-options">
            {(["method", "quick", "enterprise"] as BmadTrack[]).map((item) => (
              <button
                className={track === item ? "selected" : ""}
                key={item}
                type="button"
                onClick={() => selectTrack(item)}
              >
                {trackLabels[item]}
              </button>
            ))}
          </div>
          <p>{trackNotes[track]}</p>
        </div>
      </section>

      <section className="bmad-workspace" aria-label="BMAD workflow explorer">
        <aside className="bmad-timeline" aria-label="BMAD phases">
          <div className="bmad-progress">
            <span>{trackLabels[track]} progress</span>
            <strong>{progress}%</strong>
            <div>
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          {visiblePhases.map((phase, index) => (
            <button
              className={[
                "bmad-phase-button",
                phase.id === activePhase.id ? "active" : "",
                index < activeIndex ? "complete" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={phase.id}
              type="button"
              onClick={() => selectPhase(phase)}
            >
              <span>{phase.eyebrow}</span>
              <strong>{phase.title}</strong>
              <em>
                {phase.status} · {phase.agent.icon} {phase.agent.name}
              </em>
            </button>
          ))}
        </aside>

        <article className="bmad-phase-detail">
          <div className="bmad-phase-heading">
            <div>
              <p className="bmad-kicker">{activePhase.eyebrow}</p>
              <h2>{activePhase.title}</h2>
            </div>
            <div className="bmad-phase-badges">
              <span>{activePhase.status}</span>
              <span className="agent">
                <span className="bmad-agent-icon" aria-hidden="true">
                  {activePhase.agent.icon}
                </span>
                Agent: {activePhase.agent.name}
              </span>
            </div>
          </div>

          <p className="bmad-phase-purpose">{activePhase.purpose}</p>

          <div className="bmad-scenario">
            <span>NOAA scenario</span>
            <p>{activePhase.scenario}</p>
            <p className="bmad-workflow-summary">{activePhase.workflowSummary}</p>
          </div>

          <div className="bmad-phase-grid">
            <PhaseList title="Inputs" items={activePhase.inputs} tone="inputs" />
            <PhaseList title="Workflows" items={activePhase.workflows} code tone="workflows" />
            <PhaseList title="Expected outputs" items={activePhase.outputs} tone="outputs" />
          </div>

          <div className="bmad-help-panel">
            <span>BMAD-Help</span>
            <p>{activePhase.guide}</p>
          </div>

          <details className="bmad-artifact-preview">
            <summary>
              <div>
                <span>Preview document</span>
                <strong>{previewArtifact.name}</strong>
              </div>
            </summary>
            <div className="bmad-preview-actions">
              <button type="button" onClick={() => downloadArtifact(previewArtifact)}>
                Download
              </button>
            </div>
            <pre>{previewArtifact.content}</pre>
          </details>

          <div className="bmad-downloads">
            <div>
              <span>Sample documents</span>
              <strong>{activePhase.artifacts.length} available</strong>
            </div>
            <div className="bmad-download-list">
              {activePhase.artifacts.map((artifact) => (
                <button
                  className={artifact.name === previewArtifact.name ? "selected" : ""}
                  key={artifact.name}
                  type="button"
                  onClick={() => setPreviewArtifactName(artifact.name)}
                >
                  <span>Preview</span>
                  <strong>{artifact.name}</strong>
                  <em>{artifact.description}</em>
                </button>
              ))}
            </div>
          </div>
        </article>

        <div className="bmad-controls-wrap">
          <div className="bmad-controls-sentinel" ref={controlsSentinelRef} />
          <nav
            className={`bmad-demo-controls ${controlsVisible ? "visible" : ""}`}
            aria-label="Demo controls"
            aria-hidden={!controlsVisible}
          >
            <button type="button" onClick={goToPrevious} disabled={activeIndex === 0}>
              ← Previous
            </button>
            <button type="button" onClick={() => downloadArtifact(previewArtifact)}>
              Download shown
            </button>
            <button
              className="primary"
              type="button"
              onClick={goToNext}
              disabled={activeIndex === visiblePhases.length - 1}
            >
              Next phase →
            </button>
          </nav>
        </div>

        <aside className="bmad-artifact-stack" aria-label="Accumulated artifacts">
          <div className="bmad-stack-header">
            <span>Artifact stack</span>
            <strong>{visibleArtifacts.length}</strong>
          </div>
          <div className="bmad-stack-list">
            {visibleArtifacts.map((artifact) => (
              <button
                key={artifact.name}
                type="button"
                onClick={() => downloadArtifact(artifact)}
              >
                <span>FILE</span>
                <strong>{artifact.name}</strong>
              </button>
            ))}
          </div>
        </aside>
      </section>

    </main>
  );
}

function PhaseList({
  title,
  items,
  code = false,
  tone,
}: {
  title: string;
  items: string[];
  code?: boolean;
  tone: "inputs" | "workflows" | "outputs";
}) {
  const iconByTitle: Record<string, string> = {
    Inputs: "📥",
    Workflows: "⚙️",
    "Expected outputs": "📤",
  };
  const icon = iconByTitle[title] ?? "•";

  return (
    <section className={`bmad-list-panel ${tone}`}>
      <h3>
        <span className="bmad-list-icon" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{code ? <code>{item}</code> : item}</li>
        ))}
      </ul>
    </section>
  );
}
