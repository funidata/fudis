import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FudisSelectOption } from '../../lib/types/forms';
interface VersionsResponse {
  versions: string[];
  latest: string;
}

@Component({
  selector: 'fudis-version-selector',
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss'],
  standalone: false,
})
export class VersionSelectorComponent implements OnInit {
  versions: string[] = [];
  control = new FormControl<FudisSelectOption<object> | null>(null);
  error = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const isProd = window.location.hostname === 'fudis.funidata.fi';

    const versionsUrl = isProd
      ? 'https://fudis.funidata.fi/ngx/v/versions.json'
      : 'ngx/v/versions.json';

    this.http.get<VersionsResponse>(versionsUrl).subscribe({
      next: (res) => {
        this.versions = res?.versions ?? [];

        if (res?.latest) {
          this.control.setValue(
            {
              label: res.latest,
              value: res.latest,
            },
            { emitEvent: false },
          );
        }
      },
      error: () => {
        this.error = true;
      },
    });

    this.control.valueChanges.subscribe((v) => {
      if (!v) return;
      const selected = v as FudisSelectOption<object> | null;
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
