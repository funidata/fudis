/*! For license information please see components-grid-grid-item-grid-item-stories.8694fbbb.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[9625],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AlignSelfX:()=>AlignSelfX,AlignSelfXAndY:()=>AlignSelfXAndY,AlignSelfY:()=>AlignSelfY,Columns:()=>Columns,Example:()=>Example,ResponsiveColumns:()=>ResponsiveColumns,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _grid_item_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.component.ts"),_grid_item_docs_mdx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.docs.mdx");const html=String.raw,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Grid/Grid Item",component:_grid_item_component__WEBPACK_IMPORTED_MODULE_0__.b,parameters:{docs:{page:_grid_item_docs_mdx__WEBPACK_IMPORTED_MODULE_1__.default}}},Example=(args=>({props:args,template:html`<fudis-grid [columns]="4">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-body-text
        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide
        enough.</fudis-body-text
      >
    </fudis-grid-item>
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="alignSelfX"
      [alignSelfY]="alignSelfY"
      [columns]="columns"
    >
      <fudis-body-text>Adjustable grid item</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`})).bind({});Example.args={alignSelfX:"stretch",alignSelfY:"stretch",columns:"auto"},Example.argTypes={alignSelfX:{options:["stretch","start","end","center"],control:{type:"radio"}},alignSelfY:{options:["stretch","start","end","center"],control:{type:"radio"}},columns:{options:["stretch","auto",2,"2/4","2/-1"],control:{type:"radio"}}};const AlignSelfX=args=>({props:{...args,responsiveAlignSelfX:"{ sm: 'start', md: 'end', lg: 'center' }"},template:html`<fudis-grid [columns]="2">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>

    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-grid-item [alignSelfX]="'start'" class="storybook__item-highlight"
      ><fudis-body-text>alignSelfX = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'end'"
      ><fudis-body-text>alignSelfX = 'end'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>

    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'center'">
      <fudis-body-text>alignSelfX = 'center' </fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="{sm: 'start', md: 'end', lg: 'center'}"
    >
      <fudis-body-text>Responsive alignSelfX =</fudis-body-text>
      <fudis-body-text>"{{responsiveAlignSelfX}}"</fudis-body-text>
    </fudis-grid-item>
  </fudis-grid>`}),AlignSelfY=args=>({props:args,template:html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="storybook__item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >

    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'start'"
      ><fudis-body-text>alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'center'"
      ><fudis-body-text>alignSelfY = 'center'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfY]="{xs: 'end', sm: 'stretch', md: 'start', lg: 'center'}"
      ><fudis-body-text>alignSelfY = 'responsive'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`}),AlignSelfXAndY=args=>({props:args,template:html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'start'" [alignSelfY]="'start'"
      ><fudis-body-text>align = 'start' & alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'end'" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfX = 'end' & alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="'center'"
      [alignSelfY]="'center'"
      ><fudis-body-text
        >alignSelfX = 'center' & alignSelfY = 'center'</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`}),Columns=args=>({props:args,template:html`<fudis-grid [columns]="6">
    <fudis-grid-item class="storybook__item-highlight" [columns]="'stretch'">
      <fudis-body-text>columns = 'stretch', so it takes the full width</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="storybook__item" class="storybook__item">
      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="'3/-1'"
      ><fudis-body-text
        >columns = '3/-1', so it starts from the 3rd column and stretches to the
        end</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="2"
      ><fudis-body-text
        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item" class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="'5/-1'"
      ><fudis-body-text
        >columns = '5/-1', so it starts 5th column and stretches until the very
        end.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`}),ResponsiveColumns=args=>({props:{...args,exampleOne:{xs:"stretch",md:3,lg:1},exampleOneString:"{'xs: 'stretch', md: 3, lg: 'auto'}",exampleTwo:{default:"4/-1",md:2},exampleTwoString:"{ default: '4/-1', md: 2 }",exampleThree:{xs:"2/-1",md:3,lg:"2/-1"},exampleThreeString:"{ xs: '2/-1', md: 3, lg: '2/-1' }"},template:html`<fudis-grid [columns]="6">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-body-text
        >Try resizing canvas width, so different span widths for items are applied on different
        breakpoints.</fudis-body-text
      >
    </fudis-grid-item>

    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleOne">
      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleTwo"
      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleThree"
      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item
    >
  </fudis-grid> `});AlignSelfX.parameters={controls:{exclude:/.*/g}},AlignSelfY.parameters={controls:{exclude:/.*/g}},AlignSelfXAndY.parameters={controls:{exclude:/.*/g}},Columns.parameters={controls:{exclude:/.*/g}},ResponsiveColumns.parameters={controls:{exclude:/.*/g}},Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="4">\n    <fudis-grid-item [columns]="\'stretch\'">\n      <fudis-body-text\n        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide\n        enough.</fudis-body-text\n      >\n    </fudis-grid-item>\n    <fudis-grid-item\n      class="storybook__item-highlight"\n      [alignSelfX]="alignSelfX"\n      [alignSelfY]="alignSelfY"\n      [columns]="columns"\n    >\n      <fudis-body-text>Adjustable grid item</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n  </fudis-grid>`\n})',...Example.parameters?.docs?.source}}},AlignSelfX.parameters={...AlignSelfX.parameters,docs:{...AlignSelfX.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: {\n    ...args,\n    responsiveAlignSelfX: "{ sm: \'start\', md: \'end\', lg: \'center\' }"\n  },\n  template: html`<fudis-grid [columns]="2">\n    <fudis-grid-item class="storybook__item-highlight">\n      <fudis-body-text>alignSelfX = \'stretch\' (default)</fudis-body-text>\n    </fudis-grid-item>\n\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-grid-item [alignSelfX]="\'start\'" class="storybook__item-highlight"\n      ><fudis-body-text>alignSelfX = \'start\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="\'end\'"\n      ><fudis-body-text>alignSelfX = \'end\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="\'center\'">\n      <fudis-body-text>alignSelfX = \'center\' </fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>\n    <fudis-grid-item\n      class="storybook__item-highlight"\n      [alignSelfX]="{sm: \'start\', md: \'end\', lg: \'center\'}"\n    >\n      <fudis-body-text>Responsive alignSelfX =</fudis-body-text>\n      <fudis-body-text>"{{responsiveAlignSelfX}}"</fudis-body-text>\n    </fudis-grid-item>\n  </fudis-grid>`\n})',...AlignSelfX.parameters?.docs?.source}}},AlignSelfY.parameters={...AlignSelfY.parameters,docs:{...AlignSelfY.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="2" [width]="\'sm\'">\n    <fudis-grid-item class="storybook__item-highlight">\n      <fudis-body-text>alignSelfY = \'stretch\' (default)</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-grid-item class="storybook__item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="\'start\'"\n      ><fudis-body-text>alignSelfY = \'start\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="\'end\'"\n      ><fudis-body-text>alignSelfY = \'end\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="storybook__item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="\'center\'"\n      ><fudis-body-text>alignSelfY = \'center\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="storybook__item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item\n      class="storybook__item-highlight"\n      [alignSelfY]="{xs: \'end\', sm: \'stretch\', md: \'start\', lg: \'center\'}"\n      ><fudis-body-text>alignSelfY = \'responsive\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="storybook__item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n  </fudis-grid>`\n})',...AlignSelfY.parameters?.docs?.source}}},AlignSelfXAndY.parameters={...AlignSelfXAndY.parameters,docs:{...AlignSelfXAndY.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="2" [width]="\'sm\'">\n    <fudis-grid-item class="storybook__item-highlight">\n      <fudis-body-text>alignSelfX = \'stretch\' & alignSelfY = \'stretch\' (default)</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="\'start\'" [alignSelfY]="\'start\'"\n      ><fudis-body-text>align = \'start\' & alignSelfY = \'start\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="\'end\'" [alignSelfY]="\'end\'"\n      ><fudis-body-text>alignSelfX = \'end\' & alignSelfY = \'end\'</fudis-body-text></fudis-grid-item\n    ><fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item\n      class="storybook__item-highlight"\n      [alignSelfX]="\'center\'"\n      [alignSelfY]="\'center\'"\n      ><fudis-body-text\n        >alignSelfX = \'center\' & alignSelfY = \'center\'</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-body-text class="storybook__item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n  </fudis-grid>`\n})',...AlignSelfXAndY.parameters?.docs?.source}}},Columns.parameters={...Columns.parameters,docs:{...Columns.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="6">\n    <fudis-grid-item class="storybook__item-highlight" [columns]="\'stretch\'">\n      <fudis-body-text>columns = \'stretch\', so it takes the full width</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-grid-item class="storybook__item" class="storybook__item">\n      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [columns]="\'3/-1\'"\n      ><fudis-body-text\n        >columns = \'3/-1\', so it starts from the 3rd column and stretches to the\n        end</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [columns]="2"\n      ><fudis-body-text\n        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item" class="storybook__item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [columns]="\'5/-1\'"\n      ><fudis-body-text\n        >columns = \'5/-1\', so it starts 5th column and stretches until the very\n        end.</fudis-body-text\n      ></fudis-grid-item\n    >\n  </fudis-grid>`\n})',...Columns.parameters?.docs?.source}}},ResponsiveColumns.parameters={...ResponsiveColumns.parameters,docs:{...ResponsiveColumns.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: {\n    ...args,\n    exampleOne: {\n      xs: \'stretch\',\n      md: 3,\n      lg: 1\n    },\n    exampleOneString: "{\'xs: \'stretch\', md: 3, lg: \'auto\'}",\n    exampleTwo: {\n      default: \'4/-1\',\n      md: 2\n    },\n    exampleTwoString: "{ default: \'4/-1\', md: 2 }",\n    exampleThree: {\n      xs: \'2/-1\',\n      md: 3,\n      lg: \'2/-1\'\n    },\n    exampleThreeString: "{ xs: \'2/-1\', md: 3, lg: \'2/-1\' }"\n  },\n  template: html`<fudis-grid [columns]="6">\n    <fudis-grid-item [columns]="\'stretch\'">\n      <fudis-body-text\n        >Try resizing canvas width, so different span widths for items are applied on different\n        breakpoints.</fudis-body-text\n      >\n    </fudis-grid-item>\n\n    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleOne">\n      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>\n    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>\n    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>\n    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleTwo"\n      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleThree"\n      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item\n    >\n  </fudis-grid> `\n})',...ResponsiveColumns.parameters?.docs?.source}}};const __namedExportsOrder=["Example","AlignSelfX","AlignSelfY","AlignSelfXAndY","Columns","ResponsiveColumns"]},"./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.docs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_fudis_fudis_ngx_fudis_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_grid_item_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.component.ts"),_grid_item_stories_ts__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.stories.ts");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code",pre:"pre",h3:"h3",ul:"ul",li:"li",blockquote:"blockquote"},(0,_home_runner_work_fudis_fudis_ngx_fudis_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.h_,{title:"Components/Grid/Grid Item"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"grid-item",children:"Grid Item"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Grid Item Component is a wrapper component which implements automatically the features of the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/directives-grid-grid-item--documentation",children:"Grid Item Directive"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Grid Item is meant to be used as first level child component under ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/components-grid-grid--documentation",children:"Grid Component"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"By default, all first level child Grid Items behave exactly in a way their parent has been configured."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Using this Grid Item Component or Directive, you can define individual alignment behavior for each Grid Item."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"horizontal-and-vertical-alignment",children:"Horizontal and Vertical Alignment"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Grid Item has properties of ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"alignSelfX"})," for horizontal and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"alignSelfY"})," for vertical alignment which makes the Grid Item aling itself inside its container boundaries."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<fudis-grid [alignItemsX]=\"'center'\">\n  <fudis-grid-item>This item is centered by its parent</fudis-grid-item>\n  <fudis-grid-item>This item is centered by its parent</fudis-grid-item>\n  <fudis-grid-item [alignSelfX]=\"'end'\">This item overrides parent's configs\n  and aligns itself differently</fudis-grid-item>\n<fudis-grid>\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.h3,{id:"example-of-alignselfx",children:["Example of ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"alignSelfX"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_grid_item_stories_ts__WEBPACK_IMPORTED_MODULE_3__.AlignSelfX}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.h3,{id:"example-of-alignselfy",children:["Example of ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"alignSelfY"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_grid_item_stories_ts__WEBPACK_IMPORTED_MODULE_3__.AlignSelfY}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"defining-columns-expansion-and-position",children:"Defining Columns Expansion and Position"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["When defining the parent Grid Component's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"columns"})," property, by default all Grid Items follow that spesified rule. The same ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"columns"})," property is available to a single Grid Item, which will override parent's rules. The given value is converted or used as it is to a native CSS Grid ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"grid-columns"})," attribute."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#setting-grid-item-to-stretch-whole-width",children:"Setting Grid Item To Stretch Whole Width"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#using-a-number-value-for-columns",children:"Using A Number Value For Columns"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#native-css-grid-column-values",children:"Native CSS Grid Column Values"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#responsive-columns-for-each-breakpoint",children:"Responsive Columns For Each Breakpoint"})}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"setting-grid-item-to-stretch-whole-width",children:"Setting Grid Item To Stretch Whole Width"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Fudis Grid Item has a shorthand ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"[columns]=\"'stretch'\""}),"for making a Grid Item stretch the whole horizontal width of Grid container."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"using-a-number-value-for-columns",children:"Using A Number Value For Columns"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["When ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"columns"})," value is a number, e. g. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'[columns]="2'}),", it will be converted to CSS ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"grid-columns"})," attribute value of string ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"span 2"})," meaning Grid Item will span across two columns from the point it starts."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"native-css-grid-column-values",children:"Native CSS Grid Column Values"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The values Grid Item's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"columns"})," can be the same as native CSS Grid item's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"grid-column"})," property. By default the value is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"auto"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Quoting from ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column",target:"_blank",rel:"nofollow noopener noreferrer",children:"MDN's grid-column page"}),":"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.blockquote,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"grid-column"})," CSS shorthand property specifies a grid item's size and location within a grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"example-of-columns",children:"Example of Columns"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_grid_item_stories_ts__WEBPACK_IMPORTED_MODULE_3__.Columns}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"responsive-columns-for-each-breakpoint",children:"Responsive Columns For Each Breakpoint"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["As with Grid Component, Grid Item's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"columns"})," value can be an object, where behavior in each breakpoint can be defined."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"example-of-responsive-columns",children:"Example of Responsive Columns"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_grid_item_stories_ts__WEBPACK_IMPORTED_MODULE_3__.ResponsiveColumns}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Ed,{of:_grid_item_component__WEBPACK_IMPORTED_MODULE_2__.b})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_fudis_fudis_ngx_fudis_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}}}]);
//# sourceMappingURL=components-grid-grid-item-grid-item-stories.8694fbbb.iframe.bundle.js.map