import { ReactNode } from "react";

interface InfoColProps {
  title: string;
  description: ReactNode;
}

export default function InfoCol({ title, description }: InfoColProps) {
  return(
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg">{description}</p>
    </div>
  );
}