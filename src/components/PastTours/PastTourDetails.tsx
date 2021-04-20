import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import "./PastTours.css"

import { getPlan, cleanInputStrings } from "../../util.js"
import { NavBar } from "../NavBar/NavBar"

import circleCheck from "../../assets/purplebluecircle.png"
import question from "../../assets/question-sign.svg"
import route from "../../assets/travel.svg"
import lightbulb from "../../assets/light-bulb (1).svg"

interface TourPlan {
  hazard_weather: string
  hazard_avalanche: string
  hazard_summary: string
  route_preview: string
  route_alternative: string
  emergency_plan: string
  debrief_conditions: string
  debrief_decisions: string
  debrief_plan: string
}

interface TParams {
  userId: string
  tourId: string
  location: string
  date: string
}

export const PastTourDetails: React.FC<RouteComponentProps<TParams>> = ({
  match,
}) => {
  const { getAccessTokenSilently } = useAuth0()

  const tourId = match.params.tourId
  const location = match.params.location
  const date = match.params.date

  const [pastTour, setPastTour] = useState<TourPlan>({
    hazard_weather: "",
    hazard_avalanche: "",
    hazard_summary: "",
    route_preview: "",
    route_alternative: "",
    emergency_plan: "",
    debrief_conditions: "",
    debrief_decisions: "",
    debrief_plan: "",
  })

  useEffect(() => {
    if (tourId.length && match) {
      getAccessTokenSilently().then((token) =>
        getPlan(token, match.params.userId, tourId).then((plan) => {
          setPastTour(cleanInputStrings(plan.data[0].attributes))
        })
      )
    }
  }, [getAccessTokenSilently, tourId, match])

  return (
    <main className="background">
      <div className="sub-container">
        <div className="location">
          <h1>{location}</h1>
          <p className="date">{date}</p>
        </div>

        <section className="plan">
          <div className="title-wrapper">
            <img src={lightbulb} alt="lightbulb" className="form-icon" />
            <h2>PLAN your trip</h2>
          </div>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Anticipate The Hazard</h3>
            </div>

            <div className="step-wrapper">
              <p className="section-description">
                Discuss current & forecast weather factors that can affect
                travel or hazard:
              </p>
              {pastTour.hazard_weather ? (
                <div className="input-wrapper">
                  <p>{pastTour.hazard_weather}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>

            <div className="step-wrapper">
              <p className="section-description">
                Identify the avalanche problem and location. Discuss the danger
                trend and timing:
              </p>
              {pastTour.hazard_avalanche ? (
                <div className="input-wrapper">
                  <p>{pastTour.hazard_avalanche}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>

            <div className="step-wrapper">
              <p className="section-description">
                Discuss the advisory's key message:
              </p>
              {pastTour.hazard_summary ? (
                <div className="input-wrapper">
                  <p>{pastTour.hazard_summary}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Plan Your Route:</h3>
            </div>

            <div className="step-wrapper">
              <p className="section-description">Preview Terrain:</p>

              {pastTour.route_preview ? (
                <div className="input-wrapper">
                  <p>{pastTour.route_preview}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>

            <div className="step-wrapper">
              <p className="section-description">Alternate Route:</p>
              {pastTour.route_alternative ? (
                <div className="input-wrapper">
                  <p>{pastTour.route_alternative}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Discuss Your Emergency Plan:</h3>
            </div>

            <div className="step-wrapper">
              <p className="section-description">Emergency Plan:</p>
              {pastTour.emergency_plan ? (
                <div className="input-wrapper">
                  <p>{pastTour.emergency_plan}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>
        </section>

        <section className="ride">
          <div className="title-wrapper">
            <img src={route} alt="route" className="form-icon" />
            <h2>RIDE safely</h2>
          </div>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Conduct a Departure Check</h3>
            </div>
          </article>
        </section>

        <section className="debrief">
          <div className="title-wrapper">
            <img src={question} alt="question mark" className="form-icon" />
            <h2>DEBRIEF</h2>
          </div>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Summarize Conditions</h3>
            </div>

            <div className="step-wrapper">
              {pastTour.debrief_conditions ? (
                <div className="input-wrapper">
                  <p>{pastTour.debrief_conditions}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Review Decisions</h3>
            </div>
            <div className="step-wrapper">
              {pastTour.debrief_decisions ? (
                <div className="input-wrapper">
                  <p>{pastTour.debrief_decisions}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>

          <article>
            <div className="category-wrapper">
              <img src={circleCheck} alt="checkmark" className="check-icon" />
              <h3>Improve Your Plan</h3>
            </div>
            <div className="step-wrapper">
              {pastTour.debrief_decisions ? (
                <div className="input-wrapper">
                  <p>{pastTour.debrief_plan}</p>
                </div>
              ) : (
                <p>
                  Nothing to see here! Looks like you never filled out this
                  step.
                </p>
              )}
            </div>
          </article>
        </section>
      </div>

      <NavBar />
    </main>
  )
}
