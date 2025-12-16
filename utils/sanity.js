import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; // use named export

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false, // Changed to false for fresh data
});

// Write client for server-side operations
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Updated builder using named export
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// ---------------------- Fetching functions ----------------------

export async function getProfile() {
  const query = `*[_type == "profile"][0]{
    _id,
    name,
    role,
    bio,
    citations,
    hIndex,
    i10Index,
    visitorCount,

    "profileImage": {
      "asset": {
        "_ref": profileImage.asset._ref,
        "url": profileImage.asset->url
      }
    },

    contact{
      phones,
      emails,
      address,
      researchInterests
    },

    links{
      googleScholar,
      researchGate,
      github,
      linkedin,
      facebook
    },

    education[] {
      degree,
      institution,
      year
    },

    experience[] {
      position,
      institution,
      duration
    },

    awards[] {
      title,
      organization,
      year
    }
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function incrementVisitorCount(profileId) {
  try {
    const profile = await writeClient.fetch(
      `*[_type == "profile" && _id == $profileId][0]{ _id, visitorCount }`,
      { profileId }
    );

    if (!profile) return null;

    const newCount = (profile.visitorCount || 0) + 1;

    await writeClient.patch(profile._id).set({ visitorCount: newCount }).commit();
    return newCount;
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    return null;
  }
}

// ---------------------- Other collections ----------------------

export async function getPublications() {
  const query = `*[_type == "publication"] | order(year desc) {
    _id,
    title,
    authors,
    year,
    journal,
    link
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getConferences() {
  const query = `*[_type == "conference"] | order(year desc) {
    _id,
    title,
    year,
    name,
    conferenceName,
    venue,
    link
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getBooks() {
  const query = `*[_type == "book"] | order(year desc) {
    _id,
    title,
    authors,
    publisher,
    year,
    isbn,
    link
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getAssignments() {
  const query = `*[_type == "assignment"] | order(dueDate asc) {
    _id,
    label,
    createdAt,
    dueDate,
    attachments[] {
      name,
      file {
        asset-> {
          _id,
          url,
          originalFilename,
          extension,
          size
        }
      },
      fileUrl
    },
    submissionLink,
    course,
    semester
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getResources() {
  const query = `*[_type == "resource"] | order(createdAt desc) {
    _id,
    label,
    subject,
    semester,
    attachments[] {
      name,
      file {
        asset-> {
          _id,
          url,
          originalFilename,
          extension,
          size
        }
      },
      fileUrl
    },
    createdAt
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getAnnouncements() {
  const query = `*[_type == "announcement"] | order(createdAt desc) {
    _id,
    label,
    attachments[] {
      name,
      file {
        asset-> {
          _id,
          url,
          originalFilename,
          extension,
          size,
          mimeType,
          _type
        }
      },
      fileUrl
    },
    deadline,
    expiryDate,
    createdAt
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getPhdStudents() {
  const query = `*[_type == "phdStudent"] | order(status asc, startYear desc) {
    _id,
    name,
    "photo": {
      "asset": {
        "_ref": photo.asset._ref,
        "url": photo.asset->url
      }
    },
    status,
    researchTopic,
    startYear,
    graduationYear,
    thesisTitle,
    currentPosition,
    bio,
    publications,
    email,
    linkedin,
    googleScholar,
    website,
    achievements
  }`;

  return await client.fetch(query, {}, { cache: "no-store" });
}
