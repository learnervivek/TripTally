import React, { useEffect } from 'react';
import { SITE_CONFIG, getBreadcrumbSchema } from '../../data/seoData';

/**
 * Universal SEO Component for TripTally
 * Dynamically updates document metadata, Open Graph, Twitter cards,
 * canonical URLs, robots indexing instructions, and Schema.org JSON-LD.
 */
export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  keywords = [],
  noindex = false,
  schema = null,
  breadcrumbs = null,
}) {
  const siteUrl = SITE_CONFIG.siteUrl;
  const pageTitle = title
    ? `${title}`
    : `${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`;
  const pageDescription = description || SITE_CONFIG.description;
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`
    : siteUrl;
  const socialImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
    : `${siteUrl}${SITE_CONFIG.defaultOgImage}`;

  const keywordsString = Array.isArray(keywords)
    ? keywords.join(', ')
    : keywords || SITE_CONFIG.officialKeywords.slice(0, 10).join(', ');

  useEffect(() => {
    // 1. Page Title
    document.title = pageTitle;

    // Helper to get or create a tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to get or create link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', pageDescription);
    if (keywordsString) {
      setMetaTag('name', 'keywords', keywordsString);
    }

    // 3. Robots meta tag
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', socialImage);
    setMetaTag('property', 'og:locale', SITE_CONFIG.locale);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SITE_CONFIG.twitterHandle);
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', socialImage);

    // 7. Inject JSON-LD Schema
    const schemaScripts = [];
    const existingDynamicSchemas = document.querySelectorAll('script[data-dynamic-seo="true"]');
    existingDynamicSchemas.forEach((el) => el.remove());

    const schemasToInject = [];
    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema);
      } else {
        schemasToInject.push(schema);
      }
    }

    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      schemasToInject.push(getBreadcrumbSchema(breadcrumbs));
    }

    schemasToInject.forEach((sch) => {
      const scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-dynamic-seo', 'true');
      scriptEl.textContent = JSON.stringify(sch);
      document.head.appendChild(scriptEl);
      schemaScripts.push(scriptEl);
    });

    return () => {
      schemaScripts.forEach((script) => script.remove());
    };
  }, [
    pageTitle,
    pageDescription,
    canonicalUrl,
    socialImage,
    ogType,
    keywordsString,
    noindex,
    schema,
    breadcrumbs,
  ]);

  return null;
}

export default SEO;

