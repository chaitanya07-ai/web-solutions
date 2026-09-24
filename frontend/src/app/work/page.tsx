import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-experience";
export const metadata: Metadata = { title: "Selected work" };
export default function WorkPage() { return <WorkIndex />; }