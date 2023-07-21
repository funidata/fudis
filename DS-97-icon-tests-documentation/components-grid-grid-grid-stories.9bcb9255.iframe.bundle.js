"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[6954],{"./projects/ngx-fudis/src/lib/components/grid/grid/grid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EquallyWideColumns:()=>EquallyWideColumns,Example:()=>Example,ResponsiveColumns:()=>ResponsiveColumns,UnequallyWideColumns:()=>UnequallyWideColumns,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_grid_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid/grid.component.ts");const html=String.raw,commonExclude=["_element","_gridInputObject","_columns","_gridService","applyGridCss","ngOnInit","ngOnChanges","setColumns","classes"],combinedExclude=commonExclude.concat(["align","alignItemsX","alignItemsY","classes","columnGap","marginBottom","marginSides","marginTop","rowGap","width"]),__WEBPACK_DEFAULT_EXPORT__={title:"Components/Grid/Grid",component:_grid_component__WEBPACK_IMPORTED_MODULE_1__.M,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>html` <style>
						.grid-item {
							padding: 0.5rem;
							background-color: #f1f1f1;
						}

						.text-margin {
							margin-bottom: 1rem;
						}
					</style>
					<div style="border: 3px solid #fdefb4">${story}</div>`))],parameters:{controls:{exclude:commonExclude}}},Example=(args=>({props:args,argTypes:{columns:{options:["1fr 3fr","1fr 1fr","5fr 1fr"],control:{type:"select"}}},template:html`<fudis-grid
		[columns]="columns"
		[align]="align"
		[alignItemsX]="alignItemsX"
		[alignItemsY]="alignItemsY"
		[marginTop]="marginTop"
		[marginBottom]="marginBottom"
		[marginSides]="marginSides"
		[width]="width"
		[columnGap]="columnGap"
		[rowGap]="rowGap">
		<fudis-heading class="grid-item" [tag]="'h1'" [size]="'lg'"
			>Fudis-headings will always take 100% width if they are direct child of Fudis grid component</fudis-heading
		>

		<div class="grid-item">
			<fudis-heading [tag]="'h3'" [size]="'sm'">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-item">
			<fudis-heading [tag]="'h3'" [size]="'sm'">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<fudis-body-text class="grid-item">Current value of grid-template-columns: {{columns}}</fudis-body-text>
		<fudis-body-text class="grid-item">Current value of grid-template-columns: {{columns}}</fudis-body-text>
		<fudis-body-text class="grid-item">Current value of grid-template-columns: {{columns}}</fudis-body-text>
		<fudis-body-text class="grid-item">Current value of grid-template-columns: {{columns}}</fudis-body-text>
	</fudis-grid>`})).bind({});Example.args={columns:3,align:"center",alignItemsX:"stretch",alignItemsY:"stretch",marginTop:"none",marginBottom:"none",marginSides:"responsive",width:"xxl",rowGap:"responsive",columnGap:"responsive"};const EquallyWideColumns=(args=>({props:args,template:html`<fudis-grid [columns]="columns">
		<fudis-heading class="grid-item" [tag]="'h1'" [size]="'lg'">Equally wide columns with number values</fudis-heading>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
	</fudis-grid>`})).bind({});EquallyWideColumns.args={columns:3},EquallyWideColumns.argTypes={columns:{options:[1,2,3,4,6],control:{type:"radio"}}},EquallyWideColumns.parameters={controls:{exclude:combinedExclude}};const UnequallyWideColumns=(args=>({props:args,template:html`<fudis-grid [columns]="columns">
		<fudis-heading class="grid-item" [tag]="'h1'" [size]="'lg'"
			>To apply unequally proportioned colums, use native CSS grid-template-column 'fr' values.</fudis-heading
		>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
	</fudis-grid>`})).bind({});UnequallyWideColumns.args={columns:"3fr 1fr"},UnequallyWideColumns.argTypes={columns:{options:["3fr 1fr","1fr 2fr","1fr 2fr 1fr","3fr 1fr 2fr"],control:{type:"radio"}}},UnequallyWideColumns.parameters={controls:{exclude:combinedExclude}};const ResponsiveColumns=(args=>({props:{...args,columnObjectOne:"{md: 2, xxl: 4}",defaultObject:"{xs: 1, md: 2, xl: 4}",columnObjectTwo:"{sm: 2, md: 3}",combinedObject:"{xs: 1, sm: 2, md: 3, xl: 4}"},template:html`<fudis-grid [columns]="columns">
		<fudis-grid-item class="grid-item" [columns]="'stretch'">
			<fudis-heading [tag]="'h1'" [size]="'lg'"
				>Provide settings object to 'columns' attribute to make Grid columns behave differently on different breakpoints
			</fudis-heading>
			<fudis-body-text class="text-margin"> You don't need to provide value for all breakpoints.</fudis-body-text>
			<fudis-body-text class="text-margin">
				E. g. with {{columnObjectOne}} Grid will have default value of '1fr' until 'md' breakpoint and 'md' rule is on
				until hitting 'xxl' breakpoint.</fudis-body-text
			>
			<fudis-body-text class="text-margin"
				>Using FudisGridService's 'setGridDefaultColumns()' you can define default values applied to all your
				Grids.</fudis-body-text
			>
			<fudis-body-text class="text-margin"
				>If you set default values and provide values values for single Grid, values are combined.
			</fudis-body-text>
			<fudis-body-text>
				E. g. with default values of {{defaultObject}} and provided Grid values of {{columnObjectTwo}} applied values
				will be: {{combinedObject}}
			</fudis-body-text>
		</fudis-grid-item>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Grid item</fudis-body-text>
	</fudis-grid>`})).bind({});ResponsiveColumns.args={columns:{xs:1,sm:2,md:"1fr 2fr",lg:3,xl:"1fr 2fr 1fr",xxl:6}},ResponsiveColumns.parameters={controls:{exclude:combinedExclude}}}}]);
//# sourceMappingURL=components-grid-grid-grid-stories.9bcb9255.iframe.bundle.js.map