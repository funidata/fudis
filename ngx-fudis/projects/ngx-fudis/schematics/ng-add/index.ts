// eslint-disable-next-line import/no-extraneous-dependencies
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.addTask(new NodePackageInstallTask());
		return tree;
	};
}
