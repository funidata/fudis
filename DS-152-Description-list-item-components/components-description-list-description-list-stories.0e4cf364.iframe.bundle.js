/*! For license information please see components-description-list-description-list-stories.0e4cf364.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[6144],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./projects/ngx-fudis/src/lib/components/description-list/description-list.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DescriptionList:()=>DescriptionList,DescriptionListItemInsideGrid:()=>DescriptionListItemInsideGrid,DescriptionListWithSubComponents:()=>DescriptionListWithSubComponents,default:()=>description_list_stories});var description_list_component=__webpack_require__("./projects/ngx-fudis/src/lib/components/description-list/description-list.component.ts"),jsx_runtime=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js")),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");__webpack_require__("./node_modules/@storybook/addon-links/dist/index.mjs");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",h3:"h3",a:"a"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Components/DescriptionListComponent "}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"descriptionlist-component",children:"DescriptionList Component"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Fudis DescriptionList component generates an item list from an array of objects type IFudisDescriptionListItem. Each description item has a key value pair. Value can also contain an optional sub-header value."}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"examples",children:"Examples"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Fudis descriptionList has two different variants 'regular' and 'compact'. Fudis description list's default behavior is to align with fudis grid. This feature can be turned off by setting ",(0,jsx_runtime.jsx)(_components.code,{children:"disableGrid"})," as true."]}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{of:DescriptionList}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"accessibility",children:"Accessibility"}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"related-components",children:"Related components"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:(0,jsx_runtime.jsx)(_components.a,{href:"/docs/components-icon--icon",children:"Icon"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,jsx_runtime.jsx)(dist.Ed,{of:description_list_component.a})]})}const readme=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},description_list_stories={title:"Components/Description List",component:description_list_component.a,parameters:{docs:{page:readme}},argTypes:{}},testData=[{key:"First Name",value:"Rex"},{key:"Last Name",value:"Dangerwest"},{key:"Alias",value:"Radical Emmet Xtreme"},{key:"Voice actor",value:"Chris Pratt"},{key:"Favorite animal",value:"Velociraptor",subHeading:"Dinosaurus"},{key:"Real name",value:"Emmet Joseph Brickowski"},{key:"Species",value:"Lego"},{key:"Enemy",value:"Emmet Brickowski",subHeading:"Archenemy"},{key:"Enemy",value:"Lucy",subHeading:"Second Archenemy"}],testDataCompact=[{key:"First Name",value:"Rex"},{key:"Last Name",value:"Dangerwest"},{key:"Alias",value:"Radical Emmet Xtreme"},{key:"Voice actor",value:"Chris Pratt"},{key:"Favorite animal",value:"Velociraptor",subHeading:"Dinosaurus"},{key:"Real name",value:"Emmet Joseph Brickowski"},{key:"Species",value:"Lego"},{key:"Enemy",value:"Emmet Brickowski"},{key:"Enemy",value:"Lucy"}],lonelyDataItem=[{key:"Vastuuopettajan sähköposti",value:"olli@ope.com",subHeading:"Olli Opettaja"}],html=String.raw,DescriptionList=()=>({props:{testData,testDataCompact},template:html`<fudis-heading tag="h2" size="md"> Description List Regular With Data Looping</fudis-heading>
		<fudis-description-list [data]="testData" [marginBottom]="'md'"></fudis-description-list>
		<hr />
		<fudis-heading tag="h2" size="md">Description List Compact With Data Looping</fudis-heading>
		<fudis-description-list
			[columns]="{xs: 1, sm: 2}"
			[variant]="'compact'"
			[data]="testDataCompact"></fudis-description-list>`}),DescriptionListItemInsideGrid=(()=>({template:html` <fudis-heading tag="h2" size="md"
			>Here below is a regular Fudis Description List component</fudis-heading
		>
		<fudis-dl [data]="testData" [marginBottom]="'xl'" [columns]="2"></fudis-dl>

		<fudis-grid [columns]="columns">
			<fudis-heading tag="h2" size="md"
				>And here below is a Fudis Grid where DL item is used as child component</fudis-heading
			>
			<fudis-dl [disableGrid]="true" [data]="lonelyDataItem"></fudis-dl>
			<fudis-body-text
				>Item next to this Body Text is a lonely Description List component with only one list item. This and DL item
				are both inside a Fudis Grid.</fudis-body-text
			>
		</fudis-grid>`,props:{testData,lonelyDataItem,columns:"1fr 1fr"}})).bind({}),DescriptionListWithSubComponents=()=>({props:{testData,testDataCompact},template:html`<fudis-heading tag="h2" size="md">Description list built with sub components</fudis-heading>
		<fudis-description-list [marginBottom]="'md'">
			<fudis-description-list-item *ngFor="let item of testData; let i = index">
				<fudis-dt>{{item.key}}</fudis-dt>
				<fudis-dd [subHeading]="item.subHeading"
					>{{item.value}}
					<ng-container *ngIf="i === 1 || i === 4">
						<ng-template fudisActions type="dd">
							<fudis-button [label]="'Click!'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
						</ng-template>
					</ng-container>
				</fudis-dd>
			</fudis-description-list-item>
		</fudis-description-list>
		<fudis-heading tag="h2" size="md">Description list compact built with sub components</fudis-heading>
		<fudis-description-list [variant]="'compact'" [marginBottom]="'md'">
			<fudis-description-list-item *ngFor="let item of testDataCompact; let i = index">
				<fudis-dt>{{item.key}}</fudis-dt>
				<fudis-dd [subHeading]="item.subHeading"
					>{{item.value}}<ng-container *ngIf="i === 1 || i === 4">
						<ng-template fudisActions type="dd">
							<fudis-button [label]="'Click!'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
						</ng-template>
					</ng-container>
				</fudis-dd>
			</fudis-description-list-item>
		</fudis-description-list> `})},"./node_modules/@storybook/addon-links/dist/index.mjs":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@storybook/addon-links/dist/chunk-DXNAW7Q2.mjs"),__webpack_require__("./node_modules/@storybook/addon-links/dist/chunk-JT3VIYBO.mjs")},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
//# sourceMappingURL=components-description-list-description-list-stories.0e4cf364.iframe.bundle.js.map