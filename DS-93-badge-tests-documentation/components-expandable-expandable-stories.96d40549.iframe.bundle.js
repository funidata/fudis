"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[7709],{"./projects/ngx-fudis/src/lib/components/expandable/expandable.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Expandable:()=>Expandable,ExpandableWithActionButton:()=>ExpandableWithActionButton,ExpandableWithSubTitle:()=>ExpandableWithSubTitle,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Expandable",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/expandable/expandable.component.ts").I,argTypes:{tag:{options:["h2","h3","h4","h5","h6"],control:{type:"radio"}}},parameters:{controls:{exclude:["_collapsed","openedOnce","ref","collapsedChange","setCollapsedStatus","content","headerButtons"]}}},html=String.raw,Expandable=(args=>({props:args,template:html`
		<fudis-expandable [title]="title" [subTitle]="subTitle">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`})).bind({});Expandable.args={variant:"regular",title:"Regular expandable",collapsed:!0};const ExpandableWithSubTitle=(args=>({props:args,template:html`
		<fudis-expandable [title]="title" [subTitle]="subTitle">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`})).bind({});ExpandableWithSubTitle.args={variant:"regular",title:"Expandable with a sub title",subTitle:"This is my sub title for extra info",collapsed:!0};const ExpandableWithActionButton=(args=>({props:args,template:html`
		<fudis-expandable [title]="title" [subTitle]="subTitle">
			<ng-template fudisActions type="expandable">
				<fudis-button label="Button"></fudis-button>
			</ng-template>
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`})).bind({});ExpandableWithActionButton.args={variant:"regular",title:"Expandable with a header action button",collapsed:!0}}}]);
//# sourceMappingURL=components-expandable-expandable-stories.96d40549.iframe.bundle.js.map