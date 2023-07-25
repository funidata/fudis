"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[5449],{"./projects/ngx-fudis/src/lib/components/section/section.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Section",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/section/section.component.ts").e,argTypes:{},decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[],imports:[]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.BrowserAnimationsModule)]})],parameters:{controls:{exclude:["control"]}}},html=String.raw,Example=(()=>({props:{title:"This is title of section",titleTag:"h2",titleSize:"xl"},template:html`<fudis-section
		[id]="'my-section-id'"
		[title]="title"
		[tooltip]="'More info about this section'"
		[titleSize]="titleSize"
		[titleTag]="titleTag">
		<ng-template fudisNotifications type="section">
			<fudis-notification>This is notification</fudis-notification>
		</ng-template>
		<ng-template fudisContent type="section">
			<fudis-expandable [title]="'Expandable inside section'">
				<ng-template fudisContent type="expandable">
					<fudis-body-text fudis-body-text>Some content inside expandable</fudis-body-text>
				</ng-template>
			</fudis-expandable>
			<fudis-body-text>Some text content inside section</fudis-body-text>
		</ng-template>
	</fudis-section> `})).bind({})}}]);
//# sourceMappingURL=components-section-section-stories.32db288e.iframe.bundle.js.map