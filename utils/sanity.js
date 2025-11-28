import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Write client for server-side operations
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

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
      phone,
      emails,
      address{
        department,
        institution,
        location
      },
      researchInterests
    },
    links{
      googleScholar,
      researchGate,
      github,
      linkedin,
      facebook
    },
    education[]{
      degree,
      institution,
      year,
      description
    },
    experience[]{
      position,
      institution,
      duration,
      description
    },
    awards[]{
      title,
      organization,
      year,
      description
    },
    professionalService[]{
      role,
      organization,
      year
    },
    quickStats{
      yearsTeaching,
      publications,
      projectsGuided,
      coursesTaught
    }
  }`;

  return await client.fetch(query);
}

// Function to increment visitor count
export async function incrementVisitorCount(profileId) {
  try {
    const profile = await writeClient.fetch(
      `*[_type == "profile" && _id == $profileId][0]{ _id, visitorCount }`,
      { profileId }
    );

    if (!profile) {
      console.error('Profile not found');
      return null;
    }

    const newCount = (profile.visitorCount || 0) + 1;

    await writeClient
      .patch(profile._id)
      .set({ visitorCount: newCount })
      .commit();

    return newCount;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return null;
  }
}

export async function getPublications() {
  const query = `*[_type == "publication"] | order(year desc) {
    _id,
    title,
    year,
    journal,
    citations,
    tags,
    link
  }`;

  return await client.fetch(query);
}

export async function getConferences() {
  const query = `*[_type == "conference"] | order(year desc) {
    _id,
    title,
    year,
    name,
    vanue,
    tags,
    link
  }`;

  return await client.fetch(query);
}

export async function getBooks() {
  const query = `*[_type == "book"] | order(year desc) {
    _id,
    title,
    publisher,
    year,
    isbn,
    link
  }`;

  return await client.fetch(query);
}

export async function getAssignments() {
  const query = `*[_type == "assignment"] | order(dueDate asc) {
    _id,
    title,
    description,
    createdAt,
    dueDate,
    attachments[]{
      name,
      "file": file.asset->{
        _id,
        url,
        originalFilename
      },
      fileUrl
    },
    submissionLink,
    course,
    semester
  }`;

  return await client.fetch(query);
}

export async function getResources() {
  const query = `*[_type == "resource"] | order(createdAt desc) {
    _id,
    title,
    description,
    subject,
    semester,
    attachments[]{
      name,
      "file": select(
        defined(file.asset) => file.asset->{
          _id,
          url,
          originalFilename,
          extension,
          size
        }
      ),
      fileUrl
    },
    createdAt
  }`;

  return await client.fetch(query);
}

export async function getAnnouncements() {
  const query = `*[_type == "announcement"] | order(createdAt desc) {
    _id,
    title,
    description,
    attachments[]{
      name,
      "file": select(
        defined(file.asset) => file.asset->{
          _id,
          url,
          originalFilename,
          extension,
          size
        }
      ),
      fileUrl
    },
    expiryDate,
    createdAt
  }`;

  return await client.fetch(query);
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

  return await client.fetch(query);
}