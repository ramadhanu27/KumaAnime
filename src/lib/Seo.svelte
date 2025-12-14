<script lang="ts">
  /**
   * SEO Component - Reusable component for page-specific SEO
   * 
   * Usage:
   * <Seo 
   *   title="Judul Halaman"
   *   description="Deskripsi halaman"
   *   image="/path/to/image.jpg"
   *   type="article"
   * />
   */
  
  export let title: string = "KumaStream";
  export let description: string = "Streaming dan download anime subtitle Indonesia terlengkap";
  export let image: string = "/og-image.png";
  export let type: "website" | "article" | "video.other" = "website";
  export let url: string = "";
  export let keywords: string = "";
  export let noindex: boolean = false;
  export let publishedTime: string = "";
  export let modifiedTime: string = "";
  export let author: string = "KumaStream";
  
  // Structured data for anime/video
  export let animeData: {
    name?: string;
    description?: string;
    image?: string;
    genre?: string[];
    datePublished?: string;
    duration?: string;
  } | null = null;

  const siteName = "KumaStream";
  const baseUrl = "https://kumastream.web.id";
  
  $: fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`;
  $: canonicalUrl = url ? `${baseUrl}${url}` : baseUrl;
  $: ogImage = image.startsWith("http") ? image : `${baseUrl}${image}`;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
  
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="id_ID" />
  
  {#if type === "article" || type === "video.other"}
    {#if publishedTime}
      <meta property="article:published_time" content={publishedTime} />
    {/if}
    {#if modifiedTime}
      <meta property="article:modified_time" content={modifiedTime} />
    {/if}
    <meta property="article:author" content={author} />
  {/if}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Structured Data for Anime -->
  {#if animeData}
    {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      "name": "${animeData.name || title}",
      "description": "${animeData.description || description}",
      "image": "${animeData.image || ogImage}",
      ${animeData.genre ? `"genre": ${JSON.stringify(animeData.genre)},` : ""}
      ${animeData.datePublished ? `"datePublished": "${animeData.datePublished}",` : ""}
      ${animeData.duration ? `"duration": "${animeData.duration}",` : ""}
      "inLanguage": "id-ID",
      "isAccessibleForFree": true,
      "provider": {
        "@type": "Organization",
        "name": "KumaStream",
        "url": "https://kumastream.web.id"
      }
    }
    </script>`}
  {/if}
</svelte:head>
