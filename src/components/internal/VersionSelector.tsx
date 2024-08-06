import { useVersion } from "../../contexts/VersionContext";
import "./VersionSelector.css";

const VersionSelector: React.FC = () => {
  const { selectedVersion, setSelectedVersion } = useVersion();

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <select className="version-select" value={selectedVersion} onChange={handleVersionChange}>
      <option value="v0_1">v0_1</option>
      <option value="v1" disabled>v1</option>
      {/* Add more versions as needed */}
    </select>
  );
};

export default VersionSelector;
