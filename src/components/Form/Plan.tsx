import React from "react"
import StepWizard from "react-step-wizard"
import { SectionTitle } from "./SectionTitle"
import { FormNav } from "./FormNav"
import lightbulb from "../../assets/light-bulb (1).svg"

interface PlanProps {
  renderTextInputs: (fields: string[], prompts?: string[]) => JSX.Element[]
  isChecked: (fields: string[]) => boolean
}

export const Plan: React.FC<PlanProps> = ({ renderTextInputs, isChecked }) => {
  const hazardFields: string[] = [
    "hazard_weather",
    "hazard_avalanche",
    "hazard_summary"
  ]
  const hazardPrompts: string[] = [
    "Discuss current & forecast weather factors that can affect travel or hazard.",
    "Identify the avalance problem and location. Discuss the danger trend and timing.",
    "Discuss the advisory's key message"
  ]
  const routeFields: string[] = ["route_preview", "route_alternative"]
  const routePrompts: string[] = [
    "Preview terrain",
    "When uncertain discuss a less exposed alternate route"
  ]

  return (
    <form>
      <div className="title-wrapper">
        <img src={lightbulb} alt="lightbulb" className="form-icon" />
        <h2 className="title">PLAN your trip</h2>
      </div>
      <StepWizard nav={<FormNav steps={["1", "2", "3", "4"]} />}>
        <div className="step">
          <SectionTitle
            title="Assemble Your Group"
            fields={["group"]}
            isChecked={isChecked}
          />
          {renderTextInputs(["group"])}
        </div>
        <div className="step">
          <SectionTitle
            title="Anticipate the Hazard"
            fields={hazardFields}
            isChecked={isChecked}
          />
          {renderTextInputs(hazardFields, hazardPrompts)}
        </div>
        <div className="step">
          <SectionTitle
            title="Plan Your Route"
            fields={routeFields}
            isChecked={isChecked}
          />
          {renderTextInputs(routeFields, routePrompts)}
        </div>
        <div className="step">
          <SectionTitle
            title="Discuss Your Emergency Plan"
            fields={["emergencyPlan"]}
            isChecked={isChecked}
          />
          {renderTextInputs(["emergencyPlan"])}
        </div>
      </StepWizard>
    </form>
  )
}
