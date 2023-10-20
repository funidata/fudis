import { parseSemVer, isValidSemVer } from 'semver-parser';
import pkg from '../package.json';

const packageVersion = pkg.version;

// The path, i.e., the branch name or tag under which we are deploying.
const tagOrBranchName = process.env.VERSION || '';

const getVersion = () => {

	// If branch name is passed, prefix it with current version.
	if (!isValidSemVer(tagOrBranchName)) {
		return {
			...parseSemVer(packageVersion),
			build: tagOrBranchName,
		};
	}

	// Otherwise use given version from env.
	return parseSemVer(tagOrBranchName);
};

export default getVersion;
