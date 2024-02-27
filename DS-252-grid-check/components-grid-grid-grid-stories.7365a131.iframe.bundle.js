/*! For license information please see components-grid-grid-grid-stories.7365a131.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[6954],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/ngx-fudis/src/lib/components/grid/grid/grid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EquallyWideColumns:()=>EquallyWideColumns,Example:()=>Example,ResponsiveColumns:()=>ResponsiveColumns,UnequallyWideColumns:()=>UnequallyWideColumns,__namedExportsOrder:()=>__namedExportsOrder,default:()=>grid_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),grid_component=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid/grid.component.ts"),storybook=__webpack_require__("./projects/ngx-fudis/src/lib/utilities/storybook.ts"),jsx_runtime=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js")),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),blocks_dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(blocks_dist.h_,{title:"Components/Grid/Grid"}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"grid",children:"Grid"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Grid is an essetial layout tool to make your application work nicely through different breakpoints and to align different elements to fit in the layout."}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Read and learn more about Grid usage guidelines from the ",(0,jsx_runtime.jsx)(_components.a,{href:"/docs/foundations-grid--documentation",children:"Foundations Grid documentation"}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"example-of-responsive-columns",children:"Example of Responsive Columns"}),"\n",(0,jsx_runtime.jsx)(blocks_dist.Xz,{of:ResponsiveColumns}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,jsx_runtime.jsx)(blocks_dist.Ed,{of:grid_component.M})]})}const readme=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},html=String.raw,grid_stories={title:"Components/Grid/Grid",component:grid_component.M,decorators:[(0,dist.componentWrapperDecorator)((story=>html` <style>
            .grid-item {
              padding: 0.5rem;
              background-color: #f1f1f1;
            }

            .text-margin {
              margin-bottom: 1rem;
            }
          </style>
          <div style="border: 3px solid #fdefb4">${story}</div>`))],parameters:{docs:{page:readme}}},Example=(args=>({props:args,template:html`<fudis-grid
    [columns]="columns"
    [align]="align"
    [alignItemsX]="alignItemsX"
    [alignItemsY]="alignItemsY"
    [marginTop]="marginTop"
    [marginBottom]="marginBottom"
    [marginSides]="marginSides"
    [width]="width"
    [columnGap]="columnGap"
    [rowGap]="rowGap"
  >
    <fudis-heading class="grid-item" [level]="1" [size]="'lg'"
      >Fudis-headings will always take 100% width if they are direct child of Fudis grid
      component</fudis-heading
    >

    <div class="grid-item">
      <fudis-heading [level]="3" [size]="'sm'">This is fudis-heading inside a div</fudis-heading>
      <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
    </div>
    <div class="grid-item">
      <fudis-heading [level]="3" [size]="'sm'">This is fudis-heading inside a div</fudis-heading>
      <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
    </div>
    <fudis-body-text class="grid-item"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="grid-item"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="grid-item"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="grid-item"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
  </fudis-grid>`})).bind({});Example.args={columns:3,align:"center",alignItemsX:"stretch",alignItemsY:"stretch",marginTop:"none",marginBottom:"none",marginSides:"responsive",width:"xxl",rowGap:"responsive",columnGap:"responsive"},Example.argTypes={columns:{options:[1,2,3,4,5,6,"1fr 3fr","1fr 1fr","5fr 1fr"],control:{type:"select"}},align:{options:["start","end","center"],control:{type:"select"}},alignItemsX:{options:["start","center","end","stretch"],control:{type:"select"}},alignItemsY:{options:["start","center","end","stretch"],control:{type:"select"}},width:{options:["xxl","xl","lg","md","sm","xs","initial"],control:{type:"select"}},marginTop:{options:["none","xxs","xs","sm","md","lg","xl","xxl"],control:{type:"select"}},marginBottom:{options:["none","xxs","xs","sm","md","lg","xl","xxl"],control:{type:"select"}},rowGap:{options:["responsive","none","xxs","xs","sm","md","lg","xl","xxl"],control:{type:"select"}},columnGap:{options:["responsive","none","xxs","xs","sm","md","lg","xl","xxl"],control:{type:"select"}},marginSides:{options:["responsive","none"],control:{type:"select"}}};const EquallyWideColumns=(args=>({props:args,template:html`<fudis-grid [columns]="columns">
    <fudis-heading class="grid-item" [level]="1" [size]="'lg'"
      >Equally wide columns with number values</fudis-heading
    >
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
  </fudis-grid>`})).bind({});EquallyWideColumns.args={columns:3},EquallyWideColumns.argTypes={columns:{options:[1,2,3,4,6],control:{type:"radio"}}},EquallyWideColumns.parameters={controls:{exclude:(0,storybook.Yu)(["columns"])}};const UnequallyWideColumns=(args=>({props:args,template:html`<fudis-grid [columns]="columns">
    <fudis-heading class="grid-item" [level]="1" [size]="'lg'"
      >To apply unequally proportioned colums, use native CSS grid-template-column 'fr'
      values.</fudis-heading
    >
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
  </fudis-grid>`})).bind({});UnequallyWideColumns.args={columns:"3fr 1fr"},UnequallyWideColumns.argTypes={columns:{options:["3fr 1fr","1fr 2fr","1fr 2fr 1fr","3fr 1fr 2fr"],control:{type:"radio"}}},UnequallyWideColumns.parameters={controls:{exclude:(0,storybook.Yu)(["columns"])}};const ResponsiveColumns=(args=>({props:{...args,columnObjectOne:"{md: 2, xxl: 4}",defaultObject:"{xs: 1, md: 2, xl: 4}",columnObjectTwo:"{sm: 2, md: 3}",combinedObject:"{xs: 1, sm: 2, md: 3, xl: 4}"},template:html`<fudis-grid [columns]="columns">
    <fudis-grid-item class="grid-item" [columns]="'stretch'">
      <fudis-heading [level]="1" [size]="'lg'"
        >Provide settings object to 'columns' attribute to make Grid columns behave differently on
        different breakpoints
      </fudis-heading>
      <fudis-body-text class="text-margin">
        You don't need to provide value for all breakpoints.</fudis-body-text
      >
      <fudis-body-text class="text-margin">
        E. g. with {{columnObjectOne}} Grid will have default value of '1fr' until 'md' breakpoint
        and 'md' rule is on until hitting 'xxl' breakpoint.</fudis-body-text
      >
      <fudis-body-text class="text-margin"
        >Using FudisGridService's 'setDefaultValues()' you can define default values applied to all
        your Grids.</fudis-body-text
      >
      <fudis-body-text class="text-margin"
        >If you set default values and provide values for single Grid, values are combined.
      </fudis-body-text>
      <fudis-body-text>
        E. g. with default values of {{defaultObject}} and provided Grid values of
        {{columnObjectTwo}} applied values will be: {{combinedObject}}
      </fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Grid item</fudis-body-text>
  </fudis-grid>`})).bind({});ResponsiveColumns.args={columns:{xs:1,sm:2,md:"1fr 2fr",lg:3,xl:"1fr 2fr 1fr",xxl:6}},ResponsiveColumns.parameters={controls:{exclude:(0,storybook.Yu)(["columns"])}},Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'(args: GridComponent) => ({\n  props: args,\n  template: html`<fudis-grid\n    [columns]="columns"\n    [align]="align"\n    [alignItemsX]="alignItemsX"\n    [alignItemsY]="alignItemsY"\n    [marginTop]="marginTop"\n    [marginBottom]="marginBottom"\n    [marginSides]="marginSides"\n    [width]="width"\n    [columnGap]="columnGap"\n    [rowGap]="rowGap"\n  >\n    <fudis-heading class="grid-item" [level]="1" [size]="\'lg\'"\n      >Fudis-headings will always take 100% width if they are direct child of Fudis grid\n      component</fudis-heading\n    >\n\n    <div class="grid-item">\n      <fudis-heading [level]="3" [size]="\'sm\'">This is fudis-heading inside a div</fudis-heading>\n      <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n    </div>\n    <div class="grid-item">\n      <fudis-heading [level]="3" [size]="\'sm\'">This is fudis-heading inside a div</fudis-heading>\n      <fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>\n    </div>\n    <fudis-body-text class="grid-item"\n      >Current value of grid-template-columns: {{columns}}</fudis-body-text\n    >\n    <fudis-body-text class="grid-item"\n      >Current value of grid-template-columns: {{columns}}</fudis-body-text\n    >\n    <fudis-body-text class="grid-item"\n      >Current value of grid-template-columns: {{columns}}</fudis-body-text\n    >\n    <fudis-body-text class="grid-item"\n      >Current value of grid-template-columns: {{columns}}</fudis-body-text\n    >\n  </fudis-grid>`\n})',...Example.parameters?.docs?.source}}},EquallyWideColumns.parameters={...EquallyWideColumns.parameters,docs:{...EquallyWideColumns.parameters?.docs,source:{originalSource:'(args: GridComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="columns">\n    <fudis-heading class="grid-item" [level]="1" [size]="\'lg\'"\n      >Equally wide columns with number values</fudis-heading\n    >\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n  </fudis-grid>`\n})',...EquallyWideColumns.parameters?.docs?.source}}},UnequallyWideColumns.parameters={...UnequallyWideColumns.parameters,docs:{...UnequallyWideColumns.parameters?.docs,source:{originalSource:'(args: GridComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="columns">\n    <fudis-heading class="grid-item" [level]="1" [size]="\'lg\'"\n      >To apply unequally proportioned colums, use native CSS grid-template-column \'fr\'\n      values.</fudis-heading\n    >\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n  </fudis-grid>`\n})',...UnequallyWideColumns.parameters?.docs?.source}}},ResponsiveColumns.parameters={...ResponsiveColumns.parameters,docs:{...ResponsiveColumns.parameters?.docs,source:{originalSource:'(args: GridComponent) => ({\n  props: {\n    ...args,\n    columnObjectOne: \'{md: 2, xxl: 4}\',\n    defaultObject: \'{xs: 1, md: 2, xl: 4}\',\n    columnObjectTwo: \'{sm: 2, md: 3}\',\n    combinedObject: \'{xs: 1, sm: 2, md: 3, xl: 4}\'\n  },\n  template: html`<fudis-grid [columns]="columns">\n    <fudis-grid-item class="grid-item" [columns]="\'stretch\'">\n      <fudis-heading [level]="1" [size]="\'lg\'"\n        >Provide settings object to \'columns\' attribute to make Grid columns behave differently on\n        different breakpoints\n      </fudis-heading>\n      <fudis-body-text class="text-margin">\n        You don\'t need to provide value for all breakpoints.</fudis-body-text\n      >\n      <fudis-body-text class="text-margin">\n        E. g. with {{columnObjectOne}} Grid will have default value of \'1fr\' until \'md\' breakpoint\n        and \'md\' rule is on until hitting \'xxl\' breakpoint.</fudis-body-text\n      >\n      <fudis-body-text class="text-margin"\n        >Using FudisGridService\'s \'setDefaultValues()\' you can define default values applied to all\n        your Grids.</fudis-body-text\n      >\n      <fudis-body-text class="text-margin"\n        >If you set default values and provide values for single Grid, values are combined.\n      </fudis-body-text>\n      <fudis-body-text>\n        E. g. with default values of {{defaultObject}} and provided Grid values of\n        {{columnObjectTwo}} applied values will be: {{combinedObject}}\n      </fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Grid item</fudis-body-text>\n  </fudis-grid>`\n})',...ResponsiveColumns.parameters?.docs?.source}}};const __namedExportsOrder=["Example","EquallyWideColumns","UnequallyWideColumns","ResponsiveColumns"]}}]);
//# sourceMappingURL=components-grid-grid-grid-stories.7365a131.iframe.bundle.js.map