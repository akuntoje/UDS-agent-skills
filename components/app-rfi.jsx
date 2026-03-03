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
    />
  );
};

export default RfiForm;
