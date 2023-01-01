#!/bin/bash
for i in 1 2; do
  urls=(
    "https://p${i}.links.dev/cdn?path=fatih-yavuz/links.dev/main/landing/css/custom.css?refresh=1"
    "https://p${i}.links.dev/cdn?path=fatih-yavuz/links.dev/main/example-pages.js&refresh=1"
    "https://p${i}.links.dev/fatih/?refresh-registry=1"
    "https://p${i}.links.dev/fatih/?refresh=1"
    "https://p${i}.links.dev/?refresh=1"
    "https://p${i}.links.dev/cdn?path=fatih-yavuz/links.dev/main/user-page/css/icons.css?refresh=1"
    "https://p${i}.links.dev/cdn?path=fatih-yavuz/links.dev/main/user-page/css/base.css?refresh=1"
    "https://p${i}.links.dev/cdn?path=fatih-yavuz/links.dev/main/user-page/css/reset.css?refresh=1"
  )

  for url in "${urls[@]}"; do
    curl -s -w "%{http_code} %{url_effective}\n" "$url" -o /dev/null
  done
done
