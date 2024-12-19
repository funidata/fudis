import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';
import { FudisDescriptionListVariant } from '../../lib/types/miscellaneous';

@Component({
  standalone: true,
  imports: [CommonModule, NgxFudisModule],
  selector: 'example-description-list-collection',
  template: `
    @for (gridConfig of gridConfigs; track gridConfig) {
      @for (variant of variants; track variant.value) {
        <fudis-heading [level]="2" [variant]="'xl'"
          >Test cases for variant: {{ variant.title }} with Grid {{ gridConfig.title }}
        </fudis-heading>
        <fudis-hr class="fudis-my-lg" />
        <fudis-heading [level]="3" [variant]="'md'"
          >{{ variant.title }} Description List</fudis-heading
        >
        <fudis-dl [variant]="variant.value" [columns]="2" [disableGrid]="gridConfig.value">
          @for (data of basicData; track data) {
            <fudis-dl-item>
              <fudis-dt [contentText]="data.dt"></fudis-dt>
              <fudis-dd [contentText]="data.dd" [subHeading]="data.subHeading"></fudis-dd>
            </fudis-dl-item>
          }
        </fudis-dl>
        <fudis-hr class="fudis-my-lg" />
        <fudis-heading [level]="3" [variant]="'md'"
          >Nested {{ variant.title }} Description Lists with Indiana Jones Movies</fudis-heading
        >

        <fudis-dl [classes]="'fudis-mt-sm'" [disableGrid]="gridConfig.value">
          @for (movie of indianaJonesData; track movie) {
            <fudis-dl-item>
              <fudis-dt [contentText]="movie.title" />
              <fudis-dd>
                <fudis-dl [variant]="variant.value">
                  <fudis-dl-item>
                    <fudis-dt [contentText]="indianaJonesTitles.releaseYear"></fudis-dt>
                    <fudis-dd [contentText]="movie.year"></fudis-dd>
                  </fudis-dl-item>
                  <fudis-dl-item>
                    <fudis-dt [contentText]="indianaJonesTitles.rating"></fudis-dt>
                    <fudis-dd [contentText]="movie.rating"></fudis-dd>
                  </fudis-dl-item>
                  <fudis-dl-item>
                    <fudis-dt [contentText]="indianaJonesTitles.quote"></fudis-dt>
                    <fudis-dd [contentText]="movie.quote"></fudis-dd>
                  </fudis-dl-item>
                </fudis-dl>
              </fudis-dd>
            </fudis-dl-item>
          }
        </fudis-dl>
        <fudis-hr class="fudis-my-lg" />
        <fudis-grid [columns]="{ sm: 1, md: 2 }" [rowGap]="'xs'">
          <fudis-heading [level]="3" [variant]="'md'"
            >{{ variant.title }} Description List as Grid's Child Component</fudis-heading
          >
          <fudis-dl [disableGrid]="gridConfig.value" [variant]="variant.value">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Teacher email'"></fudis-dt>
              <fudis-dd
                [contentText]="'snape@hogwarts.wiz'"
                [subHeading]="'Severus Snape'"
              ></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course name'"></fudis-dt>
              <fudis-dd [contentText]="'Defense Against the Dark Arts'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
          <fudis-body-text
            >This is Body Text. Both this and the DL next to it are Grid Items inside
            Grid.</fudis-body-text
          >
        </fudis-grid>
        <fudis-hr class="fudis-my-lg" />
        <fudis-heading [level]="2" [variant]="'md'"
          >{{ variant.title }} Description List With Sub Components</fudis-heading
        >
        <fudis-dl class="fudis-mt-sm" [disableGrid]="gridConfig.value" [variant]="variant.value">
          <fudis-dl-item>
            <fudis-dt [contentText]="'First name'"></fudis-dt>
            <fudis-dd [contentText]="'Rex'"></fudis-dd>
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Last name'"></fudis-dt>
            <fudis-dd
              [contentText]="
                classified
                  ? '&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                  : 'Dangerwest'
              "
              [ariaLabel]="classified ? 'Hidden classified content' : null"
            >
              <fudis-button
                [variant]="'tertiary'"
                [size]="'small'"
                [icon]="classified ? 'eye' : 'eye-blind'"
                [label]="classified ? 'Show details' : 'Hide details'"
                (handleClick)="classified = !classified"
              ></fudis-button>
            </fudis-dd>
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Alias'"></fudis-dt>
            <fudis-dd [contentText]="'Radical Emmet Xtreme'">
              <fudis-button
                [label]="'Edit'"
                [variant]="'tertiary'"
                [size]="'small'"
                [icon]="'edit'"
              />
            </fudis-dd>
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Enemy'">Enemy</fudis-dt>
            <fudis-dd [contentText]="'Emmet Brickowski'" [subHeading]="'Archenemy'">
              <fudis-button [label]="'Read more'" [variant]="'secondary'" [size]="'small'" />
            </fudis-dd>
          </fudis-dl-item>
        </fudis-dl>
        <fudis-hr class="fudis-my-lg" />
        <fudis-heading [level]="2" [variant]="'md'"
          >{{ variant.title }} Description List with Single Item</fudis-heading
        >
        <fudis-dl
          class="fudis-mt-sm"
          [variant]="'regular'"
          [columns]="'1fr 1fr'"
          [disableGrid]="gridConfig.value"
          [variant]="variant.value"
          [tag]="'p'"
        >
          <fudis-dl-item>
            <fudis-dt [contentText]="'Address'"></fudis-dt>
            <fudis-dd [contentText]="'Under the stairs'" [subHeading]="'4 Privet Drive'"></fudis-dd>
          </fudis-dl-item>
        </fudis-dl>
        <fudis-hr class="fudis-my-lg" />
        <fudis-heading [level]="2" [variant]="'md'"
          >Description List Item With Multiple Details</fudis-heading
        >
        <fudis-dl
          class="fudis-mt-sm"
          [columns]="'1fr 1fr'"
          [disableGrid]="gridConfig.value"
          [variant]="variant.value"
        >
          <fudis-dl-item>
            <fudis-dt [contentText]="'Members of Jedi High Council'"></fudis-dt>
            <fudis-dd
              [contentText]="item.value"
              [subHeading]="item.subHeading"
              *ngFor="let item of multipleDDData"
            ></fudis-dd>
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Non-Jedi Master Members'"></fudis-dt>
            <fudis-dd [contentText]="'Anakin Skywalker'"></fudis-dd>
          </fudis-dl-item>
        </fudis-dl>
        <fudis-hr class="fudis-my-lg" />
      }
    }
  `,
})
export class StorybookExampleDescriptionListCollectionComponent {
  classified = true;

