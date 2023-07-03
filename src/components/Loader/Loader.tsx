import React from "react";
// plugins
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = (): JSX.Element => {
	return <FontAwesomeIcon spinPulse icon={faSpinner} />;
};

export default Loader;
