import yaml

# Read the registry.yaml file
with open("../registry.yaml", "r") as f:
    registry = yaml.safe_load(f)

# Create the sitemap.xml file
with open("../sitemap.xml", "w") as f:
    # Write the opening tags
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    # Write the top URLs
    for url in ["https://links.dev", "https://blog.links.dev", "https://links.dev/contact"]:
        f.write('  <url>\n')
        f.write('    <loc>{}</loc>\n'.format(url))
        f.write('  </url>\n')

    # Write the URLs for each user
    base_url = "https://links.dev"
    for user, info in registry['users'].items():
        f.write('  <url>\n')
        f.write('    <loc>{}/{}</loc>\n'.format(base_url, user))
        f.write('  </url>\n')

    # Write the closing tag
    f.write('</urlset>\n')
