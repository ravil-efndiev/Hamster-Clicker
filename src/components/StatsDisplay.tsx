import energyIcon from "../assets/Monster-Energy-PNG-Pic.png"

interface Props {
  multitapLvl: number;
  autotapLvl: number;
  crittapLvl: number;
  tapGain: number;
  autotapRate: number;
  critChance: number;
  energy: number;
}

function StatsDisplay(props: Props) {
  return (
    <div className="display-panel">
      <div className="energy-display">
        <img src={energyIcon} alt="energy-icon" className="energy-icon" />
        <p className="energy-value">{props.energy}</p>
      </div>
      <div className="stats-display">
        <p className="stat">
          Multitap <span className="stat-highlight">{props.multitapLvl}</span>;
        </p>
        <p className="stat">Tap gain: {props.tapGain}</p>
        <p className="stat">
          Autotap <span className="stat-highlight">{props.autotapLvl}</span>;
        </p>
        <p className="stat">Autotap rate: {props.autotapRate / 1000}s</p>
        <p className="stat">
          Crittap <span className="stat-highlight">{props.crittapLvl}</span>;
        </p>
        <p className="stat">Crit chance: {props.critChance}%</p>
      </div>
    </div>
  );
}

export default StatsDisplay;
