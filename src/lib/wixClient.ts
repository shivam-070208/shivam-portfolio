import {  items } from '@wix/data';
import { createClient, OAuthStrategy, WixClient } from '@wix/sdk';

const clientId = process.env.WIX_CLIENT_ID;
if (!clientId) throw new Error("Missing WIX_CLIENT_ID");

const wixClient = createClient({
  modules: {items},
  auth: OAuthStrategy({ clientId }),
});


const blogs = wixClient.items.query("TechnicalBlogs");

const projects = wixClient.items.query("Projects");


export {
    wixClient,
    blogs,
    projects
}