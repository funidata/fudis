/*! For license information please see components-grid-grid-item-grid-item-stories.1c04c60f.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[9625],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AlignX:()=>AlignX,AlignY:()=>AlignY,Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,alignXAndY:()=>alignXAndY,columns:()=>columns,default:()=>grid_item_stories,responsiveColumns:()=>responsiveColumns});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),grid_item_component=__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.component.ts"),jsx_runtime=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js")),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),blocks_dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code",h4:"h4",h3:"h3",pre:"pre"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(blocks_dist.h_,{title:"Components/Grid/Grid Item"}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"grid-item",children:"Grid Item"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Grid item has two possible ways to be implemented in the application code, either through directive or component tags."}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Read and learn more about Grid Item usage guidelines from the ",(0,jsx_runtime.jsx)(_components.a,{href:"/docs/foundations-grid--documentation#grid-item",children:"Foundations Grid documentation"}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"example-of-responsive-columns",children:"Example of responsive columns"}),"\n",(0,jsx_runtime.jsx)(blocks_dist.Xz,{of:responsiveColumns}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,jsx_runtime.jsx)(blocks_dist.Ed,{of:grid_item_component.b}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"grid-item-1",children:"Grid Item"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Grid can have grid-items as its children. With grid-item you can target certain rules to specific element. There are two ways to use grid-item, through ",(0,jsx_runtime.jsx)(_components.code,{children:"fudisGridItem"})," directive or ",(0,jsx_runtime.jsx)(_components.code,{children:"<fudis-grid-item>"})," tag. Following properties are available:"]}),"\n",(0,jsx_runtime.jsx)(_components.h4,{id:"columns",children:"Columns"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Just like grid itself, grid-item can be adjusted with ",(0,jsx_runtime.jsx)(_components.code,{children:"columns"})," attribute. You can pass string, number or object to it, e.g ",(0,jsx_runtime.jsx)(_components.code,{children:'[columns]="{ sm: 2, md: 4, xxl: 6 }"'}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h4,{id:"alignx",children:"AlignX"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Align single grid-item element horizontally ",(0,jsx_runtime.jsx)(_components.code,{children:"start"}),", ",(0,jsx_runtime.jsx)(_components.code,{children:"center"}),", ",(0,jsx_runtime.jsx)(_components.code,{children:"end"})," or ",(0,jsx_runtime.jsx)(_components.code,{children:"stretch"}),", e.g ",(0,jsx_runtime.jsx)(_components.code,{children:"[alignSelfX]=\"'start'\""}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h4,{id:"aligny",children:"AlignY"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Align single grid-item element vertically ",(0,jsx_runtime.jsx)(_components.code,{children:"start"}),", ",(0,jsx_runtime.jsx)(_components.code,{children:"center"}),", ",(0,jsx_runtime.jsx)(_components.code,{children:"end"})," or ",(0,jsx_runtime.jsx)(_components.code,{children:"stretch"}),", e.g ",(0,jsx_runtime.jsx)(_components.code,{children:"[alignSelfY]=\"'center'\""}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"example-of-grid-item-directive",children:"Example of grid-item directive"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{children:'<fudis-grid [columns]="2">\n\t<fudis-body-text fudisGridItem [alignSelfX]="\'end\'"></fudis-body-text>\n\t<fudis-body-text fudisGridItem [columns]="2"></fudis-body-text>\n\t<fudis-body-text></fudis-body-text>\n\t<fudis-body-text fudisGridItem [alignSelfY]="\'center\'"></fudis-body-text>\n</fudis-grid>\n'})}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"example-of-grid-item-tag",children:"Example of grid-item tag"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{children:'<fudis-grid [columns]="2">\n\t<fudis-grid-item [alignSelfX]="\'end\'">\n\t\t<fudis-body-text></fudis-body-text>\n\t</fudis-grid-item>\n\t<fudis-grid-item [columns]="2">\n\t\t<fudis-body-text></fudis-body-text>\n\t</fudis-grid-item>\n\t<fudis-body-text></fudis-body-text>\n\t<fudis-grid-item [alignSelfY]="\'center\'">\n\t\t<fudis-body-text></fudis-body-text>\n\t</fudis-grid-item>\n</fudis-grid>\n'})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"These two example results are identical. First body-text is aligned horizontally to the right (end), second body-text is taking up two columns, third gets its rules from the parent grid and fourth body-text is aligned vertically to the center."})]})}const grid_item_documentation=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},html=String.raw,grid_item_stories={title:"Components/Grid/Grid Item",component:grid_item_component.b,parameters:{docs:{page:grid_item_documentation}},decorators:[(0,dist.componentWrapperDecorator)((story=>html`
        <style>
          .grid-item-highlight {
            padding: 0.5rem;
            background-color: #fdefb4;
          }

          .grid-item {
            padding: 0.5rem;
            background-color: #f1f1f1;
          }
        </style>
        ${story}
      `))]},Example=(args=>({props:args,template:html`<fudis-grid [columns]="4">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-heading [level]="1" [size]="'lg'"
        >This grid demonstrates adjusting a single item in a grid.</fudis-heading
      >
      <fudis-body-text
        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide
        enough.</fudis-body-text
      >
      <fudis-body-text
        >If the canvas do not refresh when changing knobs, click the refresh button from top of
        Storybook's toolbar.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item
      class="grid-item-highlight"
      [alignSelfX]="alignSelfX"
      [alignSelfY]="alignSelfY"
      [columns]="columns"
    >
      <fudis-body-text>Adjustable grid item</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`})).bind({});Example.args={alignSelfX:"stretch",alignSelfY:"stretch",columns:"auto"},Example.argTypes={alignSelfX:{options:["stretch","start","end","center"],control:{type:"radio"}},alignSelfY:{options:["stretch","start","end","center"],control:{type:"radio"}},columns:{options:["stretch","auto",2,"2/4","2/-1"],control:{type:"radio"}}};const AlignX=args=>({props:{...args,responsiveAlignX:"{ sm: 'start', md: 'end', lg: 'center' }"},template:html`<fudis-grid [columns]="2">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates attribute of 'alignSelfX'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>

    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-grid-item [alignSelfX]="'start'" class="grid-item-highlight"
      ><fudis-body-text>alignSelfX = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'end'"
      ><fudis-body-text>alignSelfX = 'end'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>

    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'center'">
      <fudis-body-text>alignSelfX = 'center' </fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-grid-item
      class="grid-item-highlight"
      [alignSelfX]="{sm: 'start', md: 'end', lg: 'center'}"
    >
      <fudis-body-text>Responsive alignSelfX =</fudis-body-text>
      <fudis-body-text>"{{responsiveAlignX}}"</fudis-body-text>
    </fudis-grid-item>
  </fudis-grid>`}),AlignY=args=>({props:args,template:html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates attribute of 'alignSelfY'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="grid-item">
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

    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'start'"
      ><fudis-body-text>alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item">
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
    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
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
    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'center'"
      ><fudis-body-text>alignSelfY = 'center'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
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
      class="grid-item-highlight"
      [alignSelfY]="{xs: 'end', sm: 'stretch', md: 'start', lg: 'center'}"
      ><fudis-body-text>alignSelfY = 'responsive'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
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
  </fudis-grid>`}),alignXAndY=args=>({props:args,template:html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates combination of 'alignSelfX' and 'alignSelfY'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'start'" [alignSelfY]="'start'"
      ><fudis-body-text>align = 'start' & alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'end'" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfX = 'end' & alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'center'" [alignSelfY]="'center'"
      ><fudis-body-text
        >alignSelfX = 'center' & alignSelfY = 'center'</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`}),columns=args=>({props:args,template:html`<fudis-grid [columns]="6">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates 'columns' attribute. Parent grid has six columns.
    </fudis-heading>
    <fudis-grid-item class="grid-item-highlight" [columns]="'stretch'">
      <fudis-body-text>columns = 'stretch', so it takes the full width</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="grid-item" class="grid-item">
      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="'3/-1'"
      ><fudis-body-text
        >columns = '3/-1', so it starts from the 3rd column and stretches to the
        end</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="2"
      ><fudis-body-text
        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item" class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="'5/-1'"
      ><fudis-body-text
        >columns = '5/-1', so it starts 5th column and stretches until the very
        end.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`}),responsiveColumns=args=>({props:{...args,exampleOne:{xs:"stretch",md:3,lg:1},exampleOneString:"{'xs: 'stretch', md: 3, lg: 'auto'}",exampleTwo:{default:"4/-1",md:2},exampleTwoString:"{ default: '4/-1', md: 2 }",exampleThree:{xs:"2/-1",md:3,lg:"2/-1"},exampleThreeString:"{ xs: '2/-1', md: 3, lg: '2/-1' }"},template:html`<fudis-grid [columns]="6">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-heading [level]="1" [size]="'lg'"
        >This grid demonstrates responsive 'columns' attribute for a Grid Item. Parent grid has six
        columns.
      </fudis-heading>
      <fudis-body-text
        >Try resizing canvas width, so different span widths for items are applied on different
        breakpoints.</fudis-body-text
      >
    </fudis-grid-item>

    <fudis-grid-item class="grid-item-highlight" [columns]="exampleOne">
      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-grid-item class="grid-item-highlight" [columns]="exampleTwo"
      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="exampleThree"
      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item
    >
  </fudis-grid> `});AlignX.parameters={controls:{exclude:/.*/g}},AlignY.parameters={controls:{exclude:/.*/g}},alignXAndY.parameters={controls:{exclude:/.*/g}},columns.parameters={controls:{exclude:/.*/g}},responsiveColumns.parameters={controls:{exclude:/.*/g}},Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="4">\n    <fudis-grid-item [columns]="\'stretch\'">\n      <fudis-heading [level]="1" [size]="\'lg\'"\n        >This grid demonstrates adjusting a single item in a grid.</fudis-heading\n      >\n      <fudis-body-text\n        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide\n        enough.</fudis-body-text\n      >\n      <fudis-body-text\n        >If the canvas do not refresh when changing knobs, click the refresh button from top of\n        Storybook\'s toolbar.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item\n      class="grid-item-highlight"\n      [alignSelfX]="alignSelfX"\n      [alignSelfY]="alignSelfY"\n      [columns]="columns"\n    >\n      <fudis-body-text>Adjustable grid item</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="grid-item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="grid-item"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n  </fudis-grid>`\n})',...Example.parameters?.docs?.source}}},AlignX.parameters={...AlignX.parameters,docs:{...AlignX.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: {\n    ...args,\n    responsiveAlignX: "{ sm: \'start\', md: \'end\', lg: \'center\' }"\n  },\n  template: html`<fudis-grid [columns]="2">\n    <fudis-heading [level]="1" [size]="\'lg\'"\n      >This grid demonstrates attribute of \'alignSelfX\'</fudis-heading\n    >\n    <fudis-grid-item class="grid-item-highlight">\n      <fudis-body-text>alignSelfX = \'stretch\' (default)</fudis-body-text>\n    </fudis-grid-item>\n\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-grid-item [alignSelfX]="\'start\'" class="grid-item-highlight"\n      ><fudis-body-text>alignSelfX = \'start\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="\'end\'"\n      ><fudis-body-text>alignSelfX = \'end\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n\n    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="\'center\'">\n      <fudis-body-text>alignSelfX = \'center\' </fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>\n    <fudis-grid-item\n      class="grid-item-highlight"\n      [alignSelfX]="{sm: \'start\', md: \'end\', lg: \'center\'}"\n    >\n      <fudis-body-text>Responsive alignSelfX =</fudis-body-text>\n      <fudis-body-text>"{{responsiveAlignX}}"</fudis-body-text>\n    </fudis-grid-item>\n  </fudis-grid>`\n})',...AlignX.parameters?.docs?.source}}},AlignY.parameters={...AlignY.parameters,docs:{...AlignY.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="2" [width]="\'sm\'">\n    <fudis-heading [level]="1" [size]="\'lg\'"\n      >This grid demonstrates attribute of \'alignSelfY\'</fudis-heading\n    >\n    <fudis-grid-item class="grid-item-highlight">\n      <fudis-body-text>alignSelfY = \'stretch\' (default)</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-grid-item class="grid-item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n\n    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="\'start\'"\n      ><fudis-body-text>alignSelfY = \'start\'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="\'end\'"\n      ><fudis-body-text>alignSelfY = \'end\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="grid-item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="\'center\'"\n      ><fudis-body-text>alignSelfY = \'center\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="grid-item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item\n      class="grid-item-highlight"\n      [alignSelfY]="{xs: \'end\', sm: \'stretch\', md: \'start\', lg: \'center\'}"\n      ><fudis-body-text>alignSelfY = \'responsive\'</fudis-body-text></fudis-grid-item\n    ><fudis-grid-item class="grid-item">\n      <fudis-body-text style="margin-bottom: 1rem;"\n        >Normal grid item. With more content so effects of adjusting a single element can be seen\n        better.</fudis-body-text\n      >\n      <fudis-body-text\n        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six\n        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber\n        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of\n        conduct chase wench spike lateen sail bilge boom.</fudis-body-text\n      ></fudis-grid-item\n    >\n  </fudis-grid>`\n})',...AlignY.parameters?.docs?.source}}},alignXAndY.parameters={...alignXAndY.parameters,docs:{...alignXAndY.parameters?.docs,source:{originalSource:"(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]=\"2\" [width]=\"'sm'\">\n    <fudis-heading [level]=\"1\" [size]=\"'lg'\"\n      >This grid demonstrates combination of 'alignSelfX' and 'alignSelfY'</fudis-heading\n    >\n    <fudis-grid-item class=\"grid-item-highlight\">\n      <fudis-body-text>alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class=\"grid-item\"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item class=\"grid-item-highlight\" [alignSelfX]=\"'start'\" [alignSelfY]=\"'start'\"\n      ><fudis-body-text>align = 'start' & alignSelfY = 'start'</fudis-body-text></fudis-grid-item\n    >\n    <fudis-body-text class=\"grid-item\"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item class=\"grid-item-highlight\" [alignSelfX]=\"'end'\" [alignSelfY]=\"'end'\"\n      ><fudis-body-text>alignSelfX = 'end' & alignSelfY = 'end'</fudis-body-text></fudis-grid-item\n    ><fudis-body-text class=\"grid-item\"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n    <fudis-grid-item class=\"grid-item-highlight\" [alignSelfX]=\"'center'\" [alignSelfY]=\"'center'\"\n      ><fudis-body-text\n        >alignSelfX = 'center' & alignSelfY = 'center'</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-body-text class=\"grid-item\"\n      >Normal grid item. With more content so effects of adjusting a single element can be seen\n      better.</fudis-body-text\n    >\n  </fudis-grid>`\n})",...alignXAndY.parameters?.docs?.source}}},columns.parameters={...columns.parameters,docs:{...columns.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: args,\n  template: html`<fudis-grid [columns]="6">\n    <fudis-heading [level]="1" [size]="\'lg\'"\n      >This grid demonstrates \'columns\' attribute. Parent grid has six columns.\n    </fudis-heading>\n    <fudis-grid-item class="grid-item-highlight" [columns]="\'stretch\'">\n      <fudis-body-text>columns = \'stretch\', so it takes the full width</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-grid-item class="grid-item" class="grid-item">\n      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [columns]="\'3/-1\'"\n      ><fudis-body-text\n        >columns = \'3/-1\', so it starts from the 3rd column and stretches to the\n        end</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [columns]="2"\n      ><fudis-body-text\n        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text\n      ></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item" class="grid-item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [columns]="\'5/-1\'"\n      ><fudis-body-text\n        >columns = \'5/-1\', so it starts 5th column and stretches until the very\n        end.</fudis-body-text\n      ></fudis-grid-item\n    >\n  </fudis-grid>`\n})',...columns.parameters?.docs?.source}}},responsiveColumns.parameters={...responsiveColumns.parameters,docs:{...responsiveColumns.parameters?.docs,source:{originalSource:'(args: GridItemComponent) => ({\n  props: {\n    ...args,\n    exampleOne: {\n      xs: \'stretch\',\n      md: 3,\n      lg: 1\n    },\n    exampleOneString: "{\'xs: \'stretch\', md: 3, lg: \'auto\'}",\n    exampleTwo: {\n      default: \'4/-1\',\n      md: 2\n    },\n    exampleTwoString: "{ default: \'4/-1\', md: 2 }",\n    exampleThree: {\n      xs: \'2/-1\',\n      md: 3,\n      lg: \'2/-1\'\n    },\n    exampleThreeString: "{ xs: \'2/-1\', md: 3, lg: \'2/-1\' }"\n  },\n  template: html`<fudis-grid [columns]="6">\n    <fudis-grid-item [columns]="\'stretch\'">\n      <fudis-heading [level]="1" [size]="\'lg\'"\n        >This grid demonstrates responsive \'columns\' attribute for a Grid Item. Parent grid has six\n        columns.\n      </fudis-heading>\n      <fudis-body-text\n        >Try resizing canvas width, so different span widths for items are applied on different\n        breakpoints.</fudis-body-text\n      >\n    </fudis-grid-item>\n\n    <fudis-grid-item class="grid-item-highlight" [columns]="exampleOne">\n      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>\n    </fudis-grid-item>\n    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>\n    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>\n    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>\n    <fudis-grid-item class="grid-item-highlight" [columns]="exampleTwo"\n      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item"\n      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item\n    >\n    <fudis-grid-item class="grid-item-highlight" [columns]="exampleThree"\n      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item\n    >\n  </fudis-grid> `\n})',...responsiveColumns.parameters?.docs?.source}}};const __namedExportsOrder=["Example","AlignX","AlignY","alignXAndY","columns","responsiveColumns"]}}]);
//# sourceMappingURL=components-grid-grid-item-grid-item-stories.1c04c60f.iframe.bundle.js.map