import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site";
import { ProjectExperience } from "@/components/work-experience";
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: project?.name ?? "Project", description: project?.description };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  return <ProjectExperience project={projects[index]} nextProject={projects[(index + 1) % projects.length]} />;
}