import { parseSemVer, isValidSemVer } from 'semver-parser';
import pkg from '../package.json';

const packageVersion = pkg.version;

// The path, i.e., the branch name or tag under which we are deploying.
const tagOrBranchName = process.env.VERSION || '';

const getVersion = () => {
	// Use just current version from package.json in dev env.
	if (process.env.NODE_ENV === 'development') {
		return packageVersion;
	}

	// If branch name is passed, prefix it with current version.
	if (!isValidSemVer(tagOrBranchName)) {
		return {
			...parseSemVer(packageVersion),
			postfix: tagOrBranchName,
		};
	}

	// Otherwise use given version from env.
	return parseSemVer(tagOrBranchName);
};

export default getVersion;
