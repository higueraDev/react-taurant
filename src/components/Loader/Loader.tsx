import React from "react";
// plugins
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// styles
import './Loader.scss'

const Loader = (): JSX.Element => {
	return <FontAwesomeIcon className="loader" spinPulse icon={faSpinner} />;
};

export default Loader;
