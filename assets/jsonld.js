/**
 * Aditya Home Furniture - Structured Data (JSON-LD)
 * Injects structured data for SEO.
 */

document.addEventListener('DOMContentLoaded', () => {
    const injectJSONLD = (data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
    };

    // Website Schema (All Pages)
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Aditya Home Furniture",
        "url": "https://www.adityahomefurniture.com",
        "description": "High-end European oak and teak wood furniture for elegant homes."
    };
    injectJSONLD(websiteSchema);

    // Page-specific Schemas based on body ID or pathname
    const pageId = document.body.id;

    if (pageId === 'product-detail-page') {
        // Product Schema
        const productSchema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Classic European Oak Dining Table",
            "image": "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1600&q=80",
            "description": "Handcrafted European oak dining table featuring a rich, warm finish. Perfect for family gatherings.",
            "brand": {
                "@type": "Brand",
                "name": "Aditya Home Furniture"
            },
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "INR",
                "price": "195000",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            }
        };
        injectJSONLD(productSchema);
    }

    if (pageId === 'testimonials-page' || pageId === 'index-page') {
        // LocalBusiness / Reviews Schema
        const reviewsSchema = {
            "@context": "https://schema.org",
            "@type": "FurnitureStore",
            "name": "Aditya Home Furniture",
            "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
            "@id": "https://www.adityahomefurniture.com",
            "url": "https://www.adityahomefurniture.com",
            "telephone": "+919876543210",
            "priceRange": "$$$",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Craftsmanship Lane",
                "addressLocality": "Hyderabad",
                "addressRegion": "TS",
                "postalCode": "500001",
                "addressCountry": "IN"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "5"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Amar" },
                    "datePublished": "2026-03-10",
                    "reviewBody": "The European oak dining table is an absolute masterpiece. The finish highlights the natural grain beautifully, and the packaging was incredibly secure. Local delivery in Hyderabad was fast and professional.",
                    "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5.0", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Keerthi" },
                    "datePublished": "2026-02-15",
                    "reviewBody": "We furnished our master bedroom with the teak set. The craftsmanship is flawless, bringing a warm, modern feel to the room. Customer support in Chennai was responsive and deeply knowledgeable.",
                    "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5.0", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Ajay" },
                    "datePublished": "2026-04-02",
                    "reviewBody": "Ordered a custom oak sofa for my apartment. The finish is stunning and fits the space perfectly. We had a minor delivery delay due to rain, but the follow-up communication was excellent.",
                    "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "4.8", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Revanth" },
                    "datePublished": "2026-01-20",
                    "reviewBody": "The teak workspace desk completely transformed my home office. It's highly ergonomic and the assembly instructions were clear. A massive improvement to my daily work-from-home routine.",
                    "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "4.9", "worstRating": "1" }
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Organization", "name": "NIT Warangal Procurement Office" },
                    "datePublished": "2025-11-05",
                    "reviewBody": "We sourced several oak pieces for our guest house common areas. The durability is exceptional for a high-traffic environment, and the campus-grade installation team was highly efficient.",
                    "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5.0", "worstRating": "1" }
                }
            ]
        };
        injectJSONLD(reviewsSchema);
    }
});
