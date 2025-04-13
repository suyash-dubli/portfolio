interface ProjectCardProps {
  title: string;
  description: string;
  url?: string;
}

export default function ProjectCard({ title, description, url }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
      )}
    </div>
  );
}