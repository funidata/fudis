"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[5449],{"./projects/ngx-fudis/src/lib/components/section/section.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Section",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/section/section.component.ts").e,argTypes:{},decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[],imports:[]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.BrowserAnimationsModule)]})],parameters:{controls:{exclude:["control"]}}},html=String.raw,Example=(()=>({props:{title:"This is title of section",titleLevel:2,titleSize:"xl"},template:html`<fudis-section
    [id]="'my-section-id'"
    [title]="title"
    [tooltip]="'More info about this section'"
    [titleSize]="titleSize"
    [titleLevel]="titleLevel"
  >
    <ng-template fudisActions type="section">
      <fudis-button [label]="'Some action'" />
      <fudis-button [label]="'Another action'" />
    </ng-template>
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
  </fudis-section> `})).bind({});Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'() => ({\n  props: {\n    title: \'This is title of section\',\n    titleLevel: 2,\n    titleSize: \'xl\'\n  },\n  template: html`<fudis-section\n    [id]="\'my-section-id\'"\n    [title]="title"\n    [tooltip]="\'More info about this section\'"\n    [titleSize]="titleSize"\n    [titleLevel]="titleLevel"\n  >\n    <ng-template fudisActions type="section">\n      <fudis-button [label]="\'Some action\'" />\n      <fudis-button [label]="\'Another action\'" />\n    </ng-template>\n    <ng-template fudisNotifications type="section">\n      <fudis-notification>This is notification</fudis-notification>\n    </ng-template>\n    <ng-template fudisContent type="section">\n      <fudis-expandable [title]="\'Expandable inside section\'">\n        <ng-template fudisContent type="expandable">\n          <fudis-body-text fudis-body-text>Some content inside expandable</fudis-body-text>\n        </ng-template>\n      </fudis-expandable>\n      <fudis-body-text>Some text content inside section</fudis-body-text>\n    </ng-template>\n  </fudis-section> `\n})',...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]}}]);
//# sourceMappingURL=components-section-section-stories.d0d2fbaa.iframe.bundle.js.map