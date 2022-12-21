#!/bin/bash

# Put the URLs in an array
urls=(
  "https://links.dev/cdn?path=fatih-yavuz/links.dev/main/landing/css/custom.css?refresh=1"
  "https://links.dev/cdn?path=fatih-yavuz/links.dev/main/example-pages.js&refresh=1"
  "https://links.dev/fatih/?refresh-registry=1"
  "https://links.dev/fatih/?refresh=1"
  "https://links.dev/?refresh-registry=1"
)

# Loop through the array and perform a curl request for each URL
for url in "${urls[@]}"; do
  # Use the -s and -w options to print the HTTP status code and the URL,
  # and redirect the output to /dev/null to suppress the response
  curl -s -w "%{http_code} %{url_effective}\n" "$url" -o /dev/null
done