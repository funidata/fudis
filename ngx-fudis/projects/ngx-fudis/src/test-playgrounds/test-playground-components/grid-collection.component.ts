import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';

@Component({
  imports: [CommonModule, NgxFudisModule],
  selector: 'example-grid-collection',
  template: `
    <fudis-heading [level]="2">Grid align start</fudis-heading>
    <div
      fudisGrid
      [classes]="'storybook__wrapper-border'"
      [columns]="{ md: 3 }"
      [align]="'start'"
      [alignItemsX]="'start'"
      [alignItemsY]="'start'"
      [width]="'sm'"
      [columnGap]="'responsive'"
      [rowGap]="'responsive'"
    >
      <div class="storybook__item">
        <fudis-body-text class="fudis-mb-xs">First Grid child's first Body Text inside it</fudis-body-text>
        <fudis-body-text>First Grid child's second Body Text inside it</fudis-body-text>
      </div>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
    </div>
    <fudis-hr class="fudis-my-lg" />

    <fudis-heading [level]="2">Grid align center</fudis-heading>
    <div
      fudisGrid
      [classes]="'storybook__wrapper-border'"
      [columns]="{ sm: 2, lg: 4 }"
      [align]="'center'"
      [alignItemsX]="'center'"
      [alignItemsY]="'center'"
      [width]="'lg'"
      [columnGap]="'md'"
      [rowGap]="'md'"
    >
      <div class="storybook__item">
        <fudis-body-text class="fudis-mb-xs">First Grid child's first Body Text inside it</fudis-body-text>
        <fudis-body-text>First Grid child's second Body Text inside it</fudis-body-text>
      </div>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
    </div>
    <fudis-hr class="fudis-my-lg" />

    <fudis-heading [level]="2">Grid align end</fudis-heading>
    <div
      fudisGrid
      [classes]="'storybook__wrapper-border'"
      [columns]="{ md: 2, lg: 6 }"
      [classes]="'storybook__wrapper-border'"
      [align]="'end'"
      [alignItemsX]="'stretch'"
      [alignItemsY]="'stretch'"
      [width]="'xxl'"
      [columnGap]="'xxl'"
      [rowGap]="'xxl'"
    >
      <div class="storybook__item">
        <fudis-body-text class="fudis-mb-xs">First Grid child's first Body Text inside it</fudis-body-text>
        <fudis-body-text>First Grid child's second Body Text inside it</fudis-body-text>
      </div>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
    </div>
  `,
})
export class StorybookExampleGridCollectionComponent {}
