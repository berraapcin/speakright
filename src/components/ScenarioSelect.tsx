import React from "react";

interface Props {
  onSelectScenario: (scenario: string) => void;
}

import hotelIcon from "../img/hotel.png";
import interviewIcon from "../img/interview.png";
import airplaneIcon from "../img/airplane.png";
import cutleryIcon from "../img/cutlery.png";
import shoppingIcon from "../img/shopping-cart (2).png";

const ScenarioSelect: React.FC<Props> = ({ onSelectScenario }) => {
  return (
    <div className="scenario-buttons">
      <h3>Scénarios</h3>
      <table className="scenario-table">
        <tbody>
          <tr>
            <td>
              <button className="scenario-btn" onClick={() => onSelectScenario("hotel")}>
                <img src={hotelIcon} alt="Hotel" className="scenario-icon" />
                <span>Hotel Check-in</span>
              </button>
            </td>
            <td>
              <button className="scenario-btn" onClick={() => onSelectScenario("jobinterview")}>
                <img src={interviewIcon} alt="Interview" className="scenario-icon" />
                <span>Job Interview</span>
              </button>
            </td>
            <td>
              <button className="scenario-btn" onClick={() => onSelectScenario("airport")}>
                <img src={airplaneIcon} alt="Airport" className="scenario-icon" />
                <span>Airport</span>
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="centered-cell">
              <div className="center-buttons">
                <button className="scenario-btn" onClick={() => onSelectScenario("restaurant")}>
                  <img src={cutleryIcon} alt="Restaurant" className="scenario-icon" />
                  <span>Restaurant</span>
                </button>
                <button className="scenario-btn" onClick={() => onSelectScenario("supermarket")}>
                  <img src={shoppingIcon} alt="Supermarket" className="scenario-icon" />
                  <span>Supermarket</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioSelect;
