"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[817],{"./projects/ngx-fudis/src/lib/components/form/dropdown/dropdown.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MultiSelect:()=>MultiSelect,SingleSelect:()=>SingleSelect,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/forms/fesm2020/forms.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2020/animations.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Form/Dropdown",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/form/dropdown/dropdown.component.ts").J,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.BrowserAnimationsModule)]})],argTypes:{}},html=String.raw,Template=args=>({props:args,template:html`
		<fudis-dropdown
			size="l"
			[multipleOption]="multipleOption"
			[placeholder]="placeholder"
			[errorMsg]="errorMsg"
			[control]="control"
			[options]="options"
			[requiredText]="requiredText"
			[label]="label"
			[id]="id"
			[helpText]="helpText"
			[tooltip]="tooltip"
			[tooltipPosition]="tooltipPosition"
			tooltipToggle="tooltipToggle"></fudis-dropdown>

		<ng-container *ngIf="control.value.length > 0">
			<ng-container *ngFor="let value of control.value">
				<fudis-body-text>Looks picked a pet with 'viewValue' of: {{value.viewValue}}</fudis-body-text>
				<fudis-body-text>And it's technical beep boop 'value' is: {{value.value}}</fudis-body-text>
			</ng-container>
		</ng-container>

		<ng-container *ngIf="control.value.value">
			<fudis-body-text>Looks picked a pet with 'viewValue' of: {{control.value.viewValue}}</fudis-body-text>
			<fudis-body-text>And it's technical beep boop 'value' is: {{control.value.value}}</fudis-body-text>
		</ng-container>
	`}),SingleSelect=Template.bind({});SingleSelect.args={errorMsg:{required:"It is necessary to choose a pet. It's good for your health!"},requiredText:"Required",required:!0,label:"Select a pet",placeholder:"Choose a pet",multipleOption:!1,control:new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NI("",_angular_forms__WEBPACK_IMPORTED_MODULE_4__.kI.required),id:"example-id-for-dropdown-select",helpText:"All pets are equally important, but for sake of this example please pick one.",options:[{value:"value-1-dog",viewValue:"Dog"},{value:"value-2-capybara",viewValue:"Capybara"},{value:"value-3-platypys",viewValue:"Platypus"},{value:"value-4-cat",viewValue:"Cat, disabled for demo purposes",disabled:!0},{value:"value-5-armadillo",viewValue:"Screaming hairy armadillo"},{value:"value-6-gecko",viewValue:"Southern Titiwangsa Bent-Toed Gecko"}]};const MultiSelect=Template.bind({});MultiSelect.args={errorMsg:{required:"It is necessary to choose multiple pets. It's even better for your health!",minlength:"Choose at least two pets",maxlength:"That's probably too much already."},multipleOption:!0,requiredText:"Required",required:!0,label:"Select from two to three pets",placeholder:"Choose a pet",control:new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NI("",[_angular_forms__WEBPACK_IMPORTED_MODULE_4__.kI.required,_angular_forms__WEBPACK_IMPORTED_MODULE_4__.kI.minLength(2),_angular_forms__WEBPACK_IMPORTED_MODULE_4__.kI.maxLength(3)]),id:"example-id-for-dropdown-multi-select",helpText:"All pets are equally important, but for sake of this example please pick two to three pets.",tooltip:"Platypus is the right choise",tooltipPosition:"below",tooltipToggle:!1,options:[{value:"value-1-dog",viewValue:"Dog"},{value:"value-2-capybara",viewValue:"Capybara"},{value:"value-3-platypys",viewValue:"Platypus"},{value:"value-4-cat",viewValue:"Cat, disabled for demo purposes",disabled:!0},{value:"value-5-armadillo",viewValue:"Screaming hairy armadillo"},{value:"value-6-gecko",viewValue:"Southern Titiwangsa Bent-Toed Gecko"}]}}}]);
//# sourceMappingURL=components-form-dropdown-dropdown-stories.fd269888.iframe.bundle.js.map