  basicData = [
    { dt: 'First Name', dd: 'Rex' },
    { dt: 'Last Name', dd: 'Dangerwest' },
    { dt: 'Alias', dd: 'Radical Emmet Xtreme' },
    { dt: 'Voice actor', dd: 'Chris Pratt' },
    { dt: 'Enemy', dd: 'Emmet Brickowski', subHeading: 'Archenenemy' },
  ];

  variants: { title: string; value: FudisDescriptionListVariant }[] = [
    { title: 'Regular', value: 'regular' },
    { title: 'Compact', value: 'compact' },
  ];

  multipleDDData = [
    { value: 'Anakin Skywalker' },
    { value: 'Obi-Wan Kenobi' },
    { value: 'Shaak Ti' },
    { value: 'Stass Allie' },
    { value: 'Agen Kolar' },
    { value: 'Depa Billaba' },
    { value: 'Coleman Kcaj' },
    { value: 'Saesee Tiin' },
    { value: 'Oppo Rancisis' },
    { value: 'Kit Fisto' },
    { value: 'Plo Koon' },
    { value: 'Luminara Unduli' },
    { value: 'Ki-Adi-Mundi' },
    { value: 'Mace Windu' },
    { subHeading: 'Grand Master', value: 'Yoda' },
  ];

  indianaJonesData = [
    {
      title: 'Raiders of the Lost Ark',
      year: '1981',
      rating: '8.4 / 10',
      quote: "It's not the years, honey, it's the mileage.",
    },
    {
      title: 'The Temple of Doom',
      year: '1984',
      rating: '7.5 / 10',
      quote: 'Ah, dessert! Chilled monkey brains.',
    },
    {
      title: 'The Last Crusade',
      year: '1989',
      rating: '8.2 / 10',
      quote:
        'I suddenly remembered my Charlemagne. Let my armies be the rocks and the trees and the birds in the sky...',
    },
    {
      title: 'The Kingdom of Crystal Skull',
      year: '2008',
      rating: '6.2 / 10',
      quote: 'How much of human life is lost in waiting?',
    },
    {
      title: 'The Dial of Destiny',
      year: '2023',
      rating: '6.5 / 10',
      quote: "Archimedes didn't know about continental drift!",
    },
  ];

  indianaJonesTitles = {
    releaseYear: 'Release Year',
    rating: 'IMDB Rating',
    quote: 'Famous Quote',
  };

  gridConfigs = [
    { title: 'Enabled', value: true },
    { title: 'Disabled', value: false },
  ];
}
