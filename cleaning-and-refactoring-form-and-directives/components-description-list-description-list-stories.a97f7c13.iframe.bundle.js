"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[6144],{"./projects/ngx-fudis/src/lib/components/description-list/description-list.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DescriptionList:()=>DescriptionList,DescriptionListItemInsideGrid:()=>DescriptionListItemInsideGrid,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Description List",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/description-list/description-list.component.ts").a,argTypes:{}},testData=[{key:"First Name",value:"Rex"},{key:"Last Name",value:"Dangerwest"},{key:"Alias",value:"Radical Emmet Xtreme"},{key:"Voice actor",value:"Chris Pratt"},{key:"Favorite animal",value:"Velociraptor",subHeading:"Dinosaurus"},{key:"Real name",value:"Emmet Joseph Brickowski"},{key:"Species",value:"Lego"},{key:"Enemy",value:"Emmet Brickowski",subHeading:"Archenemy"},{key:"Enemy",value:"Lucy",subHeading:"Second Archenemy"}],testDataCompact=[{key:"First Name",value:"Rex"},{key:"Last Name",value:"Dangerwest"},{key:"Alias",value:"Radical Emmet Xtreme"},{key:"Voice actor",value:"Chris Pratt"},{key:"Favorite animal",value:"Velociraptor",subHeading:"Dinosaurus"},{key:"Real name",value:"Emmet Joseph Brickowski"},{key:"Species",value:"Lego"},{key:"Enemy",value:"Emmet Brickowski"},{key:"Enemy",value:"Lucy"}],lonelyDataItem=[{key:"Vastuuopettajan sähköposti",value:"olli@ope.com",subHeading:"Olli Opettaja"}],html=String.raw,DescriptionList=()=>({props:{testData,testDataCompact},template:html`<fudis-heading tag="h2" size="m"> Description List Regular Example</fudis-heading>
		<fudis-description-list [data]="testData" [marginBottom]="'md'"></fudis-description-list>
		<hr />
		<fudis-heading tag="h2" size="m">Description List Compact Example</fudis-heading>
		<fudis-description-list [variant]="'compact'" [data]="testDataCompact"></fudis-description-list>`}),DescriptionListItemInsideGrid=(()=>({template:html`<fudis-grid>
			<fudis-heading tag="h2" size="m">Here below is a regular Fudis Description List component</fudis-heading>
		</fudis-grid>
		<fudis-description-list [data]="testData" [marginBottom]="'xl'"></fudis-description-list>

		<fudis-grid [columns]="columns">
			<fudis-heading tag="h2" size="m"
				>And here below is a Fudis Grid where DL item is used as child component</fudis-heading
			>
			<fudis-description-list [disableGrid]="true" [data]="lonelyDataItem"></fudis-description-list>
			<fudis-body-text
				>Item next to this Body Text is a lonely Description List component with only one list item. This and DL item
				are both inside a Fudis Grid.</fudis-body-text
			>
		</fudis-grid>`,props:{testData,lonelyDataItem,columns:"1fr 1fr"}})).bind({})}}]);
//# sourceMappingURL=components-description-list-description-list-stories.a97f7c13.iframe.bundle.js.map