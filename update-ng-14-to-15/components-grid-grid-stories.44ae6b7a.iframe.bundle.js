"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[187],{"./projects/ngx-fudis/src/lib/components/grid/grid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Grid:()=>Grid,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Grid",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid.component.ts").M,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n            <style>\n            .grid-test-item{\n                border: 3px solid cornflowerblue;\n            }\n            </style>\n            <div style="border: 3px solid orangered">\t\n        ${story}\n        </div>`))],argTypes:{columns:{options:["1fr 3fr","1fr 1fr","5fr 1fr"],control:{type:"select"}},align:{control:{type:"select"}},marginTop:{control:{type:"select"}},marginBottom:{control:{type:"select"}},rowGap:{options:["none","xxs","xs","s","m","l","xl","xxl","responsive"],control:{type:"select"}},columnGap:{options:["none","xxs","xs","s","m","l","xl","xxl","responsive"],control:{type:"select"}}},parameters:{controls:{exclude:["columnsToApply","fakeGridArray","ngOnInit","breakpointObserver","columnsFromInput","gridWidths","gridWidthsArray"]}}},html=String.raw,Grid=(args=>({template:html`<fudis-grid
        [columns]="'1fr 1fr 1fr'"
        [columnsXs]="columnsXs"
        [columnsS]="columnsS"
        [columnsM]="columnsM"
        [columnsL]="columnsL"
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
        <fudis-heading class="grid-test-item" tag="h2" size="s"
            >If you change any of the column size values from the controls, please refresh the page for ngMaterial's
            Breakpoint Observer to register the new values!</fudis-heading
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
    </fudis-grid>`,props:args})).bind({});Grid.args={},Grid.parameters={...Grid.parameters,docs:{...Grid.parameters?.docs,source:{originalSource:'args => ({\n  template: html`<fudis-grid\n        [columns]="\'1fr 1fr 1fr\'"\n        [columnsXs]="columnsXs"\n        [columnsS]="columnsS"\n        [columnsM]="columnsM"\n        [columnsL]="columnsL"\n        [columnsXl]="columnsXl"\n        [columnsXxl]="columnsXxl"\n        [align]="align"\n        [alignItemsX]="alignItemsX"\n        [alignItemsY]="alignItemsY"\n        [marginTop]="marginTop"\n        [marginBottom]="marginBottom"\n        [width]="width"\n        [columnGap]="columnGap"\n        [rowGap]="rowGap">\n        <fudis-heading class="grid-test-item" tag="h1" size="l"\n            >Fudis-headings will always take 100% width if they are direct child of Fudis grid component</fudis-heading\n        >\n        <fudis-heading class="grid-test-item" tag="h2" size="s"\n            >If you change any of the column size values from the controls, please refresh the page for ngMaterial\'s\n            Breakpoint Observer to register the new values!</fudis-heading\n        >\n\n        <div class="grid-test-item">\n            <fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>\n            <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n        </div>\n        <div class="grid-test-item">\n            <fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>\n            <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n        </div>\n        <div class="grid-test-item">\n            <fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>\n            <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n        </div>\n        <div class="grid-test-item">\n            <fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>\n            <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n        </div>\n        <div class="grid-test-item">\n            <fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>\n            <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n        </div>\n    </fudis-grid>`,\n  props: args\n})',...Grid.parameters?.docs?.source}}}}}]);