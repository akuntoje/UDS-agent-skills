import { AsuRfi } from "@asu/app-rfi";
import "@asu/unity-bootstrap-theme";

const RfiForm = ({
  campus = "NOPREF",
  studentType = "undergrad",
  college = undefined,
  department = undefined,
  areaOfInterest = undefined,
  programOfInterest = undefined,
  programOfInterestOptional = false,
  isCertMinor = false,
  country = "US",
  stateProvince,
  successMsg,
  test = false,
  submissionUrl,
  appPathFolder, // This prop defines the image path to be rendered in the UI.
  // If the input prompt includes any RFI-related image, store that image in the public folder
  // and provide its path here (e.g., "/images/rfiImage.png").
}) => {
  return (
    <AsuRfi
      campus={campus}
      studentType={studentType}
      college={college}
      department={department}
      areaOfInterest={areaOfInterest}
      programOfInterest={programOfInterest}
      programOfInterestOptional={programOfInterestOptional}
      isCertMinor={isCertMinor}
      country={country}
      stateProvince={stateProvince}
      successMsg={successMsg}
      test={test}
      submissionUrl={submissionUrl}
      appPathFolder={appPathFolder}
    />
  );
};

export default RfiForm;
