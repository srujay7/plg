"use client";

import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { heroAnimationData } from "@/data/heroContent";
import { AllyBrainFrame } from "./AllyBrainFrame";
import { ObjectiveCommandBar } from "./ObjectiveCommandBar";
import { ContextModuleCard } from "./ContextModuleCard";
import { ConnectorPulse } from "./ConnectorPulse";
import { OutcomeMetricRail } from "./OutcomeMetricRail";

export function HeroAnimation() {
  const { currentStep, isModuleActive } = useHeroAnimation();

  const modules = heroAnimationData.contextModules;
  const pim = modules.find((m) => m.id === "pim")!;
  const retailer = modules.find((m) => m.id === "retailer")!;
  const keywords = modules.find((m) => m.id === "keywords")!;
  const answerEngine = modules.find((m) => m.id === "answer-engine")!;
  const governance = modules.find((m) => m.id === "governance")!;
  const impact = modules.find((m) => m.id === "impact")!;

  const isObjectiveActive = currentStep !== "idle";
  const isOutcome = currentStep === "outcome-reveal";

  return (
    <>
      {/* Desktop animation */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
        <div className="relative w-[760px] h-[520px]">
          {/* Center: Brain */}
          <div className="absolute left-1/2 top-[140px] -translate-x-1/2 -translate-y-1/2">
            <AllyBrainFrame
              currentStep={currentStep}
              brainStatuses={heroAnimationData.brainStatuses}
            />
          </div>

          {/* Below brain: Objective bar */}
          <div className="absolute left-1/2 top-[215px] -translate-x-1/2">
            <ObjectiveCommandBar
              isActive={isObjectiveActive}
              text={heroAnimationData.objectiveText}
            />
          </div>

          {/* Left column: PIM, Keywords */}
          <div className="absolute left-0 top-[50px] flex flex-col gap-3">
            <ContextModuleCard module={pim} isActive={isModuleActive("pim")} />
            <ContextModuleCard module={keywords} isActive={isModuleActive("keywords")} />
          </div>

          {/* Left connectors */}
          <div className="absolute left-[200px] top-[90px] w-[70px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("pim")} from="left" />
          </div>
          <div className="absolute left-[200px] top-[240px] w-[70px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("keywords")} from="left" delay={0.1} />
          </div>

          {/* Right column: Retailer, Answer Engine */}
          <div className="absolute right-0 top-[50px] flex flex-col gap-3">
            <ContextModuleCard module={retailer} isActive={isModuleActive("retailer")} />
            <ContextModuleCard module={answerEngine} isActive={isModuleActive("answer-engine")} />
          </div>

          {/* Right connectors */}
          <div className="absolute right-[200px] top-[90px] w-[70px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("retailer")} from="right" />
          </div>
          <div className="absolute right-[200px] top-[240px] w-[70px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("answer-engine")} from="right" delay={0.1} />
          </div>

          {/* Bottom left: Governance */}
          <div className="absolute left-[60px] bottom-[60px]">
            <ContextModuleCard module={governance} isActive={isModuleActive("governance")} />
          </div>

          {/* Bottom left connector */}
          <div className="absolute left-[270px] bottom-[135px] w-[60px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("governance")} from="left" delay={0.15} />
          </div>

          {/* Bottom right: Outcome metrics */}
          <div className="absolute right-0 bottom-[60px]">
            <OutcomeMetricRail metrics={heroAnimationData.outcomeMetrics} isActive={isOutcome} />
          </div>

          {/* Bottom right connector */}
          <div className="absolute right-[310px] bottom-[85px] w-[60px] flex items-center">
            <ConnectorPulse isActive={isModuleActive("impact")} from="right" delay={0.15} />
          </div>
        </div>
      </div>

      {/* Mobile: simplified static version */}
      <div className="flex md:hidden absolute inset-0 z-10 items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3 w-full max-w-[300px]">
          <AllyBrainFrame
            currentStep={currentStep}
            brainStatuses={heroAnimationData.brainStatuses}
          />
          <ObjectiveCommandBar isActive={isObjectiveActive} text={heroAnimationData.objectiveText} />
          <OutcomeMetricRail metrics={heroAnimationData.outcomeMetrics} isActive={isOutcome} />
        </div>
      </div>
    </>
  );
}
