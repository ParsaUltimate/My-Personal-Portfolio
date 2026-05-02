# Cache Headers Configuration

This project includes a `public/_headers` file for Netlify/Cloudflare Pages deployment.

## For Other Hosting Providers

### Vercel
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(woff2|woff|webp|png|jpg|svg))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.html)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Apache (.htaccess)
```apache
<IfModule mod_headers.c>
  # Cache hashed assets for 1 year
  <FilesMatch "\.(woff2|woff|webp|png|jpg|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  # Don't cache HTML
  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
```

### Nginx
```nginx
location ~* \.(woff2|woff|webp|png|jpg|svg)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~* \.html$ {
  add_header Cache-Control "public, max-age=0, must-revalidate";
}

location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```
