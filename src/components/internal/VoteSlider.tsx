import { Slider } from 'antd';

const VoteSlider = ({ value }) => {

  const railStyle = {
    background: `linear-gradient(to right, var(--secondary-blue-text-color) ${value}%, var(--secondary-red-text-color) ${value}%)`,
    height: '8px',
    borderRadius: '4px',
  };

  const handleStyle = {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: 0,
  };

  return (
    <div>
      <Slider
        min={0}
        max={100}
        value={value}
        styles={{ rail: railStyle, handle: handleStyle }}
        disabled
      />
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Outcome 1: {value}%</span>
        <span>Outcome 2: {100 - value}%</span>
      </div> */}
    </div>
  );
};

export default VoteSlider;
