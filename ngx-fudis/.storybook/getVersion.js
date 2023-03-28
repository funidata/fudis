import { parseSemVer, isValidSemVer } from 'semver-parser';

// The path, i.e., the branch name or tag under which we are deploying.
const tagOrBranchName = process.env.VERSION || '';

const defaultVersion = {
	major: 0,
	minor: 0,
	patch: 0,
	postfix: '',
};

const getVersion = () => {
	if (!isValidSemVer(tagOrBranchName)) {
		return {
			...defaultVersion,
			postfix: tagOrBranchName,
		};
	}

	return parseSemVer(tagOrBranchName);
};

export default getVersion;
