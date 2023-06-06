"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[4187],{"./projects/ngx-fudis/src/lib/components/grid/grid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Grid:()=>Grid,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Grid",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid.component.ts").M,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n\t\t\t<style>\n\t\t\t.grid-test-item{\n\t\t\t\tborder: 3px solid cornflowerblue;\n\t\t\t}\n\t\t\t</style>\n\t\t\t<div style="border: 3px solid orangered">\t\n\t\t${story}\n\t\t</div>`))],argTypes:{columns:{options:["1fr 3fr","1fr 1fr","5fr 1fr"],control:{type:"select"}},align:{control:{type:"select"}},marginTop:{control:{type:"select"}},marginBottom:{control:{type:"select"}},rowGap:{options:["none","xxs","xs","sm","md","lg","xl","xxl","responsive"],control:{type:"select"}},columnGap:{options:["none","xxs","xs","sm","md","lg","xl","xxl","responsive"],control:{type:"select"}}},parameters:{controls:{exclude:["columnsToApply","ngOnInit","breakpointObserver","columnsFromInput","gridWidths","gridWidthsArray"]}}},html=String.raw,Grid=(args=>({props:args,template:html`<fudis-grid
		[columns]="columns"
		[columnsXs]="columnsXs"
		[columnsSm]="columnsSm"
		[columnsMd]="columnsMd"
		[columnsLg]="columnsLg"
		[columnsXl]="columnsXl"
		[columnsXxl]="columnsXxl"
		[align]="align"
		[alignItemsX]="alignItemsX"
		[alignItemsY]="alignItemsY"
		[marginTop]="marginTop"
		[marginBottom]="marginBottom"
		[width]="width"
		[columnGap]="columnGap"
		[rowGap]="rowGap">
		<fudis-heading class="grid-test-item" tag="h1" size="l"
			>Fudis-headings will always take 100% width if they are direct child of Fudis grid component</fudis-heading
		>

		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
	</fudis-grid>`})).bind({});Grid.args={columns:"1fr 1fr 1fr",columnsXs:"1fr",columnsSm:"1fr 1fr",columnsMd:void 0,columnsLg:void 0,columnsXl:void 0,columnsXxl:"1fr 1fr 1fr 1fr",align:"center",alignItemsX:"stretch",alignItemsY:"stretch",marginTop:"none",marginBottom:"none",marginSides:"none",width:"xxl",rowGap:"responsive",columnGap:"responsive"}}}]);
//# sourceMappingURL=components-grid-grid-stories.62a7a202.iframe.bundle.js.map