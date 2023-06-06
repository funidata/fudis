"use strict";(self.webpackChunkngx_fudis=self.webpackChunkngx_fudis||[]).push([[9625],{"./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Grid:()=>Grid,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Grid/Grid Item",component:__webpack_require__("./projects/ngx-fudis/src/lib/components/grid/grid-item/grid-item.component.ts").b,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n\t\t\t<style>\n\t\t\t.grid-test-item{\n\t\t\t\tborder: 3px solid cornflowerblue;\n\t\t\t}\n\t\t\t</style>\n\t\t\t<div style="border: 3px solid orangered">\t\n\t\t${story}\n\t\t</div>`))],argTypes:{},parameters:{controls:{exclude:["columnsToApply","ngOnInit","breakpointObserver","columnsFromInput","gridWidths","gridWidthsArray"]}}},html=String.raw,Grid=(args=>({props:args,template:html`<fudis-grid [columns]="'1fr 1fr 1fr 1fr'">
			<fudis-heading class="grid-test-item" tag="h1" size="l"
				>This grid demonstrates attribute of 'alignY'</fudis-heading
			>
			<fudis-grid-item>
				<fudis-body-text>Align y 'stretch' / default</fudis-body-text>
				<fudis-body-text
					>Corsair black spot barque ho fore trysail Nelsons folly prow grog tack. Keelhaul Privateer galleon spirits
					capstan transom lugsail doubloon dance the hempen jig black jack. Belaying pin grapple fire ship bilge lugger
					gun main sheet clipper list cackle fruit.</fudis-body-text
				>
			</fudis-grid-item>
			<fudis-grid-item [alignY]="'start'">Align y 'start'</fudis-grid-item>
			<fudis-grid-item [alignY]="'end'">Align y 'end'</fudis-grid-item>
			<fudis-grid-item [alignY]="'center'">Align y 'center'</fudis-grid-item>
		</fudis-grid>
		<fudis-grid [columns]="'1fr 1fr 1fr 1fr'">
			<fudis-heading class="grid-test-item" tag="h1" size="l"
				>This grid demonstrates attribute of 'alignX'</fudis-heading
			>
			<fudis-grid-item>
				<fudis-body-text>Align X 'stretch' / default</fudis-body-text>
				<fudis-body-text
					>Corsair black spot barque ho fore trysail Nelsons folly prow grog tack. Keelhaul Privateer galleon spirits
					capstan transom lugsail doubloon dance the hempen jig black jack. Belaying pin grapple fire ship bilge lugger
					gun main sheet clipper list cackle fruit.</fudis-body-text
				>
			</fudis-grid-item>
			<fudis-grid-item [alignX]="'start'">Align X 'start'</fudis-grid-item>
			<fudis-grid-item [alignX]="'end'">Align X 'end'</fudis-grid-item>
			<fudis-grid-item [alignX]="'center'">Align X 'center'</fudis-grid-item>
		</fudis-grid>
		<fudis-grid [columns]="'1fr 1fr 1fr 1fr'">
			<fudis-heading class="grid-test-item" tag="h1" size="l"
				>This grid demonstrates combination of 'alignX' and 'alignY'</fudis-heading
			>
			<fudis-grid-item>
				<fudis-body-text>Align X & Y 'stretch' / default</fudis-body-text>
				<fudis-body-text
					>Corsair black spot barque ho fore trysail Nelsons folly prow grog tack. Keelhaul Privateer galleon spirits
					capstan transom lugsail doubloon dance the hempen jig black jack. Belaying pin grapple fire ship bilge lugger
					gun main sheet clipper list cackle fruit.</fudis-body-text
				>
			</fudis-grid-item>
			<fudis-grid-item [alignX]="'start'" [alignY]="'start'">Align X & Y 'start'</fudis-grid-item>
			<fudis-grid-item [alignX]="'end'" [alignY]="'end'">Align X & Y 'end'</fudis-grid-item>
			<fudis-grid-item [alignX]="'center'" [alignY]="'center'">Align X & Y 'center'</fudis-grid-item>
		</fudis-grid>
		<fudis-grid [columns]="6">
			<fudis-heading class="grid-test-item" tag="h1" size="l"
				>This grid demonstrates gridColumn attribute. Parent grid has six columns.
			</fudis-heading>
			<fudis-grid-item [gridColumn]="'stretch'">
				<fudis-body-text>gridColumn is set to 'stretch' so it takes the full width</fudis-body-text>
			</fudis-grid-item>
			<fudis-grid-item>Normal grid-item</fudis-grid-item>
			<fudis-grid-item>Normal grid-item</fudis-grid-item>
			<fudis-grid-item [gridColumn]="'3/-1'"
				>This item has 'gridColumn' attribute with value of '3/-1'. So it starts from the third column and stretches to
				the end</fudis-grid-item
			>
			<fudis-grid-item>Normal grid-item</fudis-grid-item>
			<fudis-grid-item [gridColumn]="'2/4'"
				>This has gridColumn value of '2/4'. So it starts from 2nd and ends in 4th column.</fudis-grid-item
			>
			<fudis-grid-item>Normal grid-item</fudis-grid-item>

			<fudis-grid-item [gridColumn]="'5/-1'"
				>With value of '5/-1'. Starts at 5th column and stretches until the very end.</fudis-grid-item
			>
		</fudis-grid>`})).bind({})}}]);
//# sourceMappingURL=components-grid-grid-item-grid-item-stories.56cc61a4.iframe.bundle.js.map