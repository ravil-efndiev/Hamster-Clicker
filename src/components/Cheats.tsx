interface Props {
  onCheatApply: () => void;
}

function Cheats({ onCheatApply }: Props) {
  return (
    <div className="cheat-menu">
      <input
        type="button"
        value="get 1000"
        className="btn btn-primary"
        onClick={() => onCheatApply()}
      />
    </div>
  );
}

export default Cheats;
