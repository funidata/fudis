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
  private _control = new FormControl<FudisSelectOption<string> | null>(null);
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

        if (res?.latest) {
          this._control.setValue(
            {
              label: res.latest,
              value: res.latest,
            },
            { emitEvent: false },
          );
        }
      },
      error: () => {
        this._error = true;
      },
    });

    this._control.valueChanges.subscribe((v) => {
      if (!v) return;
      const selected = v as FudisSelectOption<string> | null;
      const val = selected?.value ?? null;
      if (!val) return;
      const cur = new URL(window.location.href);
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
        window.location.href = target;
      } else {
        // Otherwise, build production URL that points to the selected version (this happens in the developement environment)
        target = `https://fudis.funidata.fi/ngx/v/${encodeURIComponent(String(val))}/index.html${cur.search}${cur.hash || ''}`;
        window.open(target, '_blank');
      }
    });
  }
}
