import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";
const clientId = process.env.WIX_CLIENT_ID;
if (!clientId) throw new Error("Missing WIX_CLIENT_ID");

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId }),
});

const blogsQuery = wixClient.items.query("Blogs");

const projectsQuery = wixClient.items.query("Projects");

const experienceQuery = wixClient.items.query("MyExperience");

export { wixClient, blogsQuery, projectsQuery, experienceQuery };
