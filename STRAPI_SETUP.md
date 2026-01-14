# Strapi CMS Integration Guide

This project is configured to work "out of the box" with local data (`src/data/localData.ts`), but it is architected to easily consume content from a Headless CMS like Strapi.

## How it Works

The content fetching logic is located in `src/lib/cms.ts`. By default, it returns the local data. If you configure a `VITE_API_URL` environment variable, you can enable fetching from a remote API.

## Setting up Strapi

1.  **Create a Strapi Project:**
    ```bash
    npx create-strapi-app@latest my-project --quickstart
    ```

2.  **Create Content Types:**
    Create the following Collection Types in Strapi to match `src/types/cms.ts`:
    -   **Project**: `title` (Text), `category` (Text), `image` (Media), `description` (Rich Text), `tags` (JSON or Relation)
    -   **Post**: `title` (Text), `content` (Rich Text), `date` (Date), `category` (Text)
    -   **Experience**: `title` (Text), `company` (Text), `date` (Text)
    -   **Global**: Single Type for `Hero`, `About`, `Contact` info.

3.  **Enable API Permissions:**
    Go to **Settings > Users & Permissions Plugin > Roles > Public** and enable `find` and `findOne` for your content types.

4.  **Connect Frontend:**
    Update `src/lib/cms.ts` to map the Strapi JSON response structure (which is nested under `attributes`) to the flat structure expected by the frontend.

    Example update in `src/lib/cms.ts`:
    ```typescript
    if (API_URL) {
       const response = await fetch(`${API_URL}/api/projects?populate=*`);
       const json = await response.json();
       // Transform Strapi's deep object structure to simple Project[] array
       const projects = json.data.map(item => ({
           id: item.id,
           ...item.attributes,
           image: item.attributes.image.data.attributes.url
       }));
       
       return { ...localData, projects }; // Merge with local data or replace fully
    }
    ```

5.  **Deploy:**
    Add `VITE_API_URL=https://your-strapi-app.herokuapp.com` to your Vercel Environment Variables.

## "Whatever" CMS (Custom JSON)

If you don't want a full server but want to edit content without touching code:
1.  Edit `src/data/localData.ts` directly.
2.  Commit and Push to GitHub.
3.  Vercel will redeploy automatically with the new content.
