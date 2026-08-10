import React, { useEffect, useState } from "react";
import { Button, WithTooltip, TooltipLinkList } from "storybook/internal/components";

interface VersionsResponse {
  versions: string[];
  latest: string;
}

export default function VersionSelector() {
  const [versions, setVersions] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState<string>("next");
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const isProd = window.location.hostname === "fudis.funidata.fi";
    const versionsUrl = isProd
      ? "https://fudis.funidata.fi/ngx/v/versions.json"
      : "ngx/v/versions.json";

    fetch(versionsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load versions: ${response.status}`);
        }
        return response.json() as Promise<VersionsResponse>;
      })
      .then((res) => {
        let loadedVersions = res?.versions ?? [];
        loadedVersions = [...loadedVersions].reverse();

        const majorVersions: string[] = [];
        loadedVersions = loadedVersions.filter((version) => {
          const major = version.split(".")[0];
          if (majorVersions.includes(major)) {
            return true;
          }

          if (majorVersions.length < 3) {
            majorVersions.push(major);
            return true;
          }

          return false;
        });

        loadedVersions = loadedVersions.filter(
          (version) =>
            !["8.0.0", "8.3.0", "8.3.1", "8.3.2", "10.1.0"].includes(version) &&
            !version.includes("rc"),
        );

        setVersions(loadedVersions);

        let selectedVersion = res.latest;
        const pathParts = window.location.href.split("/");
        const vIndex = pathParts.indexOf("v");
        if (vIndex !== -1 && vIndex + 1 < pathParts.length) {
          const possibleVersion = decodeURIComponent(pathParts[vIndex + 1]);
          if (loadedVersions.includes(possibleVersion)) {
            selectedVersion = possibleVersion;
          }
        }

        setCurrentVersion(selectedVersion ?? loadedVersions[0] ?? "next");
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  const navigateToVersion = (version: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.protocol = "https:";
    currentUrl.hostname = "fudis.funidata.fi";

    if (currentUrl.pathname.startsWith("/ngx/v/")) {
      currentUrl.pathname = currentUrl.pathname.replace(
        /(^\/ngx\/v\/)[^/]+/,
        `$1${encodeURIComponent(version)}`,
      );
      window.location.href = currentUrl.toString();
      return;
    }

    window.location.href = `https://fudis.funidata.fi/ngx/v/${encodeURIComponent(version)}/index.html${currentUrl.search}${currentUrl.hash || ""}`;
  };

  const links = versions.map((version) => ({
    id: version,
    title: "v" + version,
    onClick: () => navigateToVersion(version),
    active: currentVersion === version,
  }));

  if (hasError || versions.length === 0) return null;

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnOutsideClick
      tooltip={<TooltipLinkList links={links} />}
    >
      <Button ariaLabel={"Fudis version " + currentVersion}>
        {currentVersion === "next" ? "next" : "v" + currentVersion}
      </Button>
    </WithTooltip>
  );
}
