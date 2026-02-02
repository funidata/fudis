import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FudisSelectOption } from '../../lib/types/forms';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';

interface VersionsResponse {
  versions: string[];
  latest: string;
}

@Component({
  selector: 'fudis-version-selector',
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxFudisModule],
})
export class VersionSelectorComponent implements OnInit {
  private _versions: string[] = [];
  private _control = new FormControl<FudisSelectOption<object> | null>(null);
  private _error = false;

  get versions(): string[] {
    return this._versions;
  }

  get control() {
    return this._control;
  }

  get error(): boolean {
    return this._error;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const isProd = window.location.hostname === 'fudis.funidata.fi';

    const versionsUrl = isProd
      ? 'https://fudis.funidata.fi/ngx/v/versions.json'
      : 'ngx/v/versions.json';

    this.http.get<VersionsResponse>(versionsUrl).subscribe({
      next: (res) => {
        this._versions = res?.versions ?? [];

        // reverse so that latest versions are first
        this._versions = this._versions.reverse();

        // filter the version list so that only the latest three major versions are shown
        const majorVersions = new Array<string>();
        this._versions = this._versions.filter((v) => {
          const major = v.split('.')[0];
          if (majorVersions.includes(major)) {
            return true;
          } else if (majorVersions.length < 3) {
            majorVersions.push(major);
            return true;
          }
          return false;
        });

        // filter to exclude rc versions and remove problematic versions, currently:
        //  8.0.0, 8.3.0, 8.3.1 and 8.3.2

        this._versions = this._versions.filter(
          (v) => !['8.0.0', '8.3.0', '8.3.1', '8.3.2'].includes(v) && !v.includes('rc'),
        );

        // after redirection, if the current selected version can be found in the url, set it as the selected value, else select latest
        const pathParts = window.top!.location.href.split('/');
        let currentVersion: string = res.latest;
        const vIndex = pathParts.indexOf('v');
        if (vIndex !== -1 && vIndex + 1 < pathParts.length) {
          const possibleVersion = decodeURIComponent(pathParts[vIndex + 1]);
          if (this._versions.includes(possibleVersion)) {
            currentVersion = possibleVersion;
          }
        }
        this._control.setValue(
          {
            label: currentVersion,
            value: currentVersion,
          },
          { emitEvent: false },
        );
      },
      error: () => {
        this._error = true;
      },
    });

    this._control.valueChanges.subscribe((v) => {
      if (!v) return;
      const selected = v as FudisSelectOption<object> | null;
      const val = selected?.value ?? null;
      if (!val) return;
      const cur = new URL(window.top!.location.href);
      cur.protocol = 'https:';
      cur.hostname = 'fudis.funidata.fi';

      let target: string;

      // If the current pathname already contains /ngx/v/<version>, replace only the version part
      if (cur.pathname.startsWith('/ngx/v/')) {
        cur.pathname = cur.pathname.replace(
          /(^\/ngx\/v\/)[^/]+/,
          `$1${encodeURIComponent(String(val))}`,
        );
        target = cur.toString();
        window.top!.location.href = target;
      } else {
        // Otherwise, build production URL that points to the selected version (this happens in the developement environment)
        target = `https://fudis.funidata.fi/ngx/v/${encodeURIComponent(String(val))}/index.html${cur.search}${cur.hash || ''}`;
        window.top!.location.href = target;
      }
    });
  }
}